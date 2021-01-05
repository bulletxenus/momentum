const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

async function getWeather() {  
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=373aae762ebfd8781c9ab60057420861&units=metric`;
        const res = await fetch(url);
        const data = await res.json(); 

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind speed: ${data.wind.speed} m/sec`;
    } catch(e) {
        city.textContent = "incorrect city";
        temperature.textContent = 'n/a';
        weatherDescription.textContent = '-';
        wind.textContent = 'no data';
        humidity.textContent = '-'
        console.dir(localStorage);
    }
    setTimeout(getWeather, 100000);
    
}

function getCity(){
    if (!(localStorage.getItem("city") || localStorage.getItem("city") == "incorrect city")){
        city.textContent = 'Enter City';
    } else {
        city.textContent = localStorage.getItem("city");
        
        getWeather();
    } 
}

  function setCity(e) {

    if(e.type === 'click'){
        city.innerText = '';
    }
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) { 
            if(city.textContent === '' || !(city.textContent).match(/[a-zа-я]/)){
            //if(localStorage.getItem('city')){
                city.innerText =localStorage.getItem('city');
           // } else {
                city.innerText = "[Enter City]";
          //  }
        } else {
            localStorage.setItem('city', e.target.innerText);
            getWeather(); 
        }
        if(city.textContent === ''){
            city.innerText = "[Enter city]";
        } else {
            localStorage.setItem('city', e.target.innerText);
        }
              city.blur();
      }
    } else if(e.type === 'blur') {
        if(city.textContent === '' || !(city.textContent).match(/[a-zа-я]/)){
            if(localStorage.getItem('city')){
                city.innerText =localStorage.getItem('city');
            } else {
                city.innerText = "[Enter City]";
            }
        } else {
            city.innerText = localStorage.getItem('city');
        }
    }
  }



document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('click', setCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

  getCity()
  getWeather()