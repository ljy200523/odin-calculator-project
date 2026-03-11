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
let operator;

function operate(a, b, operator) {
    return operator(a, b);
}

const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll(".buttons"));
const operators = Array.from(document.querySelectorAll(".operators"));


function updateVariable() {
        buttons.addEventListener("click", (event) => {
        if (operator === null) {
        screen.textContent = event.target.textContent;
        a.push(event.target.textContent);
        }
        else {
        screen.textContent = event.target.textContent;
        b.push(event.target.textContent);
        }
    })
    operators.addEventListener("click", (event) => {
        screen.textContent = event.target.textContent;
        operator = event.target.textContent;
    })
}
