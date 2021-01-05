const loadingScreen = document.getElementById("loadingScreen");

document.addEventListener("readystatechange", (event) => {
  if (document.readyState === "complete") {
    loadingScreen.classList.add("transparent");
    setTimeout(() => {
      loadingScreen.remove();
    }, 1000);
  }
});