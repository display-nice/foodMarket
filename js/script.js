window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
          modalCallme = require('./modules/modal-callme'),
          calc = require('./modules/calc'),
          cards = require('./modules/forms'),
          slider = require('./modules/slider'),
          timer = require('./modules/timer'),
          forms = require('./modules/forms');   
    tabs();
    modalCallme();
    calc();
    cards();
    slider();
    timer();
    forms(); 
});