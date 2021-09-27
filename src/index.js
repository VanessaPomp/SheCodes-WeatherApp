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

}


function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class = "row">`;
    let days = ["Thu", "Fri", "Sat", "Sun"];
    days.forEach(function(day) {
        forecastHTML = forecastHTML + `
               <div class="col-2">
                   <div class="weather-forecast-date">
                   ${day}
                </div>
                   <img src="http://openweathermap.org/img/wn/02d.png" alt="" width="42"/>
                   <div class="weather-forecast-temperature">
                       <span class="weather-forecast-temperature-max">
                   18°
                </span>
                <span class="weather-forecast-temperature-min">
                12°
                </span>
                </div>
               </div>`
           ;
    })


   
    forecastHTML = forecastHTML + `<div/>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
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
displayForecast();