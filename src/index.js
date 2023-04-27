// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   berlin: {
//     temp: 20.9,
//     humidity: 10,
//   },

//   krakow: {
//     temp: 5,
//     humidity: 60,
//   },
// };
// let city = prompt("Enter a city");
// city = city.toLowerCase();
// if (weather[city] !== undefined) {
//   let temperature = weather[city].temp;
//   let celsiusTemp = Math.round(temperature);
//   let fahrenheitTemp = Math.round(temperature * 1.8 + 32);
//   let humidity = weather[city].humidity;
//   alert(
//     `It is currently ${celsiusTemp}°C (${fahrenheitTemp}°F) in ${city} with a humidity of ${humidity}%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }

// function changeToFahrenheit(event) {
//   event.preventDefault;
//   let currentTemp = document.querySelector("#current-temp");

//   let fahrenheitTemp = Math.round((currentTemp * 9) / 5 + 32);
//   let grad = document.querySelector("#current-temp");
//   grad.innerHTML = `${fahrenheitTemp}°`;
// }

// let toFahrenheitSystem = document.querySelector("#celcium-button");
// toFahrenheitSystem.addEventListener("click", changeToFahrenheit);


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
  let currentMonth = date.getMonth();
  let currentDate = date.getDate();
  let dayHour = document.querySelector("#day-hour");
  dayHour.innerHTML = `${currentDay}  ${currentHour}:${currentMinute}`;
  let fullTime = document.querySelector("#date");
  fullTime.innerHTML = `${currentDate}.${currentMonth}.${currentYear}`;
}

formatDate(currentTime);

function showTemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let tempNow = document.querySelector("#current-temp");
  tempNow.innerHTML = `${temperature}°`;
}

function searchForCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-text-input");
  console.log(cityInput.value);

  let apiKey = "017d56650cd168d68067850318775d43";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", searchForCity);

function showTemp(response) {
  console.log(response.data.main.temp);
  let yourTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${yourTemp}°`;
  let currentCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  console.log(lat);
  let lon = position.coords.longitude;
  console.log(lon);
  let apiKey = "597c40c39084687093b091cd48b366f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#geo-mark");
currentLocation.addEventListener("click", getCurrentPosition);
