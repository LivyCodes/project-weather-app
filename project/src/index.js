function showDate() {
  let now = new Date();
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
  let ap = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  hour = hour ? hour : 12;
  minutes = minutes.toString().padStart(2, "0");

  let newTime = `${days[day]}, ${date} ${months[month]} ${year}, ${hour}:${minutes}${ap}`;
  return newTime;
}
let newTimes = document.querySelector("#day-date");
newTimes.innerHTML = showDate();

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
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${response.data.name}`;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${temperature}°`;
  let stat = document.querySelector("#status");
  stat.innerHTML = `${response.data.weather[0].description}`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `${humidity}%`;
  let windSPEED = document.querySelector("#wind-speed");
  windSPEED.innerHTML = `${windSpeed}km/h`;
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
let button = document.querySelector("#current-button");
button.addEventListener("submit", currentCity);
