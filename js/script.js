window.addEventListener('DOMContentLoaded', () => {
    const cards = require('./modules/cards'),
          calc = require('./modules/calc'),
          form = require('./modules/form'),
          tabs = require('./modules/tabs'),
          timer = require('./modules/timer'),
          slider = require('./modules/slider'),
          modal = require('./modules/modal');
    cards();
    calc();
    form();
    tabs();
    timer();
    slider();
    modal();
});