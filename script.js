function getWeather() {
    const city = document.getElementById("city").value;
    const result = document.getElementById("result");

    if (city === "") {
        result.innerText = "Please enter a city name ❗";
        return;
    }


    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
    .then(res => res.json())
    .then(data => {

        if (!data.results) {
            result.innerText = "City not found 😢";
            return;
        }

        const lat = data.results[0].latitude;
        const lon = data.results[0].longitude;

        return fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
    })
    .then(res => res.json())
    .then(weather => {
        const temp = weather.current_weather.temperature;
        const wind = weather.current_weather.windspeed;

        result.innerText =
            `🌡️ Temperature: ${temp}°C\n💨 Wind Speed: ${wind} km/h`;
    })
    .catch(err => {
        result.innerText = "Error fetching weather ❌";
    });
}