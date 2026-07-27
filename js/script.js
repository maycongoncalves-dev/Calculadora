const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
        this.previousOperation = "";
        this.operation = undefined;
    }

    addDigit(digit) {
        if (this.currentOperation === "Erro") {
            this.currentOperation = digit;
            this.updateScreen();
            return;
        }

        if (digit === "." && this.currentOperation.includes(".")) return;
        this.currentOperation = `${this.currentOperation}${digit}`;
        this.updateScreen();
    }

    clear() {
        this.currentOperation = "";
        this.previousOperation = "";
        this.operation = undefined;
        this.updateScreen();
    }

    clearCurrent() {
        this.currentOperation = "";
        this.updateScreen();
    }

    delete() {
        this.currentOperation = this.currentOperation.slice(0, -1);
        this.updateScreen();
    }

    chooseOperation(operation) {
        if (this.currentOperation === "" && this.previousOperation !== "") {
            this.operation = operation;
            this.updateScreen();
            return;
        }

        if (this.currentOperation === "") return;

        if (this.previousOperation !== "") {
            this.compute();
        }

        this.operation = operation;
        this.previousOperation = this.currentOperation;
        this.currentOperation = "";
        this.updateScreen();
    }

    compute() {
        const previous = parseFloat(this.previousOperation);
        const current = parseFloat(this.currentOperation);
        if (isNaN(previous) || isNaN(current)) return;

        let result;
        switch (this.operation) {
            case "+":
                result = previous + current;
                break;
            case "-":
                result = previous - current;
                break;
            case "*":
                result = previous * current;
                break;
            case "/":
                result = current === 0 ? "Erro" : previous / current;
                break;
            default:
                return;
        }

        this.currentOperation = result.toString();
        this.previousOperation = "";
        this.operation = undefined;
        this.updateScreen();
    }

    updateScreen() {
        this.currentOperationText.innerText = this.currentOperation || "0";
        if (this.operation) {
            this.previousOperationText.innerText = `${this.previousOperation} ${this.operation}`;
        } else {
            this.previousOperationText.innerText = "";
        }
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (!isNaN(value) || value === ".") {
            calc.addDigit(value);
            return;
        }

        switch (value) {
            case "C":
                calc.clear();
                break;
            case "Ce":
                calc.clearCurrent();
                break;
            case "DEL":
                calc.delete();
                break;
            case "=":
                calc.compute();
                break;
            default:
                calc.chooseOperation(value);
                break;
        }
    });
});