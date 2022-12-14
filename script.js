"use strict";

const city = document.querySelector(".city");
const icon1 = document.querySelector(".icon");
const description1 = document.querySelector(".description");
const temp1 = document.querySelector(".temp");
const humidity1 = document.querySelector(".humidity");
const wind1 = document.querySelector(".wind");
const searchButton = document.querySelector("button");
const searchBar = document.querySelector(".search-bar");
const weather1 = document.querySelector(".weather");

searchButton.addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

let weather = {
  apiKey: "3fe0736b12c4d7fcd2a796891c20205e",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((Response) => Response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    city.innerHTML = "Weather in " + name;
    icon1.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    description1.innerHTML = description;
    temp1.innerHTML = Math.round(temp) + "°C";
    humidity1.innerHTML = "Humidity: " + humidity + "%";
    wind1.innerHTML = "Wind speed: " + Math.round(speed) + " km/h";
    weather1.classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(searchBar.value);
  },
};

weather.fetchWeather("tbilisi");
