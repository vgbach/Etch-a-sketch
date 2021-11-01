const htmlBody = document.getElementById("body");
const BOXSIZE = 600;
const buttonColor = document.querySelector("#color");

function compareArray(arrayA,arrayB) {
    for (let i = 0; i < arrayA.length; i++) {
        if (arrayA[i]!==arrayB[i]) {
            return false;
        }
    }
    return true;
}

function drawBoard(quantityBox) {
    if (document.contains(document.getElementById("board"))) {
        document.getElementById("board").remove();
    }
    const board =  document.createElement("div");
    board.setAttribute("id","board");
    board.style.cssText = `display:flex; width: ${BOXSIZE}px; height: ${BOXSIZE}px; flex-wrap: wrap; border: 1px solid grey;`
    let divHolder = "";
    for (let i=0; i<(quantityBox**2); i++) {
        divHolder += `<div class='tile' style='width:${BOXSIZE/quantityBox}px;height:${BOXSIZE/quantityBox}px;'></div>`;
    }
    board.innerHTML = divHolder;
    htmlBody.appendChild(board);
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => tile.addEventListener("mouseenter", function(e) {
    switch(buttonColor.textContent) {
        case "Random Color":
            this.style.backgroundColor = getRandomColor();
            break;
        case "Black and White":
            this.style.backgroundColor = "black";
            break;
        case "Gradient Fluctuation":
            this.style.backgroundColor = getGradientFluctuation();
            break;
    }
    }));    
};

function getRandomColor() {
    let a = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    let c = Math.floor(Math.random() * 256)
    return `rgb(${a},${b},${c})`
  }

function getRamdomRgbArray() {
    return [Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256)];
}

const NUMBEROFGRADIENT = 10; //number of steps until the desired color is reached
let gradientAscent = true;
colorStart = getRamdomRgbArray();
colorEnd = [255,255,255];
colorCurrent = colorStart.slice();


function getGradientFluctuation() {
    if (compareArray(colorCurrent,colorEnd)) {
        colorStart = colorCurrent.slice();
        if (gradientAscent) {
            colorEnd = (compareArray(colorEnd,[255,255,255])) ? getRamdomRgbArray() : [255,255,255];
            gradientAscent = compareArray(colorEnd,[255,255,255]) ? true : false;
        } else {
            colorEnd = compareArray(colorEnd,[0,0,0]) ? getRamdomRgbArray():[0,0,0];
            gradientAscent = compareArray(colorEnd,[0,0,0]) ? false : true;
        }
    }
    const stepMultiplier = (gradientAscent) ? 1 : -1 ;
    colorCurrent.forEach(function(item, index) {
        let step = Math.round(Math.abs(colorEnd[index]-colorStart[index])/NUMBEROFGRADIENT)*stepMultiplier;
        step = (step === 0) ? 1*stepMultiplier : step;
        if (Math.abs(colorEnd[index]-item) <= Math.abs(step)) {
            colorCurrent[index] = colorEnd[index];
        } else {
            colorCurrent[index] += step;
        }
    })
    return `rgb(${colorCurrent[0]},${colorCurrent[1]},${colorCurrent[2]})`
}

buttonColor.addEventListener("click", () => {
    if (buttonColor.textContent === "Black and White") {
        buttonColor.textContent = "Random Color";
    } else if (buttonColor.textContent === "Random Color") {
        buttonColor.textContent = "Gradient Fluctuation";
    } else {
        buttonColor.textContent = "Black and White";  
    }
});

drawBoard(16);

const buttonReset = document.querySelector("#reset");
buttonReset.addEventListener("click", () => {
    let quantityBox = prompt("What's the number of tiles? (maximum 100 tiles)");
    while (!(0< Number(quantityBox) && Number(quantityBox) <=100) && quantityBox !== null) {
        quantityBox = prompt("Invalid input, try again (a number between 1 and 100)");
    }
    if (quantityBox !== null) {
    drawBoard(quantityBox);
    }
});