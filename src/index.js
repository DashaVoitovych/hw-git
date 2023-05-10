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

function showTemperature(response) {
  console.log(response);
  console.log(response.data.temperature.current);
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let tempNow = document.querySelector("#current-temp");
  tempNow.innerHTML = `${temperature}°`;
  let iconElement = document.querySelector("#current-weather-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/${response.data.condition.icon}`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function searchForCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-text-input");
  console.log(cityInput.value);

  let apiKey = "84fcftd03of3d3844ecba1bafb7d3009";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", searchForCity);

function showTemp(response) {
  console.log(response.data.temperature.current);
  let yourTemp = Math.round(response.data.temperature.current);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${yourTemp}°`;
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
