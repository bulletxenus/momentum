"use strict";

var weatherIcon = document.querySelector('.weather-icon');
var temperature = document.querySelector('.temperature');
var weatherDescription = document.querySelector('.weather-description');
var city = document.querySelector('.city');

function getWeather() {
  var url, res, data;
  return regeneratorRuntime.async(function getWeather$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city.textContent, "&lang=en&appid=373aae762ebfd8781c9ab60057420861&units=metric");
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(url));

        case 4:
          res = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(res.json());

        case 7:
          data = _context.sent;
          weatherIcon.className = 'weather-icon owf';
          weatherIcon.classList.add("owf-".concat(data.weather[0].id));
          temperature.textContent = "".concat(data.main.temp, "\xB0C");
          weatherDescription.textContent = data.weather[0].description;
          humidity.textContent = "Humidity: ".concat(data.main.humidity, "%");
          wind.textContent = "Wind speed: ".concat(data.wind.speed, " m/sec");
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          document.querySelector('.error-city').style.display = "inline-block";

        case 19:
          setTimeout(getWeather, 100000);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

function getCity() {
  if (!localStorage.getItem("city")) {
    city.textContent = 'Enter City';
  } else {
    city.textContent = localStorage.getItem("city");
    document.querySelector('.error-city').style.display = "none";
    getWeather();
  }
}

function setCity(event) {
  document.querySelector('.error-city').style.display = "none";

  if (e.type === 'click') {
    city.innerText = '';
  }

  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (city.textContent === '' || !city.textContent.match(/[a-zа-я]/)) {
        if (localStorage.getItem('city')) {
          city.innerText = localStorage.getItem('city');
        } else {
          city.innerText = "[Enter City]";
        }
      } else {
        localStorage.setItem('city', e.target.innerText);
        getWeather();
      }

      if (city.textContent === '') {
        city.innerText = "[Enter city]";
      } else {
        localStorage.setItem('city', e.target.innerText);
      }

      city.blur();
    }
  } else if (e.type === 'blur') {
    if (city.textContent === '' || !city.textContent.match(/[a-zа-я]/)) {
      if (localStorage.getItem('city')) {
        city.innerText = localStorage.getItem('city');
      } else {
        city.innerText = "[Enter City]";
      }
    } else {
      city.innerText = localStorage.getItem('city');
    }
  }
}

var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('click', setCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
getWeather();