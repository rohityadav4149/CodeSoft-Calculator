document.addEventListener('DOMContentLoaded', function () {
    const calculatorScreen = document.getElementById('calculator-screen');
    const keys = document.querySelectorAll('.calculator-keys button');
    let currentInput = '';
    let firstOperand = '';
    let operator = '';
    let shouldResetScreen = false;

    keys.forEach(key => {
        key.addEventListener('click', function () {
            const value = this.value;

            if (value === 'C') {
                clearScreen();
            } else if (value === '=') {
                calculate();
            } else if (['+', '-', '*', '/'].includes(value)) {
                setOperator(value);
            } else {
                appendNumber(value);
            }
        });
    });

    function clearScreen() {
        currentInput = '';
        firstOperand = '';
        operator = '';
        calculatorScreen.value = '';
    }

    function appendNumber(number) {
        if (shouldResetScreen) {
            currentInput = '';
            shouldResetScreen = false;
        }
        currentInput += number;
        calculatorScreen.value = currentInput;
    }

    function setOperator(op) {
        if (operator && currentInput) {
            calculate();
        }
        firstOperand = currentInput;
        operator = op;
        shouldResetScreen = true;
    }

    function calculate() {
        let result;
        const secondOperand = currentInput;

        if (!firstOperand || !operator || !secondOperand) return;

        const first = parseFloat(firstOperand);
        const second = parseFloat(secondOperand);

        switch (operator) {
            case '+':
                result = first + second;
                break;
            case '-':
                result = first - second;
                break;
            case '*':
                result = first * second;
                break;
            case '/':
                result = first / second;
                break;
        }

        currentInput = result.toString();
        calculatorScreen.value = currentInput;
        operator = '';
    }
});
