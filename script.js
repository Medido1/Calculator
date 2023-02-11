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

updateDisplay();

const buttons = document.querySelectorAll("td");
buttons.forEach(button => button.addEventListener("click", ()=>{
 const key = button.textContent;
 
  inputDigit(key);
  updateDisplay();
}))