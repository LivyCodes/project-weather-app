function showDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Friday",
    "Saturday",
    "Sunday",
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
  let celsiusTemperature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let icon = response.data.weather[0].icon;
  let highTemp = Math.round(response.data.main.temp_max);
  let lowTemp = Math.round(response.data.main.temp_min);

  let newTimes = document.querySelector("#day-date");
  updateTime = showDate(response.data.dt * 1000);
  newTimes.innerHTML = `Last updated on ${updateTime}`;
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
  let iconElement = document.querySelector("#icon-element");
  iconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${icon}@2x.png`
  );
}

function enterCity() {
  let inputCity = document.querySelector("#exampleInputCity");
  let city = inputCity.value;
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemperature);
}
citySearchForm.addEventListener("submit", enterCity);

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
  //event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperat = document.querySelector("#temperature");
  temperat.innerHTML = Math.round(farenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperat = document.querySelector("#temperature");
  temperat.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let button = document.querySelector("#current-button");
button.addEventListener("submit", currentCity);

let farenheitTemp = document.querySelector("#farenheit");
farenheitTemp.addEventListener("click", showFarenheitTemp());

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", showCelsiusTemp());
