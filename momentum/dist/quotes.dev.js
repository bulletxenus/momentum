"use strict";

// если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
// скопируйте код себе и запустите со своего компьютера
var blockquote = document.querySelector('blockquote');
var figcaption = document.querySelector('figcaption');
var btn = document.querySelector('.btn');
getqoute(); // если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 

function getqoute() {
  btn.disabled = true;
  setTimeout(function () {
    btn.disabled = false;
  }, 500);
  var request2 = new XMLHttpRequest();
  request2.open('GET', "https://thesimpsonsquoteapi.glitch.me/quotes");

  request2.onload = function () {
    x = JSON.parse(request2.response);
    console.log(x);
    blockquote.textContent = "\xAB".concat(x[0]["quote"], "\xBB");
    figcaption.textContent = x[0]["character"];
  };

  request2.send();
}

btn.addEventListener('click', getqoute);