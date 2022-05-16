function timer() {
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