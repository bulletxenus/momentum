// если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
// скопируйте код себе и запустите со своего компьютера
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');
let button2 = document.querySelector('.button2');
getqoute();
// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
function getqoute() {
    
    btn.disabled = true;
    setTimeout(() => {btn.disabled = false}, 500);
    let request2 = new XMLHttpRequest();
    request2.open('GET', "https://thesimpsonsquoteapi.glitch.me/quotes");

    request2.onload = function() {
        x = JSON.parse(request2.response);  

    blockquote.textContent = `«${x[0]["quote"]}»`;
    figcaption.textContent = x[0]["character"];
    } 
    request2.send();
}
 
btn.addEventListener('click', () => {
    getqoute();
    button2.classList.add('button2rot');
    setTimeout(() => button2.classList.remove('button2rot'), 1000)
    
    
}); 