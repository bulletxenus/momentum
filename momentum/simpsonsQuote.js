const apiURL = "https://icanhazdadjoke.com/";
const figcaption = document.querySelector('.figcaption');
const quoteButtonElem = document.getElementById(".btn");
const blockquote = document.querySelector('.blockquotes');
const img = document.querySelector(".quoteImg");



const loadingScreen = document.getElementById("und");

document.addEventListener("readystatechange", (event) => {
  if (quote.readyState === "complete") {
      const quote = document.querySelector(".quote");
      console.dir(quote)
    setTimeout(() => {
        
      loadingScreen.style.opacity = 0;
      quote.style.opacity = 1;
    }, 1000);
  }
});

/*
  working functions
*/
var data = null;

var xhr = new XMLHttpRequest();
//xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
        console.log(this.responseText);
        let obj = JSON.parse(this.responseText);
        console.log(obj)
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