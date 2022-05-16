/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc () {    
    // ----------------------------- Калькулятор веса -------------------------------------------
    let result = document.querySelector('.calculating__result span');
    let sex = 'female', 
    height, weight, age, 
    ratio = '1.375';

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        sex = localStorage.getItem('ratio');
    } else {
        sex = '1.375';
        localStorage.setItem('ratio', '1.375');
    }

    // проверяем локальное хранилище на предмет сохранённой ранее инфы
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') == localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "-----";        
            // console.log('чего-то не хватает');
            // console.log(sex, height, weight, age, ratio); 
            return; // досрочный выход из функции
        }
        if (sex == "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1* height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(parentSelector, activeClass) { 
        const elements = document.querySelectorAll(parentSelector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }    
                elements.forEach(element => {
                    element.classList.remove(activeClass);
                });
        
                e.target.classList.add(activeClass);
        
                calcTotal();
            });
        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getConstitutionInfo(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g) ) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }
    getConstitutionInfo('#height');
    getConstitutionInfo('#weight');
    getConstitutionInfo('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

// ----------------------------СОЗДАНИЕ КАРТОЧЕК "НАШЕ МЕНЮ НА ДЕНЬ"---------------------------------------
function cards() {
    // С использованием коструктора классов, для получения данных по карточкам с сервера и отрисовки их на странице
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

    // функция для получения данных для генерации карточек
    const getResource = async (url) => { // async означает, что внутри функции будет асинхронный код
        const res = await fetch(url);
        if (!res.ok) { // этот иф отлавливает ошибки статуса по HTTP (т.к. сам фетч не считает их за ошибки)
            throw new Error(`Не могу принести ${url}, статус: ${res.status}`);
        }
        return await res.json(); // ждём трансформации ответа в объект и возвращаем
    };
    
    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, alt, title, descr, price}) => { // перебираем объект, деструктурируем по отдельным частям
            new MenuItem(img, alt, title, descr, price, '.menu .container').createMenuItem(); // конструктор классов создаёт новую карточку
        });
    });

    // // Второй вариант создания карточек, попроще, без конструктора классов, если надо создать карточки однократно
    // getResource('http://localhost:3000/menu')
    // .then(data => createCard(data));
    // function createCard(data) {
    //     data.forEach(({img, alt, title, descr, price}) => {
    //         let element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //         <img src="${img}" alt="${alt}">
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //         <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> руб/день</div>
    //         </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

        // Это просто набор данных для карточек для тестирования, здесь в коде нигде не используется
    // оставлено на всякий случай
    // new MenuItem(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     "10",
    //     ".menu .container"
    // ).createMenuItem();
    // new MenuItem(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     "20",
    //     ".menu .container"
    // ).createMenuItem();
    // new MenuItem(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню “Постное”',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
    //     "15",
    //     ".menu .container"
    // ).createMenuItem();

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((module) => {

function form () {
    // ----------------------------Отправка формы на сервер ---------------------------------------
    // сбросить кэш на винде: shift+f5

    const forms = document.querySelectorAll('form'); // Берём все формы
    const message = { // Создаём объект-хранилище текстов сообщений
        loading: "Загрузка",
        success: "Спасибо! Мы с вами свяжемся ",
        failure: "Произошла ошибка"
    };
    forms.forEach(item => { // навешиваем на каждую форму функцию bindPostData
        bindPostData(item);
    });

    // функция с настройками, асинхронное ожидание
    const postData = async (url, data) => { // async означает, что внутри функции будет асинхронный код
        const res = await fetch(url, { // await говорит, что мы сначала ждём выполнения фетча, потом присваиваем значение переменной
            method: "POST", // это стандартный объект с настройками для фетча
            headers: {'Content-type': 'application/json'},
            body: data
        });
        return await res.json(); // ждём трансформации ответа в джсон и возвращаем
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => { // Добавляем на форму обработчик событий (событие - отправка формы)
            e.preventDefault(); // Предотвращаем стандартное действие формы
            const formData = new FormData(form); // Собираем данные из формы в один объект для последующей отправки объекта в запросе;
            
            //берём formData, превращ. в массив массивов, кот. превращ. в объект, кот. превращ. в джсон.
            const json = JSON.stringify( Object.fromEntries(formData.entries()) );

            // альтернативный вариант преобразования в объект (объект ли? я уже запутался)
            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // });

            postData('http://localhost:3000/requests', json ) // вызов функции с настройками, указание ей юрл и тела
            .then(data => {
                console.log(data); // выводим в консоль ответ на запрос
                showThanksModal(message.success);
                form.reset(); // после успешной отправки форма сбрасывается 
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });
        });    
    }

    // Ниже в закомментированном виде просто для информации приведено тоже самое, но в варианте, реализованном через XMLHTTPRequest и для данных
    // которые приходят в json-формате. Если нужны данные в виде объекта, то см. комментарии по замене строк, комменты
    // начинаются с "ДЛЯ ОБЪЕКТА:"
    // const forms = document.querySelectorAll('form'); // Берём все формы
    // const message = { // Создаём объект-хранилище текстов сообщений
    //     loading: "Загрузка",
    //     success: "Спасибо! Мы с вами свяжемся ",
    //     failure: "Произошла ошибка"
    // };
    // forms.forEach(item => { // навешиваем на каждую форму функцию PostData
    //     PostData(item);
    // });
    // function PostData(form) {
    //     form.addEventListener('submit', (e) => { // Добавляем на форму обработчик событий (событие - отправка формы)
    //         e.preventDefault(); // Предотвращаем стандартное действие формы
    //         // 1. Сам запрос
    //         const request = new XMLHttpRequest(); // Записываем запрос в переменную\константу
    //         request.open('POST', 'server.php'); // Указываем параметры запроса
    //         request.setRequestHeader('Content-type', 'application/json'); // Заголовок запроса для JSON        
    //         // ДЛЯ ОБЪЕКТА: заголовок, если у нас объект, указывать не нужно, а то работать не будет!
    //         // request.setRequestHeader('Content-type', 'multipart/form-data'); - пусть будет тут на всякий случай;
    //         const formData = new FormData(form); //Собираем данные из формы в один объект для последующей отправки объекта в запросе:
    //         // Ниже блок кода с допнастройкой для отправки данных в виде JSON; Если не нужен - удалить!
    //         // php по умолчанию не работает с JSON, нужно их декодировать на сервере (смотри server.php)
    //         const object = {};
    //         formData.forEach(function(value, key) {
    //             object[key] = value;
    //         });
    //         const json = JSON.stringify(object);
    //         request.send(json);
    //         // ДЛЯ ОБЪЕКТА: request.send(formData);

    //         // сам запрос
    //         request.addEventListener('load', () => { //Отслеживаем статус запроса
    //             if (request.status === 200) { // если приходит успешный статус 200, рапортуем об успехе
    //                 console.log(request.response); // выводим в консоль ответ на запрос
    //                 showThanksModal(message.success);
    //                 form.reset(); // после успешной отправки форма сбрасывается                
    //                 // statusMessage.remove();                - можно удалить, не используется 
    //             } else { // если другой статус, кроме 200, рапортуем об ошибке
    //                 showThanksModal(message.failure);
    //             }
    //         });
    //     });    
    // }

    // После отправки разговариваем с пользователем - показываем модальное окно
    function showThanksModal (message) {
        let defaultModalDialog = document.querySelector('.modal__dialog');
        defaultModalDialog.hidden = true;
        openCallbackScreen();

        let thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        // функция закрытия окна с отчётом об отправке
        function closeThanksModal() {
            thanksModal.remove(); //удаляем окно
            defaultModalDialog.hidden = false; //восстанавливаем видимость
            closeCallbackScreen(); // закрываем окно "перезвонить нам"
        }

        // по нажатию на крестик вызываем функцию и удаляем окно
        thanksModal.onclick = function() { 
            closeThanksModal();
        };

        // окно также самоликвидируется через 4 секунды
        setTimeout( () => {
            closeThanksModal();
        }, 4000);
    }
}

module.exports = form;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal () {
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
            closeCallbackScreen(); // закрываем по нажатию на пустое место за пределами окна
        }
        else if (event.target === callbackWindowX) { // закрываем по нажатию на крестик
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
    let callbackTimerID = setTimeout(openCallbackScreen, 50000);

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
}
module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider () {
    // ----------------------------- Слайдер -------------------------------------------
    // Вариант слайдера №2, посложнее
    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width; // получает ширину из вычисленных цсс-стилей

    let slideIndex = 1;
    let offset = 0; // Счётчик отступа влево или вправо

    // // проверка на количество слайдов, надо ли добавлять нолик для отображения перед номером слайда
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    // ширина карусели должна быть в процентах и равна кол-ву слайдов умнож. на 100%
    slidesField.style.width = slides.length * 100 + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow ='hidden';

    // устанавливаем ширину для каждого слайда = вычисленной ширине из цсс-стилей
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        // width.slice(0, width.length -2) означает что мы вырезаем из строки только число, а "px" в конце отбрасываем
        if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) { // ширина хранится в виде строки. переделываем в число.
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity ='0.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        // width.slice(0, width.length -2) означает что мы вырезаем из строки только число, а "px" в конце отбрасываем
        if (offset == 0) { // ширина хранится в виде строки. переделываем в число.
            offset = +width.replace(/\D/g, '') * (slides.length - 1);
        } else {
            offset -= +width.replace(/\D/g, ''); // вычитаем ширину слайда
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => dot.style.opacity ='0.5'); 
        dots[slideIndex - 1].style.opacity = 1; // устанавливаем яркость для активной точки
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = +width.slice(0, width.length -2) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
            dots.forEach(dot => dot.style.opacity ='0.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });

    // Вариант слайдера №1, самый простой
    // используется такой хтмл:
    // <div class="offer__slider-wrapper">
    //     <div class="offer__slide">
    //         <img src="img/slider/pepper.jpg" alt="pepper">
    //     </div>
    //     <div class="offer__slide">
    //         <img src="img/slider/food-12.jpg" alt="food">
    //     </div>
    //     <div class="offer__slide">
    //         <img src="img/slider/olive-oil.jpg" alt="oil">
    //     </div>
    //     <div class="offer__slide">
    //         <img src="img/slider/paprika.jpg" alt="paprika">
    //     </div>
    // </div>

    // const slides = document.querySelectorAll('.offer__slide');
    // const prev = document.querySelector('.offer__slider-prev');
    // const next = document.querySelector('.offer__slider-next');
    // const total = document.querySelector('#total');
    // const current = document.querySelector('#current');
    // let slideIndex = 1;

    // showSlides(1); // первичный запуск функции для установки первого слайда

    // // проверка на количество слайдов, надо ли добавлять нолик для отображения перед номером слайда
    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }


    // function showSlides(n) {
    //     // установка индекса слайдов при выходе за допустимые границы
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }
    //     // отображение слайдов. сначала все скрываем, затем показываем нужный.
    //     slides.forEach(slide => slide.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';
    //     // показывает номер текущего слайда
    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += 1);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });
    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });
}

module.exports = slider;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

// ----------------------------ТАБЫ СО СТИЛЯМИ ПИТАНИЯ ---------------------------------------
function tabs () {
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
}
module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer () {
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
}
module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
    const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          form = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js"),
          tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
    cards();
    calc();
    form();
    tabs();
    timer();
    slider();
    modal();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map