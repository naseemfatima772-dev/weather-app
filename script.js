async function getWeather(){

    const city=document.getElementById("city").value;

    const apiKey="6cdb84a15cb943d12dc6c1006b014815";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    

    try{

        const response=await fetch(url);

        const data=await response.json();
        console.log(data);

        if(data.cod=="404"){
            alert("City Not Found");
            return;
        }

        document.getElementById("cityName").innerHTML=data.name;

        document.getElementById("temp").innerHTML=
        "🌡 Temperature : "+data.main.temp+" °C";

        document.getElementById("humidity").innerHTML=
        "💧 Humidity : "+data.main.humidity+" %";

        document.getElementById("condition").innerHTML=
        "Condition : "+data.weather[0].main;

        let weather=data.weather[0].main;

        if(weather=="Clear"){
            document.getElementById("icon").innerHTML="☀️";
        }

        else if(weather=="Clouds"){
            document.getElementById("icon").innerHTML="☁️";
        }

        else if(weather=="Rain"){
            document.getElementById("icon").innerHTML="🌧️";
        }

        else if(weather=="Snow"){
            document.getElementById("icon").innerHTML="❄️";
        }

        else{
            document.getElementById("icon").innerHTML="🌤";
        }

    }

    catch(error){
        alert("Something went wrong.");
    }

}