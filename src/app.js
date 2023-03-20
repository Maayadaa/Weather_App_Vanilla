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

//fotmat date
function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
//forecast function hTML
function showForecast(response) {
  let Forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecastRow");
  let forecastHTML = "";

  Forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
          <div class="col-2">
            <div id="forecastDay">${formatDay(forecastDay.time)}</div>
            <div class="row align-items-start">
              <img
                src="${forecastDay.condition.icon_url}"
                alt=""
                id="forecastIcon"
              />
            </div>
            <div class="row align-items-start" id="max_min">
              <div>
                <span id="maxTemp">${Math.round(
                  forecastDay.temperature.maximum
                )}°</span>
                <span id="minTemp">${Math.round(
                  forecastDay.temperature.minimum
                )}°</span>
              </div>
            </div>
          </div>
        `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function changeCity(event) {
  event.preventDefault();
  if (cityInput.value.trim()) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(showWeather);
    //forecast
    let apiURLForecast = `https://api.shecodes.io/weather/v1/forecast?query=${cityInput.value}&key=4f13403b55o7f4ea4b270ff5d243at5e&units=metric`;
    axios.get(apiURLForecast).then(showForecast);
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

//forecast fah

function changeToFeh(event) {
  event.preventDefault();
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(changeFeh);

  let apiURLForecast = `https://api.shecodes.io/weather/v1/forecast?query=${cityInput.value}&key=4f13403b55o7f4ea4b270ff5d243at5e&units=imperial`;
  axios.get(apiURLForecast).then(showForecast);
}

let fehTemp = document.querySelector("#fehUnit");
fehTemp.addEventListener("click", changeToFeh);

let celTemp = document.querySelector("#celUnit");
celTemp.addEventListener("click", changeCity);
