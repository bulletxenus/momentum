"use strict";

var apiURL = "https://icanhazdadjoke.com/";
var figcaption = document.querySelector('.figcaption');
var quoteButtonElem = document.getElementById(".btn");
var blockquote = document.querySelector('.blockquotes');
var img = document.querySelector(".quoteImg");
var loadingScreen = document.getElementById("und");
document.addEventListener("readystatechange", function (event) {
  if (quote.readyState === "complete") {
    var _quote = document.querySelector(".quote");

    console.dir(_quote);
    setTimeout(function () {
      loadingScreen.style.opacity = 0;
      _quote.style.opacity = 1;
    }, 1000);
  }
});
/*
  working functions
*/

var data = null;
var xhr = new XMLHttpRequest(); //xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
    var obj = JSON.parse(this.responseText);
    console.log(obj);
    blockquote.innerText = obj[0]["quote"];
    figcaption.innerText = obj[0]["character"];
    img.src = obj[0]["image"];
  }
});
xhr.open("GET", "https://thesimpsonsquoteapi.glitch.me/quotes");
/* xhr.setRequestHeader("x-rapidapi-host", "quotes21.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "27ab3e4205msh15ea6234c216d6ep1d4036jsnc80a6f0b49be");
 */

xhr.send(data);