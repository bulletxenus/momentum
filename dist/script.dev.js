"use strict";

// DOM Elements
var time = document.querySelector('.time'),
    date = document.querySelector('.date'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus'),
    bgSlider = document.querySelector('.collection');
var slideOn = false; //Image arrays

var x = [];
var imageArrays = [];
var request = new XMLHttpRequest();
request.open('GET', "image-arrays.json");

request.onload = function () {
  x = JSON.parse(request.response);
  setBgGreet(x);
};

request.send(); // Options

var showAmPm = true; // Show Time

function showTime() {
  var today = new Date(),
      month = today.getMonth(),
      dayMonth = today.getDate(),
      dayWeek = today.getDay();
  hour = today.getHours(), min = today.getMinutes(), sec = today.getSeconds(); //console.log(dayWeek)

  dayMonthArr = ["Sunday", "Monday", "Tuesday", "Wendsday", "Thirday", "Friday", "Saturday"];
  monthArr = ["January", "Fubruary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // Output Time

  time.innerHTML = "".concat(addZero(hour), "<span>:</span>").concat(addZero(min), "<span>:</span>").concat(addZero(sec));
  date.innerHTML = "".concat(addZero(dayMonthArr[dayWeek]), "<span>, </span> ").concat(addZero(dayMonth), " ").concat(addZero(monthArr[month]));

  if (addZero(sec) == "00" && slideOn === true) {
    slideOn = false;
    bgImg();
    count = hour; //console.log(`count: ${min+1}`);
  }

  setTimeout(showTime, 1000);
} // Add Zeros


function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
} /////////////////////////////////////////////////////////////////////////////////////
// Set Background and Greeting 


var morningImage = [];

function setBgGreet(array) {
  var day = ["morning", "day", "evening", "night"];

  for (var j = 0; j < 4; j++) {
    for (var i = 0; i < 6; i++) {
      var _x = randomInteger(0, 9);

      morningImage.includes(array[j][day[j]][_x]) ? i-- : morningImage.push(array[j][day[j]][_x]); //console.log(morningImage)
    }
  }

  bgImg();
}

function bgImg() {
  var today = new Date(),
      hour = today.getHours(),
      minutes = today.getMinutes();

  if (slideOn == false) {
    var body = document.querySelector('body');
    var img = document.createElement('img');
    img.src = morningImage[hour];

    img.onload = function () {
      document.body.style.backgroundImage = "URL(".concat(morningImage[hour], ")");
    }; //console.log(buttonSlider.disabled)


    setTimeout(bgImg, 1000);
  }
} // Random number


function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var today = new Date();
var min = today.getMinutes();
var count = min;
var buttonSlider = document.querySelector('.button_slider');

function bgSlide() {
  buttonSlider.disabled = true;
  setTimeout(function () {
    return buttonSlider.disabled = false;
  }, 1000);
  slideOn = true;

  if (count >= 23) {
    count = 0;
  }

  var img = document.createElement('img');
  img.src = morningImage[count];

  img.onload = function () {
    document.body.style.backgroundImage = "URL(".concat(morningImage[count], ")");
  }; //console.log(min)
  //console.log(count);


  count++;
} //////////////////////////////////////////////////////////////////////////////////////// 


function change() {
  this.textContent = '';
} //Set + Get name


function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText === "") {
        name.textContent = localStorage.getItem('name');
      } else {
        localStorage.setItem('name', e.target.innerText);
      }

      name.blur();
    }
  } else {
    if (e.target.innerText === "") {
      name.textContent = localStorage.getItem('name');
    } else {
      localStorage.setItem('name', e.target.innerText);
    }
  }
}

function getName() {
  if (localStorage.getItem('name') === "") {
    localStorage.setItem('name', '[Enter your Name]');
  }

  name.textContent = localStorage.getItem('name');
} // Set + Get focus


function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      console.log('Enter');

      if (e.target.innerText === "") {
        focus.textContent = localStorage.getItem('focus');
      } else {
        localStorage.setItem('focus', e.target.innerText);
      }

      focus.blur();
    }
  } else {
    if (e.target.innerText === "") {
      focus.textContent = localStorage.getItem('focus');
    } else {
      localStorage.setItem('focus', e.target.innerText);
    }
  }
}

function getFocus() {
  console.log(localStorage.getItem('focus'));

  if (localStorage.getItem('focus') === null) {
    localStorage.setItem('focus', '[Enter the FOCUS]');
  }

  focus.textContent = localStorage.getItem('focus');
} ///////////////////////////////////////////////////////////////////////

/* window.addEventListener("load", function() {
    const blockquote = document.querySelector('.blockquotes');
    const figcaption = document.querySelector('.figcaption');
    const btn = document.querySelector('.btn');
    getQuote();
    //console.log(document.querySelector("body > div.quotes"));
    btn.addEventListener('click', getQuote); 
})


async function getQuote() {  
  const url = `https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
 */
///////////////////////////////////////////////////////////////////////


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', change);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', change);
buttonSlider.addEventListener('click', bgSlide); ///////////////////////////////////////////////////////////////////////////////
// Run

showTime(); //setBgGreet();

getName();
getFocus();