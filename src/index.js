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
    document.querySelector("h2").innerHTML = response.data.name;
    document.querySelector("#temp").innerHTML = Math.round(
        response.data.main.temp);
}

function weatherCity(city) {
    let apiKey = "45a134233c7cdfc7dd5c67fe467c947d";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather);
}



function showCity(event) {
    event.preventDefault();
    let h2 = document.querySelector("h2");
    let city = document.querySelector("#city-input").value;
    weatherCity(city);
}


let changeCity = document.querySelector("#city-search");
changeCity.addEventListener("submit", showCity);


weatherCity("Barcelona");