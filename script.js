const calculator = {
  displayValue : "0",
  firstOperand : null,
  operator : null,
  waitingForSecondOperand : false,
}

function inputDigit(digit){
  if (isNaN(calculator.displayValue)){
    calculator.displayValue = digit;
  }
  else if (calculator.displayValue.length > 12 && calculator.waitingForSecondOperand === false){
    return
  }
  else if (calculator.waitingForSecondOperand){
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  }
  else if(calculator.displayValue === "0"){
    calculator.displayValue = digit;
  }
  else {
    calculator.displayValue += digit;
  }
}

function handleOperator(nextOperator){
  const {displayValue, firstOperand, operator} = calculator;
  if (calculator.displayValue === "LOL"){
    calculator.displayValue = "0";
    updateDisplay();
    return;
  }
  const input = parseFloat(displayValue);
  if (calculator.firstOperand === null && !isNaN(input)){
    calculator.firstOperand = input; 
  }
  else if (operator){
    const result = operate(firstOperand, input, operator);
    const resultString = String(result)
    const displayLength = resultString.length;
    if (isNaN(result)){
      calculator.displayValue = result;
      calculator.firstOperand = null;
      calculator.waitingForSecondOperand = false;
      return;
    }
    else {
      calculator.displayValue = Math.round(result * 10000) / 10000;
      calculator.firstOperand = Math.round(result * 10000) / 10000;
    }
    
    }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}



function operate(firstOperand, secondOperand, operator){
  switch(operator){
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      if (secondOperand === 0) return "LOL"
      return firstOperand / secondOperand;
    case "%":
      return firstOperand % secondOperand;
    default:
      return secondOperand;
  }
}

function updateDisplay(){
  const result = document.getElementById("result");
  result.textContent = calculator.displayValue;
}

function handleBackSpace(){
  const input = calculator.displayValue;
  if (input.length < 2){
    calculator.displayValue = "0";
  }
  else {
    calculator.displayValue = input.substring(0, input.length-1);
  }
}

function handleDecimal(){
  if (calculator.waitingForSecondOperand){
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
  }
  else if (calculator.displayValue === "0"){
    calculator.displayValue = "0.";
  }
  else if (!calculator.displayValue.includes(".")){
    calculator.displayValue += ".";
  }
}

function handleClear(){
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
}

function removeColor(){
  buttons.forEach(button => button.classList.remove("clicked"));
}

updateDisplay();

function useCalculator(e){
  let key;
  if (e.type === "click"){
    key = e.target;
  }
  else if (e.type === "keydown"){
    let button = document.querySelector(`td[data-key="${e.keyCode}"]`);
    if(button){
      key = button;
    }
    else return;
  }


  removeColor();

  if(key.classList.contains("operator")){
    key.classList.add("clicked");
    handleOperator(key.textContent);
    updateDisplay();
    return;
  }
  
  if(key.classList.contains("backspace")){
   handleBackSpace();
   updateDisplay();
   return;
  }

  if (key.classList.contains("decimal")){
    handleDecimal();
    updateDisplay();
    return;
  }

  if (key.classList.contains("clear")){
    handleClear();
    updateDisplay();
    return;
  }

  inputDigit(key.textContent);
  updateDisplay();
}

const buttons = document.querySelectorAll("td");
buttons.forEach(button => button.addEventListener("click", useCalculator));
window.addEventListener("keydown", useCalculator)