let firstNumber = [];
let secondNumber = [];
let operation = null;
let restartState = false;

const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll(".button"));
const operators = Array.from(document.querySelectorAll(".operators .operator"));
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");


const add = (a, b) => (a + b).toFixed(2);
const subtract = (a, b) => (a - b).toFixed(2);
const multiply = (a, b) => (a * b).toFixed(2);
const divide = (a, b) => (a / b).toFixed(2);


function operate(firstNumber, secondNumber, sign) {
    firstNumber = +firstNumber.join("");
    secondNumber = +secondNumber.join("");
    console.log(`AFTER CONVERSION: firstNumber=${firstNumber}, secondNumber=${secondNumber}, sign=${sign}`);

    if (sign === "+") return add(firstNumber, secondNumber);
    else if (sign === "-") return subtract(firstNumber, secondNumber);
    else if (sign === "*") return multiply(firstNumber, secondNumber);
    else if (sign === "/") return divide(firstNumber, secondNumber);
};


function updateVariable() {
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            if (operation !== null) {
                screen.textContent += event.target.textContent;
                secondNumber.push(event.target.textContent);
                console.log(`secondNumber = ${secondNumber}`);
            }
            else if (restartState !== false) {
                firstNumber = [event.target.textContent];
                secondNumber.length = 0;
                operation = null;
                screen.textContent = event.target.textContent;
                restartState = true;
            }
            else {
                screen.textContent += event.target.textContent;
                firstNumber.push(event.target.textContent);
                console.log(`firstNumber = ${firstNumber}`);
            }
        });
    });
    operators.forEach(operator => {
        operator.addEventListener("click", (event) => {
            if (operation != null) {
                let result = operate(firstNumber, secondNumber, operation);
                firstNumber = [result], secondNumber.length = 0, operation = null, restartState = true;
                console.log("Result: ", result);
                screen.textContent = `= ${result}`;
            }
            screen.textContent += event.target.textContent;
            operation = event.target.textContent;
            restartState = false;
        });
    });
    equal.addEventListener("click", (event) => {
        let result = operate(firstNumber, secondNumber, operation);
        firstNumber = [result], secondNumber.length = 0, operation = null, restartState = true;
        console.log("Result: ", result);
        screen.textContent = `= ${result}`;
    });
    clear.addEventListener("click", () => {
        firstNumber.length = 0;
        secondNumber.length = 0;
        operation = null;
        restartState = false;
        screen.textContent = "";
        console.log("CLEARED");
    });
}

updateVariable();
