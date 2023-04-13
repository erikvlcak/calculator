'use strict';

let input = document.querySelector('.display .input');
let result = document.querySelector('.display .result');
let buttons = document.querySelector('.buttons');
let num1 = [0];
let num2 = [];
let operator = '';

document.addEventListener('DOMContentLoaded', () => {
    result.textContent = num1[0];
})

buttons.addEventListener('mousedown', (e) => {
    //click effect
    e.target.style.boxShadow = '0px 0px';
})

buttons.addEventListener('mouseup', (e) => {

    //click effect
    if (e.target.className != 'buttons') {
        e.target.style.boxShadow = '3px 3px';
    }

    //if operator already selected, add as num2, if not, add as num1
    if ((e.target.classList.contains('number'))) {
        if (operator != '') {
            if ((!(num2[0] == 0)) || ((num2[1] == '.'))) {
                num2.push(e.target.textContent);
                result.textContent = `${num2.join('')}`;
            }
        } else if ((num1[0] == 0) && (!(num1[1] == '.'))) {
            num1.pop();
            num1.push(e.target.textContent);
            result.textContent = `${num1.join('')} ${operator} ${num2.join('')}`;
        } else {
            num1.push(e.target.textContent);
            result.textContent = `${num1.join('')} ${operator} ${num2.join('')}`;
        }
    }

    //select operator only after num1 has been selected
    if ((e.target.classList.contains('operator')) && (num1.length != 0) && (num2.length == 0)) {
        operator = e.target.textContent;
        console.log(operator);
        input.textContent = `${num1.join('')} ${operator}`;
    }

    //display result after pressing = if num2 has benn added, hence all 3 variables are known, display whole equation as input value
    if ((e.target.classList.contains('='))) {
        if (num2.length == 0) {
            num2.push(0);
        } else {
            let evaluateResult = evaluate(num1, num2, operator);
            if (!(Number.isInteger(evaluateResult))) {
                result.textContent = parseFloat(evaluateResult.toFixed(3));
            } else {
                result.textContent = evaluateResult;
            }
            input.textContent = `${num1.join('')} ${operator} ${num2.join('')} =`;
        }
    }

    //display result of equation after a new operator has been selected if all 3 variables are known and = is not the operator
    if ((e.target.classList.contains('operator')) && (num2.length != 0) && (!(e.target.classList.contains('=')))) {
        let evaluateResult = evaluate(num1, num2, operator);
        if (!(Number.isInteger(evaluateResult))) {
            result.textContent = parseFloat(evaluateResult.toFixed(3));
        } else {
            result.textContent = evaluateResult;
        }
        operator = e.target.textContent;
        num1.length = 0;
        num2.length = 0;
        num1.push(result.textContent);
        input.textContent = `${result.textContent} ${operator}`;
    }



    //reset all 3 variables, input and result values
    if (e.target.classList.contains('C')) {
        num1.length = 0;
        num1.push(0);
        num2.length = 0;
        operator = '';
        input.textContent = '';
        result.textContent = num1[0];
    }


    //PROBLEM S OPERATOROM PO VYMAZANI CISEL A ICH PREMENE NA 0 - OPERATOR ZOSTANE A NEZRESETUJE HODNOTY NUM
    //KED SA NEZRESETUJE OPERATOR TAK PO VZPISANI VYSLEDKU ZOSTAVAJU STALE NUM1 AJ NUM2 A KED CHCEM ZACAT NOVY
    //PRIKLAD TAK TIETO NOVE CISLA MI PRIPISE K NEVYMAZANYM HODNOTAM V NUM1/NUM2. VYPOCITANIE VYSLEDKU MUSI RESETOVAT
    //AJ OPERATORA AJ NUM1 AJ NUM2 - POUZIT PO VYPOCITANI VYSLEDKU 'C'?


    if (e.target.classList.contains('DEL')) {
        if (operator != '') {
            if ((num2.length != 0) && (num2[0] != 0)) {
                num2.pop();
                if (num2.length == 0) {
                    num2.push(0);
                    //operator = '';
                }
            }

            result.textContent = `${num2.join('')}`;
        } else {
            if ((num1.length != 0) && (num1[0] != 0)) {
                num1.pop();
                if (num1.length == 0) {
                    num1.push(0);
                    //operator = '';
                }
            }


            result.textContent = `${num1.join('')}`;
        }
    }

    //add decimal point to either num1 or num2 if it is not already present in either number
    if ((e.target.classList.contains('.'))) {
        if (operator != '') {
            if (!(num2.includes(e.target.textContent))) {
                num2.push(e.target.textContent);
                result.textContent = `${num2.join('')}`;
                input.textContent = `${num1.join('')} ${operator} ${num2.join('')}`;
            }
        } else {
            if (!(num1.includes(e.target.textContent))) {
                num1.push(e.target.textContent);
                result.textContent = `${num1.join('')} ${operator} ${num2.join('')}`;
            }
        }
    }

    console.log(`num1 je: ${num1}`);
    console.log(`operator je: ${operator}`);
    console.log(`num2 je: ${num2}`);
    console.log(evaluate(num1, num2, operator))
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
            if (num2 == 0) {
                return `very funny`
            } else return +num1.join('') / +num2.join('');
    }
}