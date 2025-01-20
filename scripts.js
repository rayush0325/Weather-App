const APIkey = "4e0b7e4f8b9dbd62f410a1ee372bd5e5";
const units = {
    "humidity":"%",
    "wind":"km/h"
}
document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.querySelector(".searchBtn");
    searchBtn.addEventListener("click", getLocation);
})
function getLocation() {
    const location = document.querySelector(".location").value;

    if (location == "") {
        showHomePage();
    }

    else {
        search(location);
    }
}
async function getCoordinates(location) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${APIkey}`;
    const promise = await fetch(url);
    const data = await promise.json();
    const coordinates = {
        "lat": `${data["0"].lat}`,
        "lon": `${data["0"].lon}`
    }
    console.log(data);
    return coordinates;
}
async function search(location) {
    try {
        const coordinates = await getCoordinates(location);
        showWeather(coordinates);
    }
    catch (err) {
        showError();
    }

}

async function getWeatherData(coordinates) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${APIkey}`;
    const promise = await fetch(url);
    const data = await promise.json();
    console.log(data);
    const weatherData = {
        "icon": `${data.weather["0"].icon}`,
        "temp": `${Math.floor(data.main["temp"] - 273.15)}`,
        "description": `${data.weather["0"].description}`,
        "humidity": `${data.main["humidity"]}`,
        "wind": `${Math.floor(data.wind["speed"] * 3.6)}`
    }
    for (let key in weatherData) {
        console.log(`${key} : ${weatherData[key]}`);
    }
    return weatherData;
}

async function showWeather(coordinates) {
    
        showSpinner(true);
        const data = await getWeatherData(coordinates);
        showSpinner(false);

        const box = document.querySelector(".box");
        let weather = document.querySelector(".weather");
        if(weather == null){
            weather = document.createElement("div");
            weather.setAttribute("class", "weather");
            box.appendChild(weather);
        }
        setImage(weather, data);
        setDetails(weather, data);

    





    // const weatherElements = document.querySelector(".weather");

}
function showSpinner(flag) {
    const box = document.querySelector(".box");
    const img = document.createElement("img");
    img.setAttribute("class","loading");
    img.setAttribute("src","./assets/loading.gif");
    if (flag) {
        box.removeChild(box.lastElementChild);
        box.appendChild(img);
    }
    else {
        box.removeChild(box.lastElementChild);
    }
}
function setImage(parent, data) {
    const url = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
    const img = document.createElement("img");
    img.setAttribute("src", url);
    parent.appendChild(img);
}
function setDetails(weather, data) {
    const condition = document.createElement("div");
    condition.setAttribute("class", "condition");
    weather.appendChild(condition);

    const temp = document.createElement("div");
    temp.setAttribute("class", "temp");
    temp.innerHTML = `${data.temp} <span>&#8451;</span>`;
    condition.appendChild(temp);

    const description = document.createElement("div");
    description.setAttribute("class", "description");
    description.innerText = `${data.description}`;
    condition.appendChild(description);

    const details = document.createElement("div");
    details.setAttribute("class", "details");
    weather.appendChild(details);

    setParameter("humidity", data);
    setParameter("wind", data);

    const humidity = document.querySelector(".humidity");

}
function setParameter(paraName, data) {
    const details = document.querySelector(".details");
    const parameter = document.createElement("div");
    parameter.setAttribute("class", "parameter");
    details.appendChild(parameter);

    const img = document.createElement("img");
    img.setAttribute("src", `./assets/${paraName}.png`);
    parameter.appendChild(img);

    const div = document.createElement("div");
    parameter.appendChild(div);

    const val = document.createElement("div");
    val.innerText = `${data[`${paraName}`]} ${units[`${paraName}`]}`;
    val.setAttribute("class", "val");
    div.appendChild(val);

    const name = document.createElement("div");
    name.setAttribute("class", `name ${paraName}`)
    name.innerText = `${paraName}`
    div.appendChild(name);
}
function showError() {
    const box = document.querySelector(".box");
    box.removeChild(box.lastElementChild);
    const div = document.createElement("div");
    div.setAttribute("class", "notWeather");
    box.appendChild(div);

    const message = document.createElement("div");
    message.setAttribute("class", "message");
    message.innerText = "location not found";
    div.appendChild(message);

    const img = document.createElement("img");
    img.setAttribute("src", "./assets/not-found.png");
    div.appendChild(img);
}
function showHomePage() {
    const box = document.querySelector(".box");
    box.removeChild(box.lastElementChild);
    const div = document.createElement("div");
    div.setAttribute("class", "notWeather");
    box.appendChild(div);

    const img = document.createElement("img");
    img.setAttribute("src", "./assets/initial-icon.png");
    div.appendChild(img);
}
