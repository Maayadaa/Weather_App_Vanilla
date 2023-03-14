//Global Variables
let currentDate = document.querySelector("#today");
let city = document.querySelector("#city");
let cityInput = document.querySelector("#cityInput");
let temp = document.querySelector("#todayTemp");
let description = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let apiKey = "1b7bf581cf8af8c6c19fd4e49df2fbe3";

//Show Date and Time
let hour = new Date().getHours().toString().padStart(2, "0");
let minutes = new Date().getMinutes().toString().padStart(2, "0");
let dayIndex = new Date().getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[dayIndex];
currentDate.innerHTML = `📅 ${day} ${hour}:${minutes}`;

//Change city
function showWeather(response) {
  let newTemp = Math.round(response.data.main.temp);
  let newDescription = response.data.weather[0].description;
  let newHumidity = response.data.main.humidity;
  let newWind = response.data.wind.speed;
  let icon = document.querySelector("#icon");
  let newIcon = response.data.weather[0].icon;

  city.innerHTML = response.data.name;
  temp.innerHTML = `${newTemp}°C`;
  description.innerHTML = newDescription;
  humidity.innerHTML = newHumidity;
  wind.innerHTML = newWind;
  icon.src = `https://openweathermap.org/img/wn/${newIcon}@2x.png`;
}

function changeCity(event) {
  event.preventDefault();
  if (cityInput.value.trim()) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(showWeather);
  } else {
    alert("Please enter your city!");
  }
}
let submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", changeCity);

function changeFeh(response) {
  let newTemp = Math.round(response.data.main.temp);
  temp.innerHTML = `${newTemp}°F`;
}

function changeToFeh(event) {
  event.preventDefault();
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(changeFeh);
}

let fehTemp = document.querySelector("#fehUnit");
fehTemp.addEventListener("click", changeToFeh);

let celTemp = document.querySelector("#celUnit");
celTemp.addEventListener("click", changeCity);
