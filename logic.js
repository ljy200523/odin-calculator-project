function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let firstNumber = [];
let secondNumber = [];
let operation = null;

function operate(firstNumber, secondNumber, sign) {
    console.log(`original firstNumber: ${firstNumber}, sign: ${sign}, original secondNumber: ${secondNumber}`);
    firstNumber = +firstNumber;
    secondNumber = +secondNumber;
    console.log(`firstNumber typeof: ${typeof (firstNumber)}, firstNumber = ${firstNumber}, secondNumber typeof: ${typeof (secondNumber)}, secondNumber = ${secondNumber}`);
    if (sign === "+") return add(firstNumber, secondNumber);
    else if (sign === "-") return subtract(firstNumber, secondNumber);
    else if (sign === "*") return multiply(firstNumber, secondNumber);
    else if (sign === "/") return divide(firstNumber, secondNumber);
}

const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll(".button"));
const operators = Array.from(document.querySelectorAll(".operators .operator"));
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");

function updateVariable() {
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            screen.textContent += event.target.textContent;
            if (operation === null) {
                firstNumber.push(event.target.textContent);
            }
            else {
                secondNumber.push(event.target.textContent);
            }
        });
    });
    operators.forEach(operator => {
        operator.addEventListener("click", (event) => {
            screen.textContent += event.target.textContent;
            operation = event.target.textContent;
        });
    });
    equal.addEventListener("click", (event) => {
        let result = operate(firstNumber, secondNumber, operation);
        console.log(result, typeof (result));
        screen.textContent = `= ${result}`;
    });
    clear.addEventListener("click", () => {
        firstNumber.length = 0;
        secondNumber.length = 0;
        screen.textContent = "";
    });
}

updateVariable();
