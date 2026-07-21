const apiKey = "0d9de9e897dbd2d9e29b3baf4197a41f";
const lat = -33.0245;
const lon = -71.5518;

async function getWeather() {
    const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const currentResponse = await fetch(currentURL);
        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);

        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayCurrentWeather(data) {
    const tempEl = document.querySelector("#temp");
    const descEl = document.querySelector("#weather-description");

    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;

    tempEl.textContent = `Current Temp: ${temp}°C`;
    descEl.textContent = `Conditions: ${description}`;
}

function displayForecast(data) {
    const forecastEl = document.querySelector("#forecast");
    forecastEl.innerHTML = "";

    const dailyForecasts = data.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .slice(0, 3);

    dailyForecasts.forEach((day) => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        const temp = Math.round(day.main.temp);

        const card = document.createElement("div");
        card.classList.add("forecast-card", "card");
        card.innerHTML = `
            <p class="forecast-day">${dayName}</p>
            <p class="forecast-temp">${temp}°C</p>
        `;
        forecastEl.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", getWeather);