require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import {opening} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
   
    const setModalInterval = setTimeout(() => opening('.modal', setModalInterval), 5000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2021-05-20');
    modal('[data-modal]', '.modal', setModalInterval);
    cards();
    forms('form', setModalInterval);
    slider({
        wrapperSlider: '.offer__slider-wrapper',
        containerInner: '.offer__slider-inner',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        next: '.offer__slider-next',
        prev: '.offer__slider-prev',
        autoplay: false,
        duration: 2000
    });
    calc();

});