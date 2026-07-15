//API configuration
const BASE_URL='https://api.openweathermap.org/data/2.5'
 console.log("WeatherSphere Loaded Successfully")

 // meteocons weather icons mapping
 const iconMap={
    "01d":"clear-day",
    "01n":"clear-night",
    "02d":"partly-cloudy-day",
    "02n":"partly-cloudy-night",   
    "03d":"cloudy",
    "03n":"cloudy",
    "04d":"overcast",
    "04n":"overcast",
    "09d":"drizzle",
    "09n":"drizzle",
    "10d":"rain",
    "10n":"rain",
    "11d":"thunderstorms",
    "11n":"thunderstorms",
    "13d":"snow",
    "13n":"snow",
    "50d":"fog",
    "50n":"fog"
 }

 //DOM references
  const searchInput=document.getElementById("input-text")
  const searchBtn=document.getElementById("searchBtn")
  const locateBtn=document.getElementById("locationBtn")
  const recentList=document.getElementById("recent-list")
  const cityEl=document.getElementById("city")
  const countryEl=document.getElementById("country-text")
  const dayEl=document.getElementById("day")
  const dateTimeEl=document.getElementById("date-time")
  const weatherIcon=document.getElementById("weather-icon")
  const tempEl=document.getElementById("temperature")
  const conditionEl=document.getElementById("condition")
  const feelsLikeEl=document.getElementById("feels-like")
  const humidityEl=document.getElementById("humidity-value")
  const windEl=document.getElementById("wind-speed")
  const visibilityEl=document.getElementById("visible")
  const pressureEl=document.getElementById("pressure")
  const sunriseEl=document.getElementById("rise")
  const sunsetEl=document.getElementById("set")
  const forecastCards=document.getElementById("forecast-cards")
  const aiEl=document.getElementById("advice")
  const updated=document.getElementById("update")
  const errorEl=document.querySelector(".error")
  const loadingEl=document.querySelector(".loading")
  const celsiusBtn=document.getElementById("celsius")
  const fahrenBtn=document.getElementById("fera")
 const locationIcon= document.querySelector(".fa-solid fa-location-dot")
 let currentUnit="°C"
 //Default-city on page load
 window.addEventListener("DOMContentLoaded",()=>{
    fetchWeather("Mumbai")
 })

  //Search-section 
searchBtn.addEventListener('click',()=>{
    let city= searchInput.value.trim()
    console.log(city)
  if(city===""){
  errorEl.style.display="block";
  setTimeout(()=>{
    errorEl.style.display="none"
},3000)
return
  }
  fetchWeather(city)
  searchInput.value=""
})
searchInput.addEventListener('keydown',(e)=>{
    let city= searchInput.value.trim()
    if(e.key==="Enter"){
  if(city===""){
  errorEl.style.display="block";
  setTimeout(()=>{
    errorEl.style.display="none"
},3000)
return;
  }
  fetchWeather(city)
  searchInput.value=""
}
})
async function fetchWeather(city){
    loadingEl.style.display="block"
    errorEl.style.display="none"
    try{
     let response=await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`)
     console.log(response.ok)
     if(!response.ok){
      throw  new err
     }
     let data= await response.json()
      await console.log(data)
      displayWeather(data)
       toggleButton(data)
    }
    catch(err){
         errorEl.style.display="block"
        setTimeout(()=>{
             errorEl.style.display="none"
        },3000)
    } 
    finally {
        loadingEl.style.display="none"   
    }
} 

// display City information
 function displayWeather(data){
    cityEl.textContent=data.name  
    countryName=data.sys.country 
    const regionNames=new Intl.DisplayNames(['en'],{type:'region'}) 
    const completeCountryName=regionNames.of(countryName)
    countryEl.textContent=completeCountryName

    // weather information
    
     let info=Math.round(data.main.feels_like)
     let currentTemp=data.main.temp
     let tempInfo =Math.round(currentTemp)
    tempEl.textContent=`${tempInfo}${currentUnit}`
    feelsLikeEl.textContent=`Feels like ${info}°C `
    conditionEl.textContent=data.weather[0].description

    //weather icons 
    const iconCode=data.weather[0].icon
    const iconName=iconMap[iconCode]
    const iconUrl=`https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${iconName}.svg`
    console.log(iconName)
    console.log(iconUrl)
    weatherIcon.style.display="block"
    weatherIcon.src= iconUrl

    // stats-grid
    humidityEl.textContent= `${data.main.humidity}%`
    const windSpeed= Math.round(data.wind.speed *3.6)
    windEl.textContent= `${windSpeed} Km/h`
    visibilityEl.textContent= `${data.visibility/1000} Km`
    pressureEl.textContent=`${data.main.pressure} hPa`

    // date-time function
    function updateDateTime(timezoneOffset){
        const utc=new Date().getTime()+ new Date().getTimezoneOffset()*60000
        const cityTime=new Date(utc+ timezoneOffset*1000)
        const options={
            year:"numeric",
            month:"long",
            day:"numeric",
            hour:"2-digit",
            minute:"2-digit",
            hour12:true
        }
        const formatted= cityTime.toLocaleDateString("en-GB",options)
        dateTimeEl.textContent= formatted.replace(" at","  •  ")
        const day= cityTime.toLocaleDateString("en-US",{
            weekday:"long"
        })
        dayEl.textContent=day
    }
    updateDateTime(data.timezone)

    //sunset and sun rise
    function formatTime(unixTime,timezoneOffset){
        const formatTimestamp=unixTime*1000+timezoneOffset*1000
        const formatTime=new Date(formatTimestamp).toLocaleTimeString('en-US',{
        hour:'2-digit',
        minute:'2-digit',
        timeZone:"UTC"
    })
    return formatTime
    }
    sunriseEl.textContent= formatTime(data.sys.sunrise,data.timezone)
     sunsetEl.textContent=formatTime(data.sys.sunset,data.timezone)
}
// toggle button
function toggleButton(data){
    if(currentUnit==="°C"){
        fahrenBtn.addEventListener('click',()=>{
            celsiusBtn.classList.toggle('active')
            fahrenBtn.classList.toggle('active')
           currentTemp=(data.main.temp *(9/5))+32
          currentUnit="°F"
        })
        return
    }else{
        celsiusBtn.addEventListener('click',()=>{
             fahrenBtn.classList.toggle('active')
            celsiusBtn.classList.toggle('active')
            currentTemp=data.main.temp
        })
        return
    }
}

