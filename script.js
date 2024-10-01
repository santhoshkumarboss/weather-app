document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = "78705f8e33c06e7f274ea95fe1a0ffe9";

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error("Error fetching weather data:", error));
}

function displayWeather(data) {
    if (data.cod === "404") {
        document.getElementById('weatherResult').innerHTML = `<p class="text-danger">City not found!</p>`;
        return;
    }

    const temp = data.main.temp;
    const description = data.weather[0].description;
    const city = data.name;
    const country = data.sys.country;

    document.getElementById('weatherResult').innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${city}, ${country}</h5>
                <p class="card-text">Temperature: ${temp}°C</p>
                <p class="card-text">Description: ${description}</p>
            </div>
        </div>
    `;
}
