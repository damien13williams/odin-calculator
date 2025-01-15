// Creating variables from user input
let displayText = ''
let display = document.getElementById("display")

function updateDisplay(){
    display.innerText = displayText;
}

let var1 = ''
let var2 = ''

function handleInput(number) {
    displayText += number;
    if (!operatorPressed) {
        var1 += number; 
        console.log("Updated variable1: ", var1);
    } else {
        var2 += number; 
        console.log("Updated variable2: ", var2);
    }
    updateDisplay();
}

["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].forEach(id => {
    document.getElementById(id).addEventListener("click", () => handleInput(id));
});

let operatorPressed = false
let currentOperator = null
const operators = document.querySelectorAll('.func');
operators.forEach(button => {
    button.addEventListener('click', e => {
        const operator = e.target.innerText; // Get the clicked operator

        // If both variables are set, calculate the result before moving to the next operator
        if (var1 !== '' && var2 !== '') {
            operate(currentOperator); // Perform the previous operation
        }

        // Update the current operator and set operatorPressed
        currentOperator = operator;
        operatorPressed = true;

        // Update the screen to show the new operator
        displayText = var1 + currentOperator; // Only variable1 and the new operator
        updateDisplay();
    });
});
function operate(operator){
    let num1 = parseFloat(var1);
    let num2 = parseFloat(var2);
    let result = 0;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;

        case '-':
            result = num1 - num2;
            break;

        case '*':
            result = num1 * num2;
            break;
          
        case '/':
            if(num2 === 0){
                displayText = "Error: cannot divide by zero"
                updateDisplay();
                return;
            }
            result = num1 / num2;
            break;
    }

    var1 = result.toString();
    var2 = '';
    displayText = var1;
    updateDisplay();
    operatorPressed = false;
}

document.getElementById("equal").addEventListener("click", () => {
    if (operatorPressed && var1 !== '') {
        // If operator is pressed but var2 is missing, default var2 to 0
        if (var2 === '') {
            var2 = '0';  // Default second operand to 0
        }
        // Now perform the operation
        operate(currentOperator);
    } else if (!operatorPressed && var1 !== '') {
        // If no operator, simply display the current var1 (the first operand)
        displayText = var1;
        updateDisplay();
    }
    if (operatorPressed && var1 !== '' && var2 !== '') {
        // Validate var1 and var2 for multiple decimal points
        if (!isValidNumber(var1) || !isValidNumber(var2)) {
            displayText = "Error: Invalid input (multiple decimal points)";
            updateDisplay();
            return;  // Prevent further execution
        }
        operate(currentOperator);
    } else if (!operatorPressed && var1 !== '') {
        if (!isValidNumber(var1)) {
            displayText = "Error: Invalid input (multiple decimal points)";
            updateDisplay();
            return;
        }
        displayText = var1;
        updateDisplay();
    }
});

function AC(){
    var1 = '';
    var2 = '';
    result = 0;
    operator = null;
    currentOperator = null;
    displayText = ' '
    updateDisplay()
}

document.getElementById("AC").addEventListener("click", () => AC());

function deleteItem(){
    let arr = displayText.split("");
    arr.pop();
    displayText = arr.join('');
    updateDisplay()

    if (operatorPressed) {
        let arr2 = var2.split('');
        arr2.pop();
        var2 = arr2.join('')
    }
    else {
        let arr1 = var1.split('');
        arr1.pop()
        var1 = arr1.join('')
    }
}

document.getElementById("BackSpace").addEventListener("click", () => deleteItem());

function isValidNumber(input) {
    // Regular expression to check if the input has more than one decimal point
    const decimalPattern = /\./g;
    const match = input.match(decimalPattern);
    return match === null || match.length === 1;  // Allow 0 or 1 decimal points
}