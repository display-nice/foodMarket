function forms () {
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

            // альтернативный вариант преобразования в объект
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

module.exports = forms;