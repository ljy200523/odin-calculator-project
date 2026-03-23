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

let a = [];
let b = [];
let operator = null;

function operate(a, b, operator) {
    return operator(a, b);
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
            if (operator === null) {
                a.push(event.target.textContent);
            }
            else {
                b.push(event.target.textContent);
            }
        });
    });
    operators.forEach(operator => {
        operator.addEventListener("click", (event) => {
            screen.textContent += event.target.textContent;
            operator = event.target.textContent;
        });
    });
    equal.addEventListener("click", (event) => {
        screen.textContent = operate(a, b, operator)
    });
    clear.addEventListener("click", () => {
        screen.textContent = "";
    });
}

updateVariable();
