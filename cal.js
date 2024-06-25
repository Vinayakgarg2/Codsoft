document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = null;
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                resetCalculator();
            } else if (value === '=') {
                performCalculation();
            } else if (['+', '-', '*', '/'].includes(value)) {
                handleOperator(value);
            } else {
                handleNumber(value);
            }
        });
    });

    function resetCalculator() {
        currentInput = '';
        operator = null;
        firstOperand = null;
        display.textContent = '0';
    }

    function performCalculation() {
        if (operator && firstOperand !== null) {
            const secondOperand = parseFloat(currentInput);
            let result = null;
            switch (operator) {
                case '+':
                    result = firstOperand + secondOperand;
                    break;
                case '-':
                    result = firstOperand - secondOperand;
                    break;
                case '*':
                    result = firstOperand * secondOperand;
                    break;
                case '/':
                    result = firstOperand / secondOperand;
                    break;
            }
            display.textContent = result;
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
        }
    }

    function handleOperator(op) {
        if (currentInput === '') return;
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else if (operator) {
            performCalculation();
            firstOperand = parseFloat(currentInput);
        }
        operator = op;
        currentInput = '';
    }

    function handleNumber(num) {
        currentInput += num;
        display.textContent = currentInput;
    }
});
