const usertab = document.querySelector("[data-userweather]");
const searchtab = document.querySelector("[data-searchweather]");
const usercontainer = document.querySelector(".weather-container");
const grantAccesscontainer = document.querySelector(".grant-location-container");
const searchform = document.querySelector("[data-searchform]");
const loadingscreen = document.querySelector(".loading-container");
const userinfocontainer = document.querySelector(".user-info-container");
//initially variables need

let oldtab = usertab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldtab.classList.add("current-tab");

function switchtab(newtab){
    if(newtab != oldtab){
        oldtab.classList.remove("currenttab");
        oldtab = newtab;
        oldtab.classList.add("currenttab");
    
     if(!searchform.classList.contains("active")){
        userinfocontainer.classList.remove("active");
        grantAccesscontainer.classList.remove("active");
        searchform.classList.add("active");
     }
     else{
        userinfocontainer.classList.remove("active");
        searchform.classList.remove("active");
        getfromSessionStorage();
     }
  }
}
usertab.addEventListener("click", () =>{
    switchtab(usertab);
});
searchtab.addEventListener("click", () =>{
    switchtab(searchtab);
});

function getfromSessionStorage(){
    const localcoordinates = sessionStorage.getItem("user-coordinates");
    if(!localcoordinates){
        //if not present
        grantAccesscontainer.classList.add("active");
    }
    else{
       const coordinates = JSON.parse(localcoordinates);
       fetchUserWeatherInfo(coordinates);
    }
}

 async function fetchUserWeatherInfo(coordinates){
       const {lat, lon} = coordinates;
       //make grantaccess contnr invisible
       grantAccesscontainer.classList.remove("active");
       //make loader visible
       loadingscreen.classList.add("active");

       //API Call
       try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
       }
}

function renderWeatherInfo(weatherinfo){
      const cityName = document.querySelector("[data-cityname]");
      const countryIcon = document.querySelector("[data-countryIcon]");
      const desc = document.querySelector("[data-weatherdesc]");
      const weatherIcon = document.querySelector("[data-weatherIcon]");
      const temp = document.querySelector("[data-temp]");
      const windSpeed = document.querySelector("[data-windspeed]");
      const humidity = document.querySelector("[data-humidity]");
      const cloudiness = document.querySelector("[data-cloud]");

      //fetch above values from weatherinfo nd show this on UI elements
      cityName.innerText = weatherinfo?.name;
      countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
      desc.innerText = weatherinfo?.weather?.[0]?.decription;
      weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
      temp.innerText = weatherinfo?.main?.temp;
      windSpeed.innerText = weatherinfo?.wind?.speed;
      humidity.innerText = weatherinfo?.main?.humidity;
      cloudiness.innerText = weatherinfo?.clouds?.all;
    }

    function getLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    function showPosition(){
        const userCoordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        }
        sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
        //to show on ui
        fetchUserWeatherInfo(userCoordinates);
   }
    const grantaccessButton = document.querySelector("[data-grantaccess]");
    grantaccessButton.addEventListener("click",getLocation);