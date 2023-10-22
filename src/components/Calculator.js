import React from 'react';
import './Calculator.css'
import data from '../data/data'
import Button from './Button';

export default function Calculator() {
const buttons = data.map( button => (
<Button keys={button.id} value={button.value} span={button.span}
        handleClick={() => {updateCalculation(button.value)}}/>
))
const [calculation, setCalculation] = React.useState('');
const [lastNum, setLastNum] = React.useState('');

function multiplyDivide(match, n1, op, n2) {
    n1 = Number(n1);    n2 = Number(n2);
    return (op === 'x' ? n1 * n2 : n1 / n2).toString();
}
function addSubtract(match, n1, op, n2){
    n1 = Number(n1); n2 = Number(n2); 
    return (op==='+'? n1 + n2: n1 - n2).toString();
}
function compute(){
    let result = calculation.split(' ').join('');
    let regex = /(-?\d+(?:\.\d+)?)([x/])(-?\d+(?:\.\d+)?)/g;
    
    result = result.replace(regex, multiplyDivide)
    regex = /(-?\d+(?:\.\d+)?)([+-])(-?\d+(?:\.\d+)?)/g;

    while (regex.test(result)) {
        result = result.replace(regex, addSubtract); console.log(result)
    }
    return result
}

function addCharacter(calc, val){
    let calcArr = calc? calc.split(' ') : [];
    if (calcArr.length >= 15) {return 'DIGIT LIMIT MET'} 
    calcArr.push(val)
    return calcArr.join(' ')
}

function checkForm(val){
    if (!lastNum){
        if (['+','x','/'].includes(val)){ console.log("Starting with operator"); return false}
        else if (val === '.'){
            console.log("Starting with dot");
            setCalculation(prevCalculation => addCharacter(prevCalculation, 0));
            return true;
        }
    }
    else if (lastNum === '0' && val === 0){
        console.log("Starting with 0 and adding another 0");
        return false;
    }
    if (lastNum.includes('.') && val === '.'){
        console.log("Trying to add two dots");
        return false;
    }
    if (calculation === 'DIGIT LIMIT MET'){
        setCalculation(''); setLastNum(''); return false;}
    return true
}

function updateCalculation(val){
    if (typeof(val) ==='number' || val === '.'){
        setLastNum(prevLastNum => addCharacter(prevLastNum, val))
    } else {setLastNum('')}
    switch(val){
        case 'AC': setCalculation(''); break;
        case '=': setLastNum(compute()); setCalculation(compute()); break;
        default: 
        if (checkForm(val)) {
            setCalculation(prevCalculation => addCharacter(prevCalculation, val));
        }
        break;
    }
}
return (
    <div className='rounded tot-div'>
        <div className='screen rounded'
        id="display">
            <p className='full-calc'>{calculation}</p>
            <p>{lastNum}</p></div>
        <div className='calc-div'>
            {buttons}
        </div>
    </div>
  );
}



// const regex = /(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)/;

// while (regex.test(expression)) {
//   expression = expression.replace(regex, (match, n1, op, n2) => {
//     n1 = Number(n1);    n2 = Number(n2);
//     let result = match;
//     switch (op) {
//       case '*':
//         result = n1 * n2; break;
//       case '/':
//         result = n1 / n2; break;
//       case '+':
//         result = n1 + n2; break;
//       case '-':
//         result = n1 - n2;  break;
//       default: break;
//     }
//     return result.toString();
//   });
// }