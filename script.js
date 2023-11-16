const fetchButton = document.getElementById('fetch-data-button');
const locationContainer = document.getElementById('location-container');
const weatherDataContainer = document.getElementById('weather-data-container');

const apiKey = '29c3a676513448fb8d0a2817e65c1e00';
const ipGeolocationAPIUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;

fetchButton.addEventListener('click', async () => {
    try {
        const response = await fetch(ipGeolocationAPIUrl);
        const data = await response.json();

        const latitude = data.latitude;
        const longitude = data.longitude;

        // Display user's location on Google Maps
        const mapUrl = `https://www.google.com/maps/search/?q=${latitude},${longitude}`;
        const mapFrame = document.createElement('iframe');
        mapFrame.src = mapUrl;
        mapFrame.width = '600';
        mapFrame.height = '400';
        locationContainer.appendChild(mapFrame);

        // Fetch weather data based on latitude and longitude
        const weatherDataAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={your_weather_api_key}`;
        const weatherResponse = await fetch(weatherDataAPIUrl);
        const weatherData = await weatherResponse.json();

        // Display weather data
        const weatherDetails = `
      Location: ${weatherData.name}, ${weatherData.sys.country}
      Weather: ${weatherData.weather[0].description}
      Temperature: ${weatherData.main.temp}°C
      Humidity: ${weatherData.main.humidity}%
    `;
        weatherDataContainer.textContent = weatherDetails;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
