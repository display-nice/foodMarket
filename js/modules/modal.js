// функция открытия окна
const openCallbackScreen = function (modalSelector, modalTimerID) {
    const callbackScreen = document.querySelector(modalSelector);
    callbackScreen.style.cssText = "display: block";
    // останавливаем прокрутку страницы при показе окна
    document.body.style.overflow = "hidden"; 
    // если пользак открыл окно сам, то останавливаем таймер, чтобы онко ему больше не показывалось
    if (modalTimerID) {
        clearInterval(modalTimerID);
    }
};

// функция закрытия окна
const closeCallbackScreen = function (modalSelector) {
    const callbackScreen = document.querySelector(modalSelector);
    callbackScreen.style.cssText = "display: none";
    document.body.style.overflow = ""; // возвращаем прокрутку страницы при скрытии окна
};

function modal (triggerSelector, modalSelector, modalTimerID) {
    // ----------------------------ОТКРЫТИЕ И ЗАКРЫТИЕ ОКНА "ПЕРЕЗВОНИТЕ МНЕ"--------------------------------
    const callbackButtons = document.querySelectorAll(triggerSelector);
    const callbackWindowX = document.querySelector('.modal__close');
    const callbackScreen = document.querySelector(modalSelector);

    // навешиваем открытие окна "перезвоните мне" на каждую соответствующую кнопку
    callbackButtons.forEach( button => {
        button.addEventListener('click', () => openCallbackScreen(modalSelector, modalTimerID));
    });

    // при клике закрываем окно
    callbackScreen.addEventListener('click', (event) => {    
        if (event.target === callbackScreen) {
            closeCallbackScreen(modalSelector); // закрываем по нажатию на пустое место за пределами окна
        }
        else if (event.target === callbackWindowX) { // закрываем по нажатию на крестик
            closeCallbackScreen(modalSelector);
        }
    });

    // при нажатии эскейп закрываем окно
    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && callbackScreen.style.cssText == "display: block;") {
            closeCallbackScreen(modalSelector);
        }
    });

    // модальное окно откроется через 50 секунд после открытия страницы
    // let callbackTimerID = setTimeout(openCallbackScreen, 50000);

    // открываем окно при прокрутке до конца страницы
    const openCallbackScreenByScroll = function () {
        //Если прокрученная часть (window.pageYOffset) + видимая часть >= всей высоте сайта, значит пользак долистал до конца страницы;
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openCallbackScreen(modalSelector, modalTimerID);
            // делаем открытие окна однократным;
            window.removeEventListener('scroll', openCallbackScreenByScroll);
        }
    };
    window.addEventListener('scroll', openCallbackScreenByScroll);
}
export default modal;
export {openCallbackScreen, closeCallbackScreen};