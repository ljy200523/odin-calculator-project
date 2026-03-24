let firstNumber = [];
let secondNumber = [];
let operation = null;
let restartState = false;

const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll(".button"));
const operators = Array.from(document.querySelectorAll(".operators .operator"));
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");

function toDecimal(num) {
    if (num % 1 !== 0) return num.toFixed(2);
    else return num;
}

const add = (a, b) => toDecimal((a + b));
const subtract = (a, b) => toDecimal((a - b));
const multiply = (a, b) => toDecimal((a * b));
const divide = (a, b) => toDecimal((a / b));


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
            if (operation != null && secondNumber.length !== 0) {
                let result = operate(firstNumber, secondNumber, operation);
                firstNumber = [result], secondNumber.length = 0, operation = null, restartState = true;
                console.log("Result: ", result);
                screen.textContent = `= ${result}`;
            }
            else if (operation != null) {
                screen.textContent = screen.textContent.slice(0, -1) + event.target.textContent;
                operation = event.target.textContent;
                restartState = false;
            }
            else {
                screen.textContent += event.target.textContent;
                operation = event.target.textContent;
                restartState = false;
            }
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
    backspace.addEventListener("click", () => {
        screen.textContent = screen.textContent.slice(0, -1);
        if (secondNumber != 0) {
            secondNumber = secondNumber.slice(0, -1);
            return secondNumber;
        }
        else if (operation) return operation = null;
        else if (firstNumber) {
            firstNumber = firstNumber.slice(0, -1);
            return firstNumber;
        }
    });
}

// function isValid(firstNumber, secondNumber, sign) {
//     if (secondNumber === 0 && sign === "/") return false;
//     if (firstNumber && secondNumber && sign) return true;
// }
updateVariable();
