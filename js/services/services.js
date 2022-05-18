// функция с настройками, асинхронное ожидание
const postData = async (url, data) => { // async означает, что внутри функции будет асинхронный код
    const res = await fetch(url, { // await говорит, что мы сначала ждём выполнения фетча, потом присваиваем значение переменной
        method: "POST", // это стандартный объект с настройками для фетча
        headers: {'Content-type': 'application/json'},
        body: data
    });
    return await res.json(); // ждём трансформации ответа в джсон и возвращаем
};

// функция для получения данных для генерации карточек
async function getResource (url) { // async означает, что внутри функции будет асинхронный код
    const res = await fetch(url);
    if (!res.ok) { // этот иф отлавливает ошибки статуса по HTTP (т.к. сам фетч не считает их за ошибки)
        throw new Error(`Не могу принести ${url}, статус: ${res.status}`);
    }
    return await res.json(); // ждём трансформации ответа в объект и возвращаем
};
export {postData, getResource};