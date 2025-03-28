const apiKey = "5402372b5e48b1e1f9c53d108e943ac6"; // OpenWeatherMap API Key

function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                document.getElementById("temperature").innerText = "❌";
                document.getElementById("weather-condition").innerText = "City not found!";
                document.body.style.background = "#ff7b72";
                return;
            }

            const temperature = data.main.temp;
            const weather = data.weather[0].description.toLowerCase();
            const city = data.name;

            document.getElementById("temperature").innerText = `${temperature}°C`;
            document.getElementById("weather-condition").innerText = weather;
            document.getElementById("location").innerText = `📍 ${city}`;

            updateWeatherAnimation(weather);
        })
        .catch(error => {
            console.log("Error:", error);
            document.getElementById("weather-condition").innerText = "⚠️ Failed to fetch data!";
        });
}

function updateWeatherAnimation(weather) {
    const bg = document.getElementById("background-animation");
    const weatherIcon = document.getElementById("weather-icon");
    bg.innerHTML = "";

    if (weather.includes("clear")) {
        document.body.style.background = "linear-gradient(to bottom, #ffeb3b, #ff9800)";
        bg.innerHTML = `<div class="sun"></div>`;
        weatherIcon.innerHTML = `<i class="fas fa-sun"></i>`;
    }
    else if (weather.includes("rain")) {
        document.body.style.background = "linear-gradient(to bottom, #4a90e2, #1c3f95)";
        weatherIcon.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i>`;
        for (let i = 0; i < 20; i++) {
            let drop = document.createElement("div");
            drop.className = "rain";
            drop.style.left = `${Math.random() * 100}%`;
            bg.appendChild(drop);
        }
    }
    else if (weather.includes("snow")) {
        document.body.style.background = "linear-gradient(to bottom, #b3e5fc, #64b5f6)";
        weatherIcon.innerHTML = `<i class="fas fa-snowflake"></i>`;
        for (let i = 0; i < 15; i++) {
            let snowflake = document.createElement("div");
            snowflake.className = "snow";
            snowflake.style.left = `${Math.random() * 100}%`;
            bg.appendChild(snowflake);
        }
    }
    else if (weather.includes("cloud")) {
        document.body.style.background = "linear-gradient(to bottom, #cfd8dc, #607d8b)";
        weatherIcon.innerHTML = `<i class="fas fa-cloud"></i>`;
    }
    else if (weather.includes("thunderstorm")) {
        document.body.style.background = "linear-gradient(to bottom, #616161, #212121)";
        weatherIcon.innerHTML = `<i class="fas fa-bolt"></i>`;
        let lightning = document.createElement("div");
        lightning.className = "lightning";
        bg.appendChild(lightning);
    }
}
