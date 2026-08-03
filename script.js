const apiKey = "6cdb84a15cb943d12dc6c1006b014815";

async function getWeather() {

    const city = document.getElementById("city").value.trim();

    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const weatherCard = document.getElementById("weatherResult");
    const forecast = document.getElementById("forecast");
    const forecastTitle = document.querySelector(".forecast-title");

    loading.style.display = "block";
    error.style.display = "none";
    weatherCard.style.display = "none";
    forecast.innerHTML = "";
    forecastTitle.style.display = "none";

    try {

        // Current Weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const currentData = await currentResponse.json();

        if (currentData.cod != 200) {
            throw new Error("City not found");
        }

        // Forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );

        const forecastData = await forecastResponse.json();

        // Current Weather
        document.getElementById("cityName").textContent = currentData.name;

        document.getElementById("temp").textContent =
            `${Math.round(currentData.main.temp)}°C`;

        document.getElementById("condition").textContent =
            currentData.weather[0].main;

        document.getElementById("humidity").textContent =
            `Humidity: ${currentData.main.humidity}%`;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;

        weatherCard.style.display = "block";

        // 3-Day Forecast
        forecastTitle.style.display = "block";

        let shown = 0;

        for (let i = 0; i < forecastData.list.length; i++) {

            if (forecastData.list[i].dt_txt.includes("12:00:00")) {

                const item = forecastData.list[i];

                forecast.innerHTML += `
                    <div class="forecast-card">
                        <h4>${new Date(item.dt_txt).toLocaleDateString("en-US",{weekday:"short"})}</h4>

                        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">

                        <p>${Math.round(item.main.temp)}°C</p>

                        <p>${item.weather[0].main}</p>
                    </div>
                `;

                shown++;

                if (shown == 3) break;
            }
        }

    }

    catch (err) {

        error.style.display = "block";
        error.textContent = "❌ City not found or network error.";

    }

    finally {

        loading.style.display = "none";

    }

}