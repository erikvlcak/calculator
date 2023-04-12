'use strict';

let input = document.querySelector('.display .input');
let result = document.querySelector('.display .result');
let buttons = document.querySelector('.buttons');
let num1 = [];
let num2 = [];
let res = [];
let operator = '';

buttons.addEventListener('mousedown', (e) => {
    e.target.style.boxShadow = '0px 0px';
})

buttons.addEventListener('mouseup', (e) => {

    if (e.target.className != 'buttons') {
        e.target.style.boxShadow = '3px 3px';
    }

    if ((e.target.classList.contains('number'))) {
        if (operator != '') {
            num2.push(e.target.textContent);
            input.textContent = `${num1.join('')} ${operator} ${num2.join('')}`;
        } else {
            num1.push(e.target.textContent);
            result.textContent = `${num1.join('')} ${operator} ${num2.join('')}`;
        }
    }

    if ((e.target.classList.contains('operator')) && (num1.length != 0) && (operator == '')) {
        operator = e.target.textContent;
        input.textContent = `${num1.join('')} ${operator}`
    }

    if ((e.target.classList.contains('=') && (num2.length != 0))) {
        result.textContent = evaluate(num1, num2, operator);
        res.push(result.textContent);
        input.textContent = `${num1.join('')} ${operator} ${num2.join('')} =`;
    }

    if ((e.target.classList.contains('operator')) && (num2.length != 0) && (!(e.target.classList.contains('=')))) {
        result.textContent = evaluate(num1, num2, operator);
        operator = e.target.textContent;
        num1.length = 0;
        num2.length = 0;
        num1.push(result.textContent);
        input.textContent = `${result.textContent} ${operator}`;
    }

    console.log(`num1 je: ${num1}`);
    console.log(`operator je: ${operator}`);
    console.log(`num2 je: ${num2}`);

    if (e.target.classList.contains('C')) {
        num1.length = 0;
        num2.length = 0;
        res.length = 0;
        operator = '';
        input.textContent = '';
        result.textContent = 0;
    }
})




function evaluate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return +num1.join('') + +num2.join('');
        case '-':
            return +num1.join('') - +num2.join('');
        case 'x':
            return +num1.join('') * +num2.join('');
        case '÷':
            if (num1 == 0 || num2 == 0) {
                return `very funny`
            } else return +num1.join('') / +num2.join('');
    }
}