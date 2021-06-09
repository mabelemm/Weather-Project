//date and time
let h5 = document.querySelector("h5");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "sunday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Spetember",
  "October",
  "November",
  "December",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();
if (date < 10) {
  date = `0${date}`;
}
let month = months[now.getMonth()];
h5.innerHTML = `${day}, ${month} ${date} ${hour}:${minutes}`;

// display weather
function displayWeather(response) {
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#country`).innerHTML = response.data.sys.country;
  document.querySelector(`#temp`).innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(`#humid`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  //document.querySelector("#description").innerHTML =
  //response.data.weather[0].main;
}
//searching entered city
function search(event) {
  event.preventDefault();
  let city = document.querySelector(`#city-input`).value;
  let apiKey = "9401bb320e6030fd32bddc72534dad85";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Current position button
function showPosition(position) {
  let apiKey = "9401bb320e6030fd32bddc72534dad85";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector(`#current-location-button`);
currentLocationButton.addEventListener("click", getPosition);
