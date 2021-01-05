// DOM Elements
const time = document.querySelector('.time'),
date = document.querySelector('.date'),
greeting = document.querySelector('.greeting'),
name = document.querySelector('.name'),
focus = document.querySelector('.focus'),
bgSlider = document.querySelector('.collection');

let slideOn = false;

//Image arrays
 let x = [];
let imageArrays = [];
let request = new XMLHttpRequest();
request.open('GET', "image-arrays.json");

request.onload = function() {
    x = JSON.parse(request.response);  
    setBgGreet(x);
} 
request.send(); 



// Options
const showAmPm = true;

// Show Time
function showTime() {
    let today = new Date(),
    month = today.getMonth(),
    dayMonth = today.getDate(),
    dayWeek = today.getDay()
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
//console.log(dayWeek)
    dayMonthArr = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wendsday",
        "Thirday",
        "Friday",
        "Saturday"
    ];

    monthArr = [
        "January", "Fubruary", "March", "April", "May",
        "June", "July", "August", "September", "October",
        "November", "December"
    ]


  // Output Time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  date.innerHTML = `${addZero(dayMonthArr[dayWeek])}<span>, </span> ${addZero(dayMonth)} ${addZero(
    monthArr[month]
  )}`;
  
setTimeout(() => {
    if (addZero(min) == "59" && slideOn === true && addZero(sec) == "59") {
        slideOn = false;
        bgImg();
        count = hour;
    }
    changeGreeting();
    showTime();
  }, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
/////////////////////////////////////////////////////////////////////////////////////
// Set Background and Greeting 

let morningImage = [];
function setBgGreet(array) {


    let day = ["night", "morning", "day", "evening"]

    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 6; i++) {
            let x = randomInteger(0, 9);
            
            morningImage.includes(array[j][day[j]][x]) ? 
            i-- : morningImage.push(array[j][day[j]][x]);       
            //console.log(morningImage)
        }
    }
    bgImg();
}

function bgImg() {
    let today = new Date(),
   
    hour = today.getHours(),
    minutes = today.getMinutes(); 
    if (slideOn == false) {
    const body = document.querySelector('body');
    const img = document.createElement('img')
    img.src = morningImage[hour];
    //img.onload = () => {
        body.style.backgroundImage = `URL(${morningImage[hour]})`;
   // }
    //console.log(buttonSlider.disabled)
   
    
        setTimeout(bgImg, 1000);
    }
    
}


// Random number
function randomInteger(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

let today = new Date();
let min = today.getMinutes();

let count = min;
const buttonSlider = document.querySelector('.button_slider');

let num = today.getHours();
// BG slider
function bgSlide() {
  
  buttonSlider.disabled = true;
  setTimeout(() => {buttonSlider.disabled = false}, 1000)
    slideOn = true;
   // console.log(num)
    if (num >= 23) {
        num = 0
    }
    num++;
   // console.log(morningImage[num])
    
    const img = document.createElement('img');

    
    img.src = morningImage[num];
   // console.log(img.src)
    img.onload = () => {

        document.body.style.backgroundImage = `URL(${morningImage[num]})`;
    }
    //console.log(min)
    //console.log(count);
    
    
}
  
//////////////////////////////////////////////////////////////////////////////////////// 
function change() {
    this.textContent = '';
}

//Set + Get name
function setName(e) {
    if (e.type === 'click') {
        if (e.target.innerText === "") {
            name.textContent = localStorage.getItem('name');
        } else {
            localStorage.setItem('name', e.target.textContent)
        }
    }
  let nameText = e.target.innerText;

    if (e.type === 'keypress') {
      // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (nameText === "") {
                name.textContent = localStorage.getItem('name');              
            } else {
                localStorage.setItem('name', e.target.innerText)
            }        
            name.blur();
        }
    } else {
        if (e.target.innerText === "") {
            name.textContent = localStorage.getItem('name');              
        } else {
            localStorage.setItem('name', e.target.innerText)
        }        
    }      
}
    

function getName() {
    if (localStorage.getItem('name') === "") {
        localStorage.setItem('name', '[Enter your Name]')
    }
    name.textContent = localStorage.getItem('name');
}

// Set + Get focus

function setFocus(e) {
    if (e.type === 'keypress') {
      // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText === "") {
                focus.textContent = localStorage.getItem('focus');              
            } else {
                localStorage.setItem('focus', e.target.innerText)
            }        
            focus.blur();
            
        }
    } else {
        if (e.target.innerText === "") {
            focus.textContent = localStorage.getItem('focus');              
        } else {
            localStorage.setItem('focus', e.target.innerText)
        }        
    }      
}

function getFocus() {
    if (localStorage.getItem('focus') === null) {
        localStorage.setItem('focus', '[Enter the FOCUS]')
    }
    focus.textContent = localStorage.getItem('focus');
}

function changeGreeting() {
   if (addZero(hour) >= "00" && addZero(today.getHours()) < "06") {
           greeting.textContent = "Good night,";
       } else if (addZero(today.getHours()) >= "06" && addZero(today.getHours()) < "12") {
           greeting.textContent = "Good morning,";
       } else if (addZero(today.getHours()) >= "12" && addZero(today.getHours()) < "18") {
           greeting.textContent = "Good day,";
       } else if (addZero(today.getHours()) >= "18" && addZero(today.getHours()) < "24") {
           greeting.textContent = "Good evening,";
       }
}
///////////////////////////////////////////////////////////////////////




name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', change);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', change); 
buttonSlider.addEventListener('click', () => {
    document.querySelector(".collection_img").classList.add('collection2');
    setTimeout(() => document.querySelector(".collection_img").classList.remove('collection2'), 1000)
   
    bgSlide()
})
///////////////////////////////////////////////////////////////////////////////
// Run
showTime();
changeGreeting();
//setBgGreet();
getName();
getFocus();
