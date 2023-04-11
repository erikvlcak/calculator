'use strict';

let input = document.querySelector('.display .input');
let result = document.querySelector('.display .result');
let buttons = document.querySelector('.buttons');
let num1 = [];
let num2 = [];
let operator;

buttons.addEventListener('mousedown', (e) => {

    e.target.style.boxShadow = '0px 0px';
})

buttons.addEventListener('mouseup', (e) => {



    if (e.target.className != 'buttons') {
        num1 = e.target.textContent;
        e.target.style.boxShadow = '3px 3px';
        input.textContent = num1;
    }
    console.log(e.target)
})
