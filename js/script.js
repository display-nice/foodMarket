const callbackButtons = document.querySelectorAll('[data-modal]');
const callbackWindowX = document.querySelector('.modal__close');
const callbackScreen = document.querySelector('.modal');

// функция открытия окна
const openCallbackScreen = function () {
    callbackScreen.style.cssText = "display: block";
    // останавливаем прокрутку страницы при показе окна
    document.body.style.overflow = "hidden"; 
    // если пользак открыл окно сам, то останавливаем таймер, чтобы онко ему больше не показывалось
    clearInterval(callbackTimerID); 
};

// функция закрытия окна
const closeCallbackScreen = function () {
    callbackScreen.style.cssText = "display: none";
    document.body.style.overflow = ""; // возвращаем прокрутку страницы при скрытии окна
};

// навешиваем открытие окна "перезвоните мне" на каждую соответствующую кнопку
callbackButtons.forEach( button => {
    button.addEventListener('click', openCallbackScreen);
});

// при клике закрываем окно
callbackScreen.addEventListener('click', (event) => {    
    if (event.target === callbackScreen) {
        closeCallbackScreen();
    }
    else if (event.target === callbackWindowX) {
        closeCallbackScreen();
    }
});

// при нажатии эскейп закрываем окно
document.addEventListener('keydown', (event) => {
    if (event.code === "Escape" && callbackScreen.style.cssText == "display: block;") {
        closeCallbackScreen();
    }
});

// модальное окно откроется через секунд после открытия страницы
let callbackTimerID = setTimeout(openCallbackScreen, 30000);

// открываем окно при прокрутке до конца страницы
const openCallbackScreenByScroll = function () {
    //Если прокрученная часть (window.pageYOffset) + видимая часть >= всей высоте сайта, значит пользак долистал до конца страницы;
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openCallbackScreen();
        // делаем открытие окна однократным;
        window.removeEventListener('scroll', openCallbackScreenByScroll);
    }
};
window.addEventListener('scroll', openCallbackScreenByScroll);



// -----------------ТАЙМЕР ОБРАТНОГО ОТСЧЁТА ВРЕМЕНИ АКЦИИ-------------------

let daysLeft = document.querySelector('#days'),
    hoursLeft = document.querySelector('#hours'),
    minutesLeft = document.querySelector('#minutes'),
    secondsLeft = document.querySelector('#seconds');
const endTime = '2022-06-27';

function calculateTime(endTime) {
    let x = Date.parse(endTime) - new Date();
    // когда временные штампы сравняются, то таймер отключится
    if (x == 0) {
        clearInterval(promoCountdown);
    }
    daysLeft.textContent = Math.floor( x / 86400000 );
    hoursLeft.textContent = Math.floor( (x / 3600000 ) % 24);
    minutesLeft.textContent = Math.floor( (x / 60000 ) % 60 );    
    secondsLeft.textContent = Math.floor( (x / 1000 ) % 60 );
    
}
// запуск функции расчёта каждую секунду
const promoCountdown = setInterval(calculateTime, 1000, endTime);