let prevValue = '';
let currValue = '';

document.addEventListener("DOMContentLoaded", function(){
    let clear = document.querySelector(".clear");
    let back = document.querySelector(".back");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");
    let numbers = document.querySelectorAll(".number")
    let operators = document.querySelectorAll(".operator");

    let prevScreen = document.querySelector(".prev");
    let currScreen = document.querySelector(".current");

    numbers.forEach((number) => number.addEventListener("click", function(e){
        getNumber(e.target.textContent)
        currScreen.textContent = currValue;
    }))

    operators.forEach((op) => op.addEventListener("click", function(e){
        getOperator(e.target.textContent)
        prevScreen.textContent = prevValue + ' ' + operator;
        currScreen.textContent = currValue;
    }))

    clear.addEventListener("click", function(){
        prevValue = '';
        currValue = '';
        operator = '';
        prevScreen.textContent = '';
        currScreen.textContent = '0';
    })

    back.addEventListener("click", function(){
        currScreen.textContent = currScreen.textContent
        .toString()
        .slice(0, -1)
    })

    equal.addEventListener("click", function(){
        if(currValue != '' && prevValue != ''){
            calculate();
            prevScreen.textContent = '';
            if(prevValue.length <= 5){
                currScreen.textContent = prevValue;
            } else {
                currScreen.textContent = prevValue.slice(0,5) + "..."
            }
        }    
    })

    decimal.addEventListener("click", function(){
        addDecimal();
    })
})

function getNumber(num){
    if(currValue.length <= 7){
    currValue += num;
    }
}

function getOperator(op){
    operator = op; 
    prevValue = currValue;
    currValue = ' ';
}

function calculate(){
    prevValue = Number(prevValue);
    currValue = Number(currValue);

    if(operator === "+"){
        prevValue += currValue;
    } else if(operator === "-"){
        prevValue -= currValue;
    } else if(operator === "x"){
        prevValue *= currValue;
    } else{
        prevValue /= currValue;
    };

    prevValue = round(prevValue);
    prevValue = prevValue.toString();
    currValue = currValue.toString();
}

function round(num) {
    return Math.round(num * 1000) / 1000;
}

function addDecimal() {
    if(!currValue.includes(".")){
        currValue += '.';
    }
}