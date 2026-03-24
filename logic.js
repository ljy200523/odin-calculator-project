let firstNumber = "";
let secondNumber = "";
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
    firstNumber = +firstNumber;
    secondNumber = +secondNumber;
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
                secondNumber += (event.target.textContent);
                console.log(`secondNumber = ${secondNumber}`);
            }
            else if (restartState !== false) {
                firstNumber = [event.target.textContent];
                secondNumber = "";
                operation = null;
                screen.textContent = event.target.textContent;
                restartState = true;
            }
            else {
                screen.textContent += event.target.textContent;
                firstNumber += (event.target.textContent);
                console.log(`firstNumber = ${firstNumber}`);
            }
        });
    });
    operators.forEach(operator => {
        operator.addEventListener("click", (event) => {
            if (operation != null && secondNumber.length !== 0) {
                let result = operate(firstNumber, secondNumber, operation);
                firstNumber = `${result}`, secondNumber = "", operation = null, restartState = true;
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
        firstNumber = `${result}`, secondNumber = "", operation = null, restartState = true;
        console.log("Result: ", result);
        screen.textContent = `= ${result}`;
    });
    clear.addEventListener("click", () => {
        firstNumber = "";
        secondNumber = "";
        operation = null;
        restartState = false;
        screen.textContent = "";
    });
    backspace.addEventListener("click", () => {
        screen.textContent = screen.textContent.slice(0, -1);
        if (secondNumber != "") {
            secondNumber = secondNumber.slice(0, -1);
            console.log("secondNumber is", secondNumber);
            return secondNumber;
        }
        else if (operation) return operation = null;
        else if (firstNumber) {
            firstNumber = firstNumber.slice(0, -1);
            console.log("firstNumber is", firstNumber);
            return firstNumber;
        }
    });
}

// function isValid(firstNumber, secondNumber, sign) {
//     if (secondNumber === 0 && sign === "/") return false;
//     if (firstNumber && secondNumber && sign) return true;
// }
updateVariable();
