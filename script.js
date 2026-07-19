
//API configuration
const BASE_URL='https://api.openweathermap.org/data/2.5'
 console.log("WeatherSphere Loaded Successfully")
 let recentCities=JSON.parse(localStorage.getItem("recentSearches")) || []

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
  const forecastCards=document.querySelector(".forecast-cards")
  const aiEl=document.getElementById("advice")
  const updated=document.getElementById("update")
  const errorEl=document.querySelector(".error")
  const loadingEl=document.querySelector(".loading")
  const celsiusBtn=document.getElementById("celsius")
  const fahrenBtn=document.getElementById("fera")
 const locationIcon= document.querySelector(".fa-solid fa-location-dot")
 //global variables
 let currentUnit="°C"
 let currentTemp=0;
 let weatherData="null"
 let forecastToggleData="null"
 //Default-city on page load
 window.addEventListener("DOMContentLoaded",()=>{
    fetchWeather("Mumbai")
     fetchForecast("Mumbai")
    displayRecentSearches()
 })
 //toggleButton
function toggleButton(){
        fahrenBtn.addEventListener('click',()=>{
            celsiusBtn.classList.remove('active')
            fahrenBtn.classList.add('active')
           console.log(currentTemp)
           currentUnit="°F"
           displayWeather( weatherData)
           displayForecast(forecastToggleData)
        })
        celsiusBtn.addEventListener('click',()=>{
             fahrenBtn.classList.remove('active')
            celsiusBtn.classList.add('active')
            currentUnit="°C"
             displayWeather( weatherData)
             displayForecast(forecastToggleData)
        }) 
    }
    toggleButton()
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
  console.log("calling fetchForecast")
  fetchForecast(city)
  saveRecentSearches(city)
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
  fetchForecast(city)
  saveRecentSearches(city)
  searchInput.value=""
}
})
//location Button
locateBtn.addEventListener('click',()=>{
     const success=(position)=>{
    const lat=position.coords.latitude
    const lon=position.coords.longitude
    
    fetchWeather(null,lat,lon)
     fetchForecast(null,lat,lon)
 }
 const error=(err)=>{
    showError("Location access denied")
 }
   if(navigator.geolocation){
   navigator.geolocation.getCurrentPosition(success,error)
 }else{
    alert("Geolocation not supported")
 }

})
//weather API call using async and await
async function fetchWeather(city=null,lat=null,lon=null){
    loadingEl.style.display="block"
    errorEl.style.display="none"
    let url
    try{ 
        if(city){
           url= ` ${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`      
    }else{
        url=` ${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`    
    } 
     let response=await fetch(url) 
     console.log(response.ok)
     if(!response.ok){
      throw  new err
     }
     let data= await response.json()
      await console.log(data)
      localStorage.setItem("lastWeather",JSON.stringify(data))
      console.log(JSON.parse(localStorage.getItem("lastWeather")))
    //   fetchAIAdvice()
       weatherData=data
      displayWeather( weatherData)
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
     if(currentUnit==="°C"){
     currentTemp=data.main.temp 
     info=Math.round(data.main.feels_like)

     }else{
        currentTemp=data.main.temp *(9/5)+32
        info=Math.round((data.main.feels_like)*(9/5)+32)
     }
     console.log(currentTemp)
     let tempInfo =Math.round(currentTemp)
    tempEl.textContent=`${tempInfo}${currentUnit}`
    console.log(tempInfo)
     
    feelsLikeEl.textContent=`Feels like ${info}${currentUnit} `
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
     //last updated
      const now= new Date()
    updated.textContent=now.toLocaleTimeString('en-US',{
        hour:"2-digit",
        minute:'2-digit'
    })
    
}
// 5 Day forecast 
async function fetchForecast(city=null,lat=null,lon=null){
    console.log('entered fetchForecast')
    try{
        let url
          if(city){
           url= ` ${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`      
    }else{
        url=` ${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`    
    } 
   let response= await fetch(url)
   console.log(response.status)
   let forecast= await response.json()
    let forecastData=forecast.list.filter(item=>item.dt_txt.includes("12:00:00"))
    console.log(forecastData)
     console.log(forecastData.map(item=>item))
     forecastToggleData=forecastData
     displayForecast(forecastToggleData)
    }
    catch(err){
         console.log(err)
    }
}
function displayForecast(forecastToggleData){
    console.log(forecastToggleData.length)
      forecastCards.innerHTML=""
    forecastToggleData.forEach(entry => {
        if(currentUnit==="°C"){
     forecastTemp=Math.round(entry.main.temp) 
     }else{
        forecastTemp=Math.round(entry.main.temp *(9/5)+32)
     }
        let forecastDay=new Date(entry.dt*1000).toLocaleDateString('en',{
            weekday:'short'
        })
        console.log(forecastDay)
        const forecastIconCode=entry.weather[0].icon
        const forecastIconName=iconMap[forecastIconCode]
        const forecastIconUrl=`https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${forecastIconName}.svg`
        const forecastDescription=entry.weather[0].description
       let newDiv= document.createElement('div')
       newDiv.classList.add('forecast-card')   
       newDiv.innerHTML=`
       <div id="forecast-day">${forecastDay}</div>
       <img id= forecast-icon src="${forecastIconUrl}">
       <div id="forecast-temp">${forecastTemp}${currentUnit}</div>
       <div id="forecast-detail">${forecastDescription}</div>
       `
    forecastCards.appendChild(newDiv)
    });
}
//AI advice
async function fetchAIAdvice(){
    try{
        console.log("AI function called")
         let lastWeather=JSON.parse(localStorage.getItem("lastWeather"))
         console.log(lastWeather)
    console.log("Gemini API called")
    const prompt=`You are a smart weather assistant.
     Based on current weather in ${lastWeather.name}:
     🌡️ Temperature: Math.round(${lastWeather.main.temp})°C
     🌤️ Condition: ${lastWeather.weather [0].description}
     💧Humidity: ${lastWeather.main.humidity}%
     💨 Wind : ${lastWeather.wind.speed *3.6}Km/h 
     🌡️ Feels like:Math.round(${lastWeather.main.feels_like})
     Give practical advice in this exact format:
     👔 **What to Wear**(1 line)
     🏃**Activities:**(1 line-what to do/avoid)
     💓**Health Tip:**(1 line)
     ☂️**Carry:**(1 line - umbrella/sunscreen etc)
     ⚠️**Warning:**(1 line - any weather alert)

     Keep each point concise.Use modern and innovative emojis created by you own.Don't use bracket notation like [emoji].Can you makes changes in my emoji to make it modern.Be specific to weather conditions.
     `
    const response= await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                contents:[{parts:[{text:prompt}]}]
            })
        }
    )
    console.log(response.status)
    const dataAI =await response.json()
    console.log(dataAI)
    console.log(dataAI.candidates[0].content.parts[0].text)
     const aiText=dataAI.candidates[0].content.parts[0].text
    const lines=aiText.split("\n").filter(line=>line.trim())
    const formatted=lines.map(line=>
        `<p>${line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`
    ).join("")
    aiEl.innerHTML=formatted
    console.log(aiEl)
    console.log("formatted:",formatted)
}catch(err){
    console.log(err)
}
}
// Recent Searches
function saveRecentSearches(city){
     recentCities= recentCities.filter(recentSearch=>
     recentSearch !==city)
     recentCities.unshift(city)
     recentCities=recentCities.slice(0,5)
    localStorage.setItem("recentSearches",JSON.stringify(recentCities))
    displayRecentSearches(recentCities)
}
//dispaly recent Searches
function displayRecentSearches(){  
    if(recentCities.length !==0){  
         recentList.innerHTML="" 
    recentCities.forEach(recentCity=>{
       let button= document.createElement('button')
       button.classList.add('recentCityBtn')
       button.textContent=recentCity
       console.log(button.textContent)
       recentList.appendChild(button)
    })
 }  
}
 recentList.addEventListener('click',(e)=>{
        console.log(e.target.textContent)
        const allBtn=document.querySelectorAll('.recentCityBtn')
        for(let i=0;i<allBtn.length;i++){
            allBtn[i].style.border=""
             allBtn[i].style.color=""
             allBtn[i].style.background=""
              allBtn[i].transform='none'
              allBtn[i].transition='none'
        }
        e.target.style.border='1px solid #419cff'
        e.target.style.background='#4f9cff'
        e.target.style.color='#fff'
        e.target.boxshadow='0 0 18px rgba(79,156,255,0.45)'
        e.target.transition='transform 0.2s ease-in-out'
        e.target.transform='scale(1.05)'
        fetchWeather(e.target.textContent)
        fetchForecast(e.target.textContent)
    })
    




