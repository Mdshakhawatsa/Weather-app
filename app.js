document.getElementById("getWeatherBtn").addEventListener("click", function() {
const city = encodeURIComponent(document.getElementById("cityInput").value);
    const apiKey = '9c67e8632075097fcce308f67a30978a';  // Replace this with your OpenWeatherMap API key

    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            showError(error.message);
        });
});

function displayWeather(data) {
    const cityName = data.name;
    const description = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = data.weather[0].icon;

    // Update the DOM with weather information
    document.getElementById("cityName").textContent = cityName;
    document.getElementById("description").textContent = description;
    document.getElementById("temperature").textContent = `${temperature}°C`;
    document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
    document.getElementById("windSpeed").textContent = `Wind Speed: ${windSpeed} m/s`;
    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${icon}.png`;

    document.getElementById("weatherInfo").classList.remove("hidden");
    document.getElementById("error").classList.add("hidden");
}

function showError(message) {
    document.getElementById("error").textContent = message;
    document.getElementById("error").classList.remove("hidden");
    document.getElementById("weatherInfo").classList.add("hidden");
}
