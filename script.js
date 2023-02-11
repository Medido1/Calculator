const calculator = {
  displayValue : "0",
  firstOperand : null,
  operator : null,
  waitingForSecondOperand : false,
}

function inputDigit(digit){
  if(calculator.displayValue === "0"){
    calculator.displayValue = digit;
  }
  else {
    calculator.displayValue += digit;
  }
}

function updateDisplay(){
  const result = document.getElementById("result");
  if (result.textContent.length > 12){
    return;
  }
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
  if (calculator.displayValue === "0"){
    calculator.displayValue = "0.";
  }
  else if (!calculator.displayValue.includes(".")){
    calculator.displayValue += ".";
  }
}

updateDisplay();

const buttons = document.querySelectorAll("td");
buttons.forEach(button => button.addEventListener("click", (e)=>{
  const key = e.target;
  
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

  inputDigit(key.textContent);
  updateDisplay();
}))