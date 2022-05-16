window.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
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
=======
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
>>>>>>> da9a20ae6b1e2e2e76e60a86fa3a83dcf07e67db
});