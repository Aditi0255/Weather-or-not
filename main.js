// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

const foricon = document.querySelector(".weather-icon");
const fortemperature = document.querySelector(".temperature-value p");
const fordescription = document.querySelector(".temperature-description p");
const forlocation = document.querySelector(".location p");
const fordisplay = document.querySelector(".display");

// App data
const val = {};

val.temperature = {
    unit: "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(present, notpresent);
} else {
    fordisplay.style.display = "block";
    fordisplay.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function present(where) {
    let lati = where.coords.latitude;
    let longi = where.coords.longitude;

    gett(lati, longi);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function notpresent(a) {
    fordisplay.style.display = "block";
    fordisplay.innerHTML = `<p> ${a.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function gett(lati, longi) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${key}`;

    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            val.temperature.value = Math.floor(data.main.temp - KELVIN);
            val.description = data.weather[0].description;
            val.iconId = data.weather[0].icon;
            val.city = data.name;
            val.country = data.sys.country;
        })
        .then(function() {
            showw();
        });
}

// DISPLAY WEATHER TO UI
function showw() {
    foricon.innerHTML = `<img src="icons/${val.iconId}.png"/>`;
    fortemperature.innerHTML = `${val.temperature.value}°<span>C</span>`;
    fordescription.innerHTML = val.description;
    forlocation.innerHTML = `${val.city}, ${val.country}`;
}

// C to F conversion
function celtofah(x) {
    return (x * 9 / 5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
fortemperature.addEventListener("click", function() {
    if (val.temperature.value === undefined) return;

    if (val.temperature.unit == "celsius") {
        let fah = celtofah(val.temperature.value);
        fah = Math.floor(fah);

        fortemperature.innerHTML = `${fah}°<span>F</span>`;
        val.temperature.unit = "fahrenheit";
    } else {
        fortemperature.innerHTML = `${val.temperature.value}°<span>C</span>`;
        val.temperature.unit = "celsius"
    }
});