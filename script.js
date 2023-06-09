'use strict';

let input = document.querySelector('.display .input');
let result = document.querySelector('.display .result');
let buttons = document.querySelector('.buttons');
let num1 = [0];
let num2 = [];
let completedEvaluation = null;
let operator = '';
let storedResult;

let regex = {
    operators: /(Enter|[+\-=*\/])/i,
    numbers: /\d/,
}

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
                return 'very funny'
            } else return +num1.join('') / +num2.join('');
    }
}

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
        if (completedEvaluation) {
            num1.length = 0;
            num1.push(0);
            num2.length = 0;
            operator = '';
            input.textContent = '';
            completedEvaluation = false;
        }
        if (operator != '') {
            if ((!(num2[0] == 0)) || ((num2[1] == '.'))) {
                num2.push(e.target.textContent);
                result.textContent = `${num2.join('')}`;
                completedEvaluation = false;
            }
        }
        else if ((num1[0] == 0) && (!(num1[1] == '.'))) {
            num1.pop();
            num1.push(e.target.textContent);
            result.textContent = `${num1.join('')} ${operator} ${num2.join('')}`;
            completedEvaluation = false;
        } else {
            num1.push(e.target.textContent);
            result.textContent = `${num1.join('')} ${operator} ${num2.join('')}`;
            completedEvaluation = false;
        }

    }

    //select operator only after num1 has been selected
    if (e.target.classList.contains('operator')) {
        if ((num1.length != 0) && (num2.length == 0)) {
            operator = e.target.textContent;
            input.textContent = `${num1.join('')} ${operator}`;
            completedEvaluation = false;

        }
    }

    //display result after pressing = if num2 has benn added, hence all 3 variables are known, display whole equation as input value
    if ((e.target.classList.contains('='))) {
        if (num2.length == 0) {
            num2.push(0);
        } else {
            let evaluateResult = evaluate(num1, num2, operator);
            if (typeof evaluateResult == 'string') {
                result.textContent = evaluateResult;
            }
            else if (!(Number.isInteger(evaluateResult))) {
                result.textContent = parseFloat(evaluateResult.toFixed(3));
            } else {
                result.textContent = evaluateResult;
            }
            input.textContent = `${num1.join('')} ${operator} ${num2.join('')} =`;
            storedResult = evaluateResult;
        }
        completedEvaluation = true;

    }

    //display result of equation after a new operator has been selected if all 3 variables are known and = is not the operator
    if ((e.target.classList.contains('operator')) && ((num2.length != 0) && (!(e.target.classList.contains('='))))) {
        storedResult = evaluate(num1, num2, operator);
        if (completedEvaluation) {
            num1.length = 0;
            num2.length = 0;
            num1.push(storedResult);
            operator = e.target.textContent;
            input.textContent = `${storedResult} ${operator}`;
            completedEvaluation = false;

        }
        else if (typeof storedResult == 'string') {
            result.textContent = storedResult;
            completedEvaluation = true;
        }

        else if (!(Number.isInteger(storedResult))) {
            let n = parseFloat(storedResult.toFixed(3));
            result.textContent = n;
            num1.length = 0;
            num2.length = 0;
            num1.push(n);
            operator = e.target.textContent;
            input.textContent = `${num1.join('')} ${operator}`;
            completedEvaluation = false;

        } else {
            result.textContent = storedResult;
            num1.length = 0;
            num2.length = 0;
            num1.push(storedResult);
            operator = e.target.textContent;
            input.textContent = `${num1.join('')} ${operator}`;
            completedEvaluation = false;
        }

    }



    //reset all 3 variables, input and result values
    if (e.target.classList.contains('c')) {
        num1.length = 0;
        num1.push(0);
        num2.length = 0;
        operator = '';
        input.textContent = '';
        result.textContent = num1[0];
        completedEvaluation = false;
        storedResult = null;
    }

    //remove last digit from either num1 or num2, after deleting last remaining digit replace it with 0 instead
    if (e.target.classList.contains('d')) {
        if (operator != '') {
            if ((num2.length != 0) && (num2[0] != 0)) {
                num2.pop();
                result.textContent = `${num2.join('')}`;

                if (num2.length == 0) {
                    result.textContent = 0;
                }
            }

        } else {
            if ((num1.length != 0) && (num1[0] != 0)) {
                num1.pop();
                result.textContent = `${num1.join('')}`;

                if (num1.length == 0) {
                    num1.push(0);
                    result.textContent = `${num1.join('')}`;
                }
            }

        }
    }

    //add decimal point to either num1 or num2 if it is not already present in either number
    if ((e.target.classList.contains('.'))) {
        if (operator) {
            if (!(num2.includes(e.target.textContent))) {
                num2.push(e.target.textContent);
                result.textContent = `${num2.join('')}`;
            }
        } else {
            if (!(num1.includes(e.target.textContent))) {
                num1.push(e.target.textContent);
                result.textContent = `${num1.join('')} ${operator} ${num2.join('')}`;
            }
        }
    }

    //add - symbol in front of first digit in either num1 or num2. if - symbol already present, remove it instead
    if (e.target.classList.contains('n')) {
        if ((operator) && (num2.length != 0) && (!(completedEvaluation))) {

            if (num2[0] == '-') {
                num2.shift();

            } else {
                num2.unshift('-');

            }
            result.textContent = `${num2.join('')}`;

        } else if ((num2.length == 0)) {

            if (num1[0] == '-') {
                num1.shift();

            } else {
                num1.unshift('-');

            }
            result.textContent = `${num1.join('')}`;
        }
    }
})


