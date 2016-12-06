
var calculation = [];
var number = [];
var symbols = ["X","/", "+", "-","="];

document.getElementById('container').addEventListener("click", function( event ){
    console.log(event.target.nodeName);
    if(calculation.length === 0 && number.length === 0) document.getElementById('input').value = "";
    if(event.target && event.target.nodeName == "LI"){
        if(event.target.id === "equals"){
            if(calculation.length > 0){
                calculation.push(number.join(""));
            }
        }else if(event.target.id === "clear"){
            calculation = [];
        }else if(symbols.indexOf(event.target.textContent) !== -1){
            calculation.push(number.join(""));
            calculation.push(event.target.textContent)
            number = [];
        }else{
            number.push(event.target.textContent);
        }
    }
    updateField(event);
}, false);

function updateField(event){
    var field = document.getElementById('input');
    if(symbols.indexOf(event.target.textContent)!== -1){
        if(event.target.textContent === "="){
            field.value = calculate();
            number = [];
            calculation = [];
        }else{
            field.value += " " + event.target.textContent + " ";
        }
    }else{
        if( event.target.textContent === "clear"){
            field.value = "";
            number = [];
            calculation = [];
        }else {
            field.value += event.target.textContent;
        }
    }
}

function calculate(){
    for(var i = 0; i <  symbols.length-1; i++){
        while(calculation.indexOf(symbols[i]) > 0){
            var index = calculation.indexOf(symbols[i]);
            var firstNum = parseFloat(calculation[index-1]);
            var symbol = symbols[i];
            var secondNum = parseFloat(calculation[index+1]);
            calculation.splice(index-1,3,hCalc(firstNum, symbol, secondNum));
        }
    }
    return calculation.join(" ");
}

function hCalc(firstNum, symbol, secondNum){
    switch (symbol) {
        case 'X':
            return firstNum * secondNum;
            break;
        case '/':
            return firstNum / secondNum;
            break;
        case '+':
            return firstNum + secondNum;
            break;
        case '-':
            return firstNum - secondNum;
    }
}
