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
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { // ширина хранится в виде строки. переделываем в число.
        offset = 0;
    } else {
        offset += +width.slice(0, width.length - 2);
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
        offset = +width.slice(0, width.length -2) * (slides.length - 1);
    } else {
        offset -= +width.slice(0, width.length - 2); // вычитаем ширину слайда
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