//API configuration
const BASE_URL='https://api.openweathermap.org/data/2.5'
 console.log("WeatherSphere Loaded Successfully")
 fetch(`${BASE_URL}/weather?q=London&appid=${API_KEY}`)
 .then(response=>response.json())
 .then(data=>console.log(data))
 .catch(error=>console.log(error))
 //DOM references
  const searchInput=document.getElementById("input-text")
  const searchBtn=document.getElementById("searchBtn")
  const locateBtn=document.getElementById("locationBtn")
  const recentList=document.getElementById("recent-list")
  const countryEl=document.getElementById("country")
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
  const loadingEl=document.querySelector("spinner")
  const celsiusBtn=document.getElementById("celsius")
  const fahrenBtn=document.getElementById("fera")
searchBtn.addEventListener('click',()=>{
  if(searchInput.value.trim()===""){
  errorEl.style.display="block";
  setTimeout(()=>{
    errorEl.style.display="none"
},3000)
  }else{

  }
})
searchInput.addEventListener('keydown',(e)=>{
    if(e.key==="Enter"){
  if(searchInput.value.trim()===""){
  errorEl.style.display="block";
  setTimeout(()=>{
    errorEl.style.display="none"
},3000)
  }else{

  }
}
})



  




