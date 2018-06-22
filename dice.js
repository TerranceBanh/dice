'use strict'

//Select Elements
const diceBox = document.getElementById('diceBox');
const total   = document.getElementById('total');
const dieSize = document.getElementsByClassName('die-size');

//Dice Variables
const genNum = () => {return Math.floor((Math.random() * 6));}; //Dice Roll Formula
const dieNum = [
    [ 1, '&#9856;' ], //Die Face 1
    [ 2, '&#9857;' ], //Die Face 2
    [ 3, '&#9858;' ], //Die Face 3
    [ 4, '&#9859;' ], //Die Face 4
    [ 5, '&#9860;' ], //Die Face 5
    [ 6, '&#9861;' ]  //Die Face 6
]; //Die Numbers
let varTotal    =  0;
let dieArray    = [];
let dieArrayNum = [];

//CSS Variables
const baseDieWidth  = 100;
const baseFontSize  = 200;
let dieWidthDivider = 0  ;
let iteratePoint    = 0  ;
let iteratePoint2   = 0  ;

//Console Log
let onOff = true;
let cssStats = false;
let diceStats = true;
let logsDieArrayNum      = () => {return `Die Values: ${dieArrayNum}`;};
let logsDiceBox          = () => {return diceBox.innerText;}; //Not in use
let logsTotal            = () => {return `Grand Total: ${varTotal}`;};
let logsIteratePoint     = () => {return `${dieArray.length} > ${iteratePoint} ${dieArray.length > iteratePoint}`;};
let logsIteratePoint2    = () => {return `${dieArray.length} < ${iteratePoint2} ${dieArray.length < iteratePoint2}`;};
let logsDieWidthDivider  = () => {return `Die Divider ${dieWidthDivider}`;};
let logsBoxWidth         = () => {return `Box Width: ${diceBox.childNodes[0].style.width}`;};
let logsFontSize         = () => {return `Font Size: ${diceBox.childNodes[0].style.fontSize}`;};

//Button Functions
let showDice            = () => {
    //Clear Values - values are cleared to prevent unintended doubling of value quantity
    dieArrayNum       = []; //Clear Integer Array
    diceBox.innerHTML = ''; //Clear Dice
    varTotal          =  0; //Reset Total
    
    //Executes the following based one dieArray
    for (let i = 0; i < dieArray.length; i++){
        diceBox.innerHTML += `<div class="die-size">${dieArray[i][1]}</div>` ; //Present dice on to HTML Document
        varTotal          += dieArray[i][0] ; //Add all numberic values and store on variable
        dieArrayNum.push    (dieArray[i][0]); //Stores all values to be presented in console log
    }
    
    if (varTotal === 0) {
        console.log('No Dice');
        total.innerHTML = varTotal;
    }
    
    else {
        total.innerHTML = varTotal; //Presents total amount in HTML Document
        if (onOff && diceStats) {console.log(logsTotal())};      //Presents Total amount in console log
        if (onOff && diceStats) {console.log(logsDieArrayNum())};   //Presents dieArrayNum in console log
    }
}
let diceRolling         = () => {
    for (let i = 0; i < dieArray.length; i++) {
        dieArray[i] = dieNum[genNum()];
    }
}
let diceSmallerCalc     = () => {
    if (dieArray.length > iteratePoint) {
        dieWidthDivider++;
        if (onOff && cssStats) {console.log(logsDieWidthDivider())};
        if (onOff && cssStats) {console.log(`Previous iteration: ` + logsIteratePoint())};
        iteratePoint = Math.pow(dieWidthDivider, 2);
        iteratePoint2 = Math.pow(dieWidthDivider - 1, 2);
        if (onOff && cssStats) {console.log(`Current iteration: ` + logsIteratePoint())};
        
    }
    if (onOff) {console.log(`Iterate Point 1: ${iteratePoint}`)};
}
let diceBiggerCalc      = () => {
    if (dieArray.length === iteratePoint2) {
        dieWidthDivider--;
        if (onOff && cssStats) {console.log(logsDieWidthDivider())};
        if (onOff && cssStats) {console.log(`Previous iteration: ` + logsIteratePoint2())};
        iteratePoint2 = Math.pow(dieWidthDivider - 1, 2);
        iteratePoint = Math.pow(dieWidthDivider, 2);
        if (onOff && cssStats) {console.log(`Current iteration: ` + logsIteratePoint2())};
    }
    if (onOff && cssStats) {console.log(`Iterate Point 2: ${iteratePoint2}`)};    
}
let diceResizeCalcApply = () => {
    if (diceBox.innerHTML === "") {diceBox.innerHTML = '<span class="empty-die">&#9744;</span>';}
    for (let i = 0; i < dieArray.length; i++) {
        diceBox.childNodes[i].style.width = `${baseDieWidth/dieWidthDivider}%`;
        
    }
    for (let i = 0; i < dieArray.length; i++) {
        diceBox.childNodes[i].style.fontSize = `${baseFontSize/dieWidthDivider}px`;
    }
        if (onOff && cssStats) {console.log(logsBoxWidth())};
        if (onOff && cssStats) {console.log(logsFontSize())};
}

//Buttons
let dieAdd    = () => {
    console.log('');

    console.log('Add Die');
    dieArray.push(dieNum[genNum()]);
    showDice();
    diceSmallerCalc();
    diceResizeCalcApply();
    
    console.log('');
};
let dieMinus  = () => {
    console.log('');
    
    if (varTotal !== 0) {console.log('Remove Die');}
    dieArray.pop();
    showDice();
    diceBiggerCalc();
    diceResizeCalcApply();
    
    console.log('');
};
let diceRoll  = () => {
    console.log('');
    
    if (dieArray.length === 1) {console.log('Roll Die');}
    else if (dieArray.length > 1) {console.log('Roll Dice');}
    diceRolling();
    showDice();
    diceResizeCalcApply();
    
    console.log('');
};