"use strict";

var loadingScreen = document.getElementById("loadingScreen");
document.addEventListener("readystatechange", function (event) {
  if (document.readyState === "complete") {
    loadingScreen.classList.add("transparent");
    setTimeout(function () {
      loadingScreen.remove();
    }, 1000);
  }
});