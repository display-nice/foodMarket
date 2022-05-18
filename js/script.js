import cards from './modules/cards';
import calc from './modules/calc';
import form from './modules/form';
import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import {openCallbackScreen} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    // модальное окно откроется через секунд после открытия страницы
    let modalTimerID = setTimeout(() => openCallbackScreen('.modal', modalTimerID), 50000);
    cards();
    calc();
    form('form', modalTimerID);
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('2022-06-27');
    slider();
    modal('[data-modal]', '.modal', modalTimerID);
});