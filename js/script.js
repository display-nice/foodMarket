// ----------------------------ТАБЫ СО СТИЛЯМИ ПИТАНИЯ ---------------------------------------
let tabHeaderParent = document.querySelector('.tabheader__items');
let tabs = document.querySelectorAll('.tabheader__item');
let tabsContent = document.querySelectorAll('.tabcontent');

function hideTabContent() {
    tabsContent.forEach(item => {
        item.style.cssText = "display: none";
    });
    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
}

function showTabContent(i = 0) {
    tabsContent[i].style.cssText = "display: block";
    tabs[i].classList.add('tabheader__item_active');
}
hideTabContent();
showTabContent();

tabHeaderParent.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (event.target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});



// ----------------------------СОЗДАНИЕ КАРТОЧЕК "НАШЕ МЕНЮ НА ДЕНЬ"---------------------------------------
class MenuItem {
    // ... classes - это оператор Rest, формирует массив из всех переданных свойств после parentSelector
    constructor (imgSrc, alt, title, descr, price, parentSelector, ...classes) {
        this.imgSrc = imgSrc;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        // здесь мы преобразуем полученную строку в конкретного родителя элемента
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
        this.currencyRate = 100; // кол-во рублей за доллар, подразумевается что цена приходит в долларах
        this.convertToRubles();
    }
    convertToRubles () {
        this.price = this.price*this.currencyRate;
    }
    createMenuItem() {
        let element = document.createElement('div');
        // if отвечает за установку класса по умолчанию, если в оператор Rest (... classes) ничего не пришло
        if (this.classes.length === 0) {
            element.classList.add('menu__item');
        } else {
            // если что-то в ... classes есть, то происходит распаковка массива и преобразование 
            // значений элементов массива в классы
            this.classes.forEach(newClass => element.classList.add(newClass));
        }
        // здесь просто создаётся html-код нового элемента
        element.innerHTML = `
        <img src="${this.imgSrc}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        </div>
        `;
        // вставка нового элемента на страницу
        this.parent.append(element);
    }
}
new MenuItem(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    "10",
    ".menu .container"
).createMenuItem();
new MenuItem(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    "20",
    ".menu .container"
).createMenuItem();
new MenuItem(
    "img/tabs/post.jpg",
    "post",
    'Меню “Постное”',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
    "15",
    ".menu .container"
).createMenuItem();

// let card1 = new MenuItem(
//     "img/tabs/vegy.jpg",
//     "vegy",
//     'Меню "Фитнес"',
//     'Меню "Фитнес" - это новый подход к приготовлению блюд: ',
//     "10",
//     ".menu .container"
// );
// card1.createMenuItem();



// ----------------------------ОТКРЫТИЕ И ЗАКРЫТИЕ ОКНА "ПЕРЕЗВОНИТЕ МНЕ"--------------------------------
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



// -------------------------------ТАЙМЕР ОБРАТНОГО ОТСЧЁТА ВРЕМЕНИ АКЦИИ-----------------------------------
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