const STORAGE_KEY = 'nightline_chat_messages';
const messagesEl = document.getElementById('messages');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');

const BOT_REPLIES = [
  "Got it — noted.",
  "Interesting, tell me more.",
  "I'm just a demo bot, but I'm listening 👂",
  "That makes sense to me.",
  "Haha, fair point.",
  "Can you say that again a different way?",
  "Cool, thanks for sharing!",
  "I'll pretend I know what that means 😄",
  "Noted. What else is going on?",
  "Sounds like a plan."
];

function loadMessages(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){
    console.error('Failed to parse stored messages', e);
    return [];
  }
}

function saveMessages(messages){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function formatTime(ts){
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
}

function formatDay(ts){
  const d = new Date(ts);
  return d.toLocaleDateString([], { weekday:'long', month:'short', day:'numeric' });
}

let messages = loadMessages();

function render(){
  messagesEl.innerHTML = '';

  if(messages.length === 0){
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = '<span>No messages yet</span>Say hi to start the conversation.';
    messagesEl.appendChild(empty);
    return;
  }

  let lastDay = null;
  messages.forEach(msg => {
    const day = formatDay(msg.timestamp);
    if(day !== lastDay){
      const divider = document.createElement('div');
      divider.className = 'day-divider';
      divider.textContent = day;
      messagesEl.appendChild(divider);
      lastDay = day;
    }

    const row = document.createElement('div');
    row.className = 'row ' + (msg.sender === 'user' ? 'sent' : 'received');

    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    const textSpan = document.createElement('span');
    textSpan.textContent = msg.text;
    bubble.appendChild(textSpan);

    const meta = document.createElement('span');
    meta.className = 'meta';
    meta.textContent = formatTime(msg.timestamp);
    bubble.appendChild(meta);

    row.appendChild(bubble);
    messagesEl.appendChild(row);
  });

  scrollToBottom();
}

function scrollToBottom(){
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addMessage(text, sender){
  const msg = { text, sender, timestamp: Date.now() };
  messages.push(msg);
  saveMessages(messages);
  render();
}

function showTypingIndicator(){
  const row = document.createElement('div');
  row.className = 'row received typing';
  row.id = 'typingRow';
  row.innerHTML = '<div class="bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
  messagesEl.appendChild(row);
  scrollToBottom();
}

function removeTypingIndicator(){
  const row = document.getElementById('typingRow');
  if(row) row.remove();
}

function botReply(){
  showTypingIndicator();
  const delay = 600 + Math.random() * 700;
  setTimeout(() => {
    removeTypingIndicator();
    const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
    addMessage(reply, 'bot');
  }, delay);
}

function handleSend(){
  const text = input.value.trim();
  if(!text) return;
  addMessage(text, 'user');
  input.value = '';
  input.style.height = 'auto';
  botReply();
}

sendBtn.addEventListener('click', handleSend);

input.addEventListener('keydown', (e) => {
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    handleSend();
  }
});

input.addEventListener('input', () => {
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 90) + 'px';
});

clearBtn.addEventListener('click', () => {
  messages = [];
  saveMessages(messages);
  render();
});

render();