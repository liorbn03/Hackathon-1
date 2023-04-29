let output = document.querySelector('.output');
let buttons = document.querySelectorAll('.buttons button');
let clearButton = document.querySelector('#btn-clear');
let equalsButton = document.querySelector('#btn-equals');
let operand1 = null;
let operator = null;
let operand2 = null;

function clear() {
    output.innerText = '0';
    operand1 = null;
    operator = null;
    operand2 = null;
}

function calculate() {
    let result;
    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;
    }
    output.innerText = result;
    operand1 = result;
    operand2 = null;
    operator = null;
}

function buttonClick(event) {
    let buttonValue = event.target.innerText;
    if (!isNaN(buttonValue)) {
        if (operand1 === null) {
            operand1 = parseFloat(buttonValue);
        } else if (operator === null) {
            operand1 = parseFloat(operand1.toString() + buttonValue);
        } else {
            if (operand2 !== null) {
                operand2 = parseFloat(operand2.toString() + buttonValue);
            } else {
                operand2 = parseFloat(buttonValue);
            }
        }
        output.innerText = (operand2 === null) ? operand1 : operand2;
    } else {
        switch (buttonValue) {
            case '+':
            case '-':
            case '*':
            case '/':
                operator = buttonValue;
                if (operand1 === null) {
                    operand1 = 0;
                }
                output.innerText = buttonValue;
                break;
                case '.':
                    if (operand2 === null) {
                        operand2 = 0;
                    }
                    if (operand2.toString().indexOf('.') === -1) {
                        if (operand2 !== null) {
                            operand2 = parseFloat(operand2.toString() + '.');
                            output.innerText = operand2;
                        } else {
                            operand2 = parseFloat('0.');
                            output.innerText = '0.';
                        }
                    }
                    break;
                
            case '=':
                if (operator !== null && operand2 !== null) {
                    calculate();
                }
                break;
            case 'C':
                clear();
                break;
        }
    }
}


clearButton.addEventListener('click', clear);

equalsButton.addEventListener('click', calculate);

for (let button of buttons) {
    button.addEventListener('click', buttonClick);
}
