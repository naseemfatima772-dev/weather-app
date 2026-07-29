# 🌤 Weather Dashboard

A modern and responsive Weather Dashboard built with **HTML, CSS, and JavaScript**. This application fetches live weather data from the **OpenWeather API** using **Fetch API** and **Async/Await**. Users can search for any city and view the current weather along with a 3-day forecast.

## 🚀 Features

* 🔍 Search weather by city name
* 🌡 Display current temperature
* ☁️ Show weather condition
* 💧 Display humidity
* 🖼 Dynamic weather icons
* 📅 3-Day weather forecast
* ⏳ Loading state while fetching data
* ❌ Friendly error message for invalid cities or network issues
* 📱 Responsive and modern UI

## 🛠 Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Fetch API
* Async/Await
* OpenWeather API

## 📸 Preview

Search for any city to view live weather information and a 3-day forecast in a clean and interactive dashboard.

## 📂 Project Structure

```
Weather-Dashboard/
│── index.html
│── style.css
│── script.js
└── README.md
```

## 📖 How Async Loading & Error Handling Works

The application uses `async/await` with the Fetch API to retrieve live weather data from the OpenWeather API. A loading message is displayed while the request is in progress so users know the application is working. If the request fails because of an invalid city name or a network issue, a friendly error message is shown instead of leaving the interface blank. This approach provides a smoother and more user-friendly experience.

## ▶️ How to Run

1. Download or clone this repository.
2. Open the project folder.
3. Replace the API key in `script.js` with your own OpenWeather API key (if needed).
4. Open `index.html` in your browser.
5. Search for any city to view live weather information.

## 👩‍💻 Author

**Naseem Fatima**
