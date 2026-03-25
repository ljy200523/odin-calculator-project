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
const dot = document.querySelector(".dot");

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
    else if (sign === "/") {
        if (secondNumber === 0) return alert("Snarky Error Message: No divide by 0")
        else return divide(firstNumber, secondNumber);
    }
};


function updateVariable() {
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            if (operation !== null) { //Append to secondNumber
                screen.textContent += event.target.textContent;
                secondNumber += (event.target.textContent);
                console.log(`secondNumber = ${secondNumber}`);
            }
            else if (restartState === true) {
                firstNumber = [event.target.textContent];
                secondNumber = "";
                operation = null;
                screen.textContent = event.target.textContent;
                restartState = false;
            }
            else { //Append to firstNumber
                screen.textContent += event.target.textContent;
                firstNumber += (event.target.textContent);
                console.log(`firstNumber = ${firstNumber}`);
            }
        });
    });
    operators.forEach(operator => {
        operator.addEventListener("click", (event) => {
            if (operation != null && secondNumber.length !== 0) {
                //Calculate existing statement
                let result = operate(firstNumber, secondNumber, operation);
                firstNumber = `${result}`, secondNumber = "", operation = event.target.textContent, restartState = true;
                console.log("Result: ", result);
                screen.textContent = `= ${result}` + event.target.textContent;
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
    dot.addEventListener("click", (event) => {
        if (!firstNumber.includes(".")) {
            screen.textContent += event.target.textContent;
            firstNumber += (event.target.textContent);
        }
        else if (operation && !secondNumber.includes(".")) {
            screen.textContent += event.target.textContent;
            secondNumber += (event.target.textContent);
        }
    });
}
// Keyboard support
document.addEventListener("keydown", (event) => {
    const keyName = event.key;
    if (/^[0-9.]$/.test(keyName)) triggerButton(keyName);
    else if (/^[+\-*/]$/.test(keyName)) triggerOperator(keyName);
    else if (keyName === "Enter") triggerEqual();
    else if (keyName === "=") triggerEqual();
    else if (keyName === "Backspace") triggerBackspace();
    else if (keyName === "Escape") triggerClear();
});

function triggerButton(value) {
    const button = buttons.find(element => element.textContent == value)
    if (button) button.click();
}
function triggerOperator(value) {
    const operator = operators.find(element => element.textContent === value)
    if (operator) operator.click();
}
let triggerEqual = () => equal.click();
let triggerBackspace = () => backspace.click();
let triggerClear = () => clear.click();

// function isValid(firstNumber, secondNumber, sign) {
//     if (secondNumber === 0 && sign === "/") return false;
//     if (firstNumber && secondNumber && sign) return true;
// }
updateVariable();
