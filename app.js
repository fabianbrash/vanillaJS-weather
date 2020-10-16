
//OUR API

const api = {
  key: "06032985caaa517e09845af31821fad2",
  base: "https://api.openweathermap.org/data/2.5/"
}

const KELVIN = 273;


// SELECT ELEMENTS

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {}

weather.temperature = {
    unit: "celsius"
}

// CHECK IF BROWSER SUPPORTS GEOLOCATION

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>"
}

// SET USER'S POSITION

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude)
}

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API

const getWeather = (latitude, longitude) => {

    const theAPI = `${api.base}/weather?lat=${latitude}&lon=${longitude}&appid=${api.key}`;

    fetch(theAPI)
      .then(response => {
          let data = response.json();
          return data;
      })
      .then(data => {
          weather.temperature.value = Math.floor(data.main.temp - KELVIN);
          weather.description = data.weather[0].description;
          weather.iconId = data.weather[0].icon;
          weather.city = data.name;
          weather.country = data.sys.country;
          console.log(data);
      })
      .then(() => {
          displayWeather();
      })
}

const displayWeather = () => {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}&#176;<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
