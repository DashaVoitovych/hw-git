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

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2 five-days">
              <div class="card text-center">
                <div class="card-header">
                  ☁️
                </div>
                <div class="card-body">3° / 10°C
                </div>
                <div class="card-footer text-muted">
                 ${day}
                </div>
              </div>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  console.log(response);
  console.log(response.data.temperature.current);
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
  console.log(lat);
  let lon = position.coords.longitude;
  console.log(lon);
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

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = fahrenheitTemp;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchForCity("London");
displayForecast();
