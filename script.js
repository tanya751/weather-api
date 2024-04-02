const API_KEY = "168771779c71f3d64106d8a88376808a";

async function showweather(){
try{
    let city = "goa";
const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
const data = await response.json();
console.log("weather data ->" + data);
//let newPara = document.createElement('p');
//newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
//document.body.appendChild(newPara);
renderWeatherInfo(data);
}
catch(err){
///handle the error
}
}
async function getCustomWeatherDetails(){
   try{ let latitude = 15.6333;
    let longitude = 18.333;
    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    let data = await result.json();
    console.log(data);
}
catch(err){
    console.log("error found" , err);
}
}

function getLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("No Geolocation Support");
    }
}
function showPosition(){
    let lat = posititon.coords.latitude;
    let long = posititon.coords.longitude;
    console.log(lat);
    console.log(long);
}