//KEY EVENTS

document.addEventListener('keydown', (e) => {

    buttons.querySelectorAll('div').forEach((item) => {
        if ((regex['numbers'].test(e.key)) || (regex['operators'].test(e.key))) {

            if (item.classList.contains(e.key)) {

                item.style.boxShadow = '0px 0px';
            }
        }
    })
});

document.addEventListener('keyup', (e) => {
    buttons.querySelectorAll('div').forEach((item) => {
        if ((regex['numbers'].test(e.key)) || (regex['operators'].test(e.key))) {
            if (item.classList.contains(e.key)) {
                item.style.boxShadow = '3px 3px';
            }
        }

        //if operator already selected, add as num2, if not, add as num1
        if ((regex['numbers'].test(e.key))) {
            if (completedEvaluation) {
                num1.length = 0;
                num1.push(0);
                num2.length = 0;
                operator = '';
                input.textContent = '';
                completedEvaluation = false;
            }

            if (operator != '') {
                if (((!(num2[0] == 0)) || ((num2[1] == '.'))) && (item.classList.contains(e.key))) {
                    num2.push(item.textContent);
                    result.textContent = `${num2.join('')}`;
                    completedEvaluation = false;
                }
            }

            else if ((regex['numbers'].test(e.key) && (item.textContent == e.key) && (num1[0] == 0) && (!(num1[1] == '.')))) {
                num1.pop();
                num1.push(e.key);
                result.textContent = `${num1.join('')} ${operator} ${num2.join('')}`;
                completedEvaluation = false;

            } else if (regex['numbers'].test(e.key) && (item.textContent == e.key)) {
                num1.push(e.key);
                result.textContent = `${num1.join('')} ${operator} ${num2.join('')}`;
                completedEvaluation = false;
            }
        }

        //select operator only after num1 has been selected
        if ((regex['operators'].test(e.key)) && (item.classList.contains(e.key))) {
            if ((num1.length != 0) && (num2.length == 0)) {
                operator = item.textContent;
                input.textContent = `${num1.join('')} ${operator}`;
                completedEvaluation = false;
            }
        }


        //display result after pressing = if num2 has benn added, hence all 3 variables are known, display whole equation as input value
        if (((e.key == '=') || (e.key == 'Enter')) && (item.classList.contains(e.key))) {
            if (num2.length == 0) {
                num2.push(0);
            } else {
                let evaluateResult = evaluate(num1, num2, operator);
                if (typeof evaluateResult == 'string') {
                    result.textContent = evaluateResult;
                }
                else if (!(Number.isInteger(evaluateResult))) {
                    result.textContent = parseFloat(evaluateResult.toFixed(3));
                } else {
                    result.textContent = evaluateResult;
                }
                input.textContent = `${num1.join('')} ${operator} ${num2.join('')} =`;
                storedResult = evaluateResult;
            }
            completedEvaluation = true;
        }

        //display result of equation after a new operator has been selected if all 3 variables are known and = is not the operator
        if ((regex['operators'].test(e.key)) && (item.classList.contains('operator')) && (num2.length != 0) && ((e.key != '=') && (e.key != 'Enter'))) {
            storedResult = evaluate(num1, num2, operator);
            if (completedEvaluation) {
                num1.length = 0;
                num2.length = 0;
                num1.push(storedResult);
                operator = item.textContent;
                input.textContent = `${storedResult} ${operator}`;
                completedEvaluation = false;

            }
            else if (typeof storedResult == 'string') {
                result.textContent = storedResult;
                completedEvaluation = true;
            }

            else if (!(Number.isInteger(storedResult))) {
                let n = parseFloat(storedResult.toFixed(3));
                result.textContent = n;
                num1.length = 0;
                num2.length = 0;
                num1.push(n);
                operator = item.textContent;
                input.textContent = `${num1.join('')} ${operator}`;
                completedEvaluation = false;

            } else {
                result.textContent = storedResult;
                num1.length = 0;
                num2.length = 0;
                num1.push(storedResult);
                operator = item.textContent;
                input.textContent = `${num1.join('')} ${operator}`;
                completedEvaluation = false;
            }

        }

        //reset all 3 variables, input and result values
        if ((item.classList.contains(e.key)) && ((e.key == 'c') || (e.key == 'Delete'))) {
            num1.length = 0;
            num1.push(0);
            num2.length = 0;
            operator = '';
            input.textContent = '';
            result.textContent = num1[0];
            completedEvaluation = false;
            storedResult = null;
        }

        //remove last digit from either num1 or num2, after deleting last remaining digit replace it with 0 instead
        if ((item.classList.contains(e.key)) && ((e.key == 'd') || (e.key == 'Backspace'))) {
            if (operator != '') {
                if ((num2.length != 0) && (num2[0] != 0)) {
                    num2.pop();
                    result.textContent = `${num2.join('')}`;

                    if (num2.length == 0) {
                        result.textContent = 0;
                    }
                }

            } else {
                if ((num1.length != 0) && (num1[0] != 0)) {
                    num1.pop();
                    result.textContent = `${num1.join('')}`;

                    if (num1.length == 0) {
                        num1.push(0);
                        result.textContent = `${num1.join('')}`;
                    }
                }

            }
        }

        //add decimal point to either num1 or num2 if it is not already present in either number
        if ((item.classList.contains(e.key)) && ((e.key == '.'))) {
            if (operator) {
                if (!(num2.includes(item.textContent))) {
                    num2.push(item.textContent);
                    result.textContent = `${num2.join('')}`;
                }
            } else {
                if (!(num1.includes(item.textContent))) {
                    num1.push(item.textContent);
                    result.textContent = `${num1.join('')} ${operator} ${num2.join('')}`;
                }
            }
        }

        //add - symbol in front of first digit in either num1 or num2. if - symbol already present, remove it instead
        if ((item.classList.contains(e.key)) && ((e.key == 'n'))) {
            if ((operator) && (num2.length != 0) && (!(completedEvaluation))) {

                if (num2[0] == '-') {
                    num2.shift();

                } else {
                    num2.unshift('-');

                }
                result.textContent = `${num2.join('')}`;

            } else if ((num2.length == 0)) {

                if (num1[0] == '-') {
                    num1.shift();

                } else {
                    num1.unshift('-');

                }
                result.textContent = `${num1.join('')}`;
            }
        }


    });



})





