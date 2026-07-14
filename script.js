//API configuration
const BASE_URL='https://api.openweathermap.org/data/2.5'
 console.log("WeatherSphere Loaded Successfully")
 //DOM references
  const searchInput=document.getElementById("input-text")
  const searchBtn=document.getElementById("searchBtn")
  const locateBtn=document.getElementById("locationBtn")
  const recentList=document.getElementById("recent-list")
  const cityEl=document.getElementById("city")
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
  const loadingEl=document.querySelector(".loading")
  const celsiusBtn=document.getElementById("celsius")
  const fahrenBtn=document.getElementById("fera")
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
     let response=await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`)
     console.log(response.ok)
     if(!response.ok){
      throw  new err
     }
     let data= await response.json()
      await console.log(data)
      displayWeather(data)
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
 function displayWeather(data){
    cityEl.textContent=data.name  
    countryName=data.sys.country 
    const regionNames=new Intl.DisplayNames(['en'],{type:'region'}) 
    const completeCountryName=regionNames.of(countryName)
    countryEl.textContent=completeCountryName
 }




  




