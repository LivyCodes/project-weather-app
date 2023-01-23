function showDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = now.getDay();

  let date = now.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = now.getMonth();
  let year = now.getFullYear();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  //let ap = hour >= 12 ? "pm" : "am";
  //hour = hour % 12;
  //hour = hour ? hour : 12;
  minutes = minutes.toString().padStart(2, "0");

  let newTime = `${days[day]}, ${date} ${months[month]} ${year}, ${hour}:${minutes}`;
  return newTime;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forecast">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 4) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col">
              <h6 class="forecast-date">${formatDay(forecastDay.dt)}</h6>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" width="200" />
              <p class="temp">
                <span class="forecast-temp-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>/<span
                  class="forecast-temp-min"
                  >${Math.round(forecastDay.temp.min)}°C</span
                >
              </p>
            </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#exampleInputCity");
  //let cityName = document.querySelector("#city-name");
  //cityName.innerHTML = `${inputCity.value}`;
}
let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", searchCity);

function showTemperature(response) {
  console.log(response);
  celsiusTemperature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let feelLike = Math.round(response.data.main.feels_like);
  let icon = response.data.weather[0].icon;
  let highTemp = Math.round(response.data.main.temp_max);
  let lowTemp = Math.round(response.data.main.temp_min);

  let newTimes = document.querySelector("#day-date");
  updateTime = showDate(response.data.dt * 1000);
  newTimes.innerHTML = `Last updated: ${updateTime}`;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${response.data.name}`;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${celsiusTemperature}°`;
  let varTempHigh = document.querySelector("#var-high-temp");
  varTempHigh.innerHTML = `High: ${highTemp}°`;
  let varTempLow = document.querySelector("#var-low-temp");
  varTempLow.innerHTML = `Low: ${lowTemp}°`;
  let stat = document.querySelector("#status");
  stat.innerHTML = `${response.data.weather[0].description}`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `${humidity}%`;
  let windSPEED = document.querySelector("#wind-speed");
  windSPEED.innerHTML = `${windSpeed}km/h`;
  let feelsLike = document.querySelector("#precip");
  feelsLike.innerHTML = `${feelLike}°C`;
  let iconElement = document.querySelector("#icon-element");
  iconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function enterCity(city) {
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemperature);
}
function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleInputCity").value;
  enterCity(city);
}
citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", searchSubmit);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFarenheitTemp(event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let fahrenTemp = document.querySelector("#temperature");
  fahrenTemp.innerHTML = `${Math.round(farenheitTemperature)}°`;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let celTemp = document.querySelector("#temperature");
  celTemp.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

let celsiusTemperature = null;

let button = document.querySelector("#current-button");
button.addEventListener("click", currentCity);

let farenheitTemp = document.querySelector("#farenheit");
farenheitTemp.addEventListener("click", showFarenheitTemp);

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", showCelsiusTemp);

enterCity("Nairobi");
