let now = new Date();
let showCurrentDate = document.querySelector("#date-selector");

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let currentDay = days[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
    currentHour = `0${currentHour}`;
}

let currentMinute = now.getMinutes();
if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
}

showCurrentDate.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

function formatDay(timestamp) {
    let date = new Date(timestamp *1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}°C </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}°C </span>
        </div>
      </div>
  `;
    }
  });


   
    forecastHTML = forecastHTML + `<div/>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
}


function getForecast (coordinates) {
console.log(coordinates);
let apiKey = "45a134233c7cdfc7dd5c67fe467c947d";
let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
    console.log(response);
    let temperatureElement = document.querySelector("#temp");
    celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML =  response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast (response.data.coord);

}


function weatherCity(city) {
    let apiKey = "45a134233c7cdfc7dd5c67fe467c947d";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather);
}

function showFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature*9)/5 + 32;
    let temperatureElement = document.querySelector("#temp");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#Fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#Celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

function showCity(event) {
    event.preventDefault();
    let h2 = document.querySelector("h2");
    let city = document.querySelector("#city-input").value;
    weatherCity(city);
}


let changeCity = document.querySelector("#city-search");
changeCity.addEventListener("submit", showCity);


weatherCity("Barcelona");