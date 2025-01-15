
async function fun(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4e0b7e4f8b9dbd62f410a1ee372bd5e5`;
    const response = await fetch(url);
    let data = await response.json();
    const img = document.querySelector("img");
    img.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather["0"].icon}@2x.png`);
    console.log(data);
    for(let key in data){
        console.log(key);
        
    }
}
function setCity(){
    const city  = document.querySelector("#input").value;
    console.log("hello")
    fun(city)
}
const button = document.querySelector("button");
button.addEventListener("click",setCity);