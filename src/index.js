let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  let currentYear = date.getFullYear();
  let currentMonth = ("0" + (date.getMonth() + 1)).slice(-2);
  let currentDate = `0${date.getDate()}`.slice(-2);
  let dayHour = document.querySelector("#day-hour");
  dayHour.innerHTML = `${currentDay}  ${currentHour}:${currentMinute}`;
  let fullTime = document.querySelector("#date");
  fullTime.innerHTML = `${currentDate}.${currentMonth}.${currentYear}`;
}

formatDate(currentTime);

function getForecast(coordinates) {
  let apiKey = "84fcftd03of3d3844ecba1bafb7d3009";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  
let forecast = response.data.daily;
  
  let forecastElement = document.querySelector("#weather-forecast");
  
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 five-days">
        <div class="card text-center">
        <div class="card-header">
            <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
          alt=""
          width="42"
        />
        </div>
        <div class="card-body"><span class="min">${Math.round(
          forecastDay.temperature.minimum
        )}°</span> / <span class="max">${Math.round(
          forecastDay.temperature.maximum
        )}°C</span>
        </div>
        <div class="card-footer text-muted">
          ${formatDay(forecastDay.time)}
        </div>
      </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  celsiusTemperature = response.data.temperature.current;
  let temperature = Math.round(celsiusTemperature);
  let city = response.data.city;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let tempNow = document.querySelector("#current-temp");
  tempNow.innerHTML = `${temperature}`;
  let iconElement = document.querySelector("#current-weather-icon");
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
  iconElement.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.coordinates);
}

function showTemp(response) {
  celsiusTemperature = response.data.temperature.current;
  let yourTemp = Math.round(celsiusTemperature);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${yourTemp}`;
  let currentCity = response.data.city;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "84fcftd03of3d3844ecba1bafb7d3009";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#geo-mark");
currentLocation.addEventListener("click", getCurrentPosition);

function searchForCity(city) {
  let apiKey = "84fcftd03of3d3844ecba1bafb7d3009";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-text-input");
  searchForCity(cityInput.value);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

searchForCity("London");

