
document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherDisplay = document.getElementById('weather-display');

    const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key (e.g., from OpenWeatherMap)

    getWeatherBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            weatherDisplay.innerHTML = '<p>Please enter a city or zip code.</p>';
        }
    });

    function getWeather(location) {
        // Using a placeholder for API call as actual external calls are not possible
        // In a real extension, you would fetch from a weather API like OpenWeatherMap
        // Example: `fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`)`

        weatherDisplay.innerHTML = '<p>Fetching weather data...</p>';

        // Simulate API response
        setTimeout(() => {
            const simulatedData = {
                name: location,
                main: {
                    temp: 68,
                    feels_like: 67,
                    humidity: 60
                },
                weather: [
                    {
                        description: 'Partly Cloudy',
                        icon: '04d'
                    }
                ],
                wind: {
                    speed: 10
                }
            };
            displayWeather(simulatedData);
        }, 1000);
    }

    function displayWeather(data) {
        if (data.name) {
            weatherDisplay.innerHTML = `
                <h2>${data.name}</h2>
                <div class="weather-info"><strong>Temp:</strong> ${data.main.temp}°F</div>
                <div class="weather-info"><strong>Feels like:</strong> ${data.main.feels_like}°F</div>
                <div class="weather-info"><strong>Humidity:</strong> ${data.main.humidity}%</div>
                <div class="weather-info"><strong>Conditions:</strong> ${data.weather[0].description}</div>
                <div class="weather-info"><strong>Wind:</strong> ${data.wind.speed} mph</div>
            `;
        } else {
            weatherDisplay.innerHTML = '<p>Location not found or error fetching data.</p>';
        }
    }
});
