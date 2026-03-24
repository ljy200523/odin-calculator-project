let firstNumber = [];
let secondNumber = [];
let operation = null;
let calculatedValue;

const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll(".button"));
const operators = Array.from(document.querySelectorAll(".operators .operator"));
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;


function operate(firstNumber, secondNumber, sign) {
    firstNumber = +firstNumber.join("");
    secondNumber = +secondNumber.join("");
    console.log(`AFTER CONVERSION: firstNumber=${firstNumber}, secondNumber=${secondNumber}, sign=${sign}`);
    if (sign === "+") {
        calculatedValue = add(firstNumber, secondNumber);
        firstNumber = [calculatedValue], secondNumber.length = 0, operation = null;
        return calculatedValue;
    }
    else if (sign === "-") {
        calculatedValue = subtract(firstNumber, secondNumber);
        firstNumber = [calculatedValue], secondNumber.length = 0, operation = null;
        return calculatedValue;
    }
    else if (sign === "*") {
        calculatedValue = multiply(firstNumber, secondNumber);
        firstNumber = [calculatedValue], secondNumber.length = 0, operation = null;
        return calculatedValue;
    }
    else if (sign === "/") {
        calculatedValue = divide(firstNumber, secondNumber);
        firstNumber = [calculatedValue], secondNumber.length = 0, operation = null;
        return calculatedValue;
    }
};


function updateVariable() {
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            screen.textContent += event.target.textContent;
            if (operation === null) {
                firstNumber.push(event.target.textContent);
                console.log(`firstNumber = ${firstNumber}`);
            }
            else {
                secondNumber.push(event.target.textContent);
                console.log(`secondNumber = ${secondNumber}`);
            }
        });
    });
    operators.forEach(operator => {
        operator.addEventListener("click", (event) => {
            if (operation != null) {
                let result = operate(firstNumber, secondNumber, operation);
                firstNumber = [result], secondNumber.length = 0, operation = null;
                console.log("Result: ", result);
                screen.textContent = `= ${result}`;
            }
            screen.textContent += event.target.textContent;
            operation = event.target.textContent;
        });
    });
    equal.addEventListener("click", (event) => {
        let result = operate(firstNumber, secondNumber, operation);
        firstNumber = [result], secondNumber.length = 0, operation = null;
        console.log("Result: ", result);
        screen.textContent = `= ${result}`;
    });
    clear.addEventListener("click", () => {
        firstNumber.length = 0;
        secondNumber.length = 0;
        operation = null;
        screen.textContent = "";
        console.log("CLEARED");
    });
}

updateVariable();
