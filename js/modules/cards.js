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