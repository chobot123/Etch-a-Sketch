//Global variables to reference HTML elements
const grid = document.querySelector(`.container`);
const clearButton = document.querySelector(".clear");
const eraserButton = document.querySelector(".eraser");
const blackButton = document.querySelector(".black");
const colorButton = document.querySelector(".color");
const colorSelector = document.getElementById("color-select");
const incremButton = document.querySelector(".increment");
const hideButton = document.querySelector(".hide-border");
const buttonContainer = document.querySelectorAll(`button`);
const slider = document.getElementById("myRange");
const size = document.getElementById("size-slider");
const cells =  document.getElementsByClassName("cell");

let color = "red";
let mode = "color";
let gridSize = 16;
let pointerActive = false;
let activeElement = colorButton;
activeElement.classList.toggle("active");

//setters
const setColor = (e) => {
    color = e.target.value;
    colorButton.style.backgroundColor = `${color} !important`;
};

const setMode = (e) => {
    setActiveElement(e.target);
    console.log(e.target);
    mode = e.target.className.split(' ')[0];
}

const setActiveElement = (newElement) => {
    //reset current activeElement
    activeElement.classList.toggle("active");

    //set new active
    activeElement = newElement;
    activeElement.classList.toggle("active");
}

const setGridSize = (newGridSize) => {gridSize = newGridSize;}

//Sets grid based on gridSize; makes sure each cell is same 1fr size relative to container size
const createGrid = (gridParam) => {
    grid.style.gridTemplateColumns = `repeat(${gridParam}, minmax(0,1fr))`;
    grid.style.gridTemplateRows = `repeat(${gridParam}, minmax(0,1fr))`;
    for(let size = 0; size < gridParam**2; size++){
        let cell = document.createElement("div");
        cell.addEventListener("mousedown", drawColor);
        cell.addEventListener("mouseover", drawColor);
        grid.appendChild(cell).className = "cell";
    }

}

const updateGrid = (e) => {
    gridSize = e.target.value;
    size.innerHTML = `${gridSize} x ${gridSize}`;
    refreshGrid();
}

const clearGrid = () => grid.innerHTML = '';

const refreshGrid = () => {
    clearGrid();
    createGrid(gridSize);
}

//colors cell
const drawColor = (e) => {
    if(e.type === "mousedown"){
        pointerActive = true;
    }
    if(pointerActive){
        switch(mode) {

            case "black":
                e.target.style.filter = "brightness(100%)";
                e.target.style.backgroundColor = "black";
                break;
            
            case "color":
                e.target.style.filter = "brightness(100%)";
                e.target.style.backgroundColor = color;
                break;
            
            case "eraser":
                e.target.style.filter = "brightness(100%)";
                e.target.style.backgroundColor = "white";
                break;
            case "increment":
                if(e.target.style.filter === ""){
                    e.target.style.filter = "brightness(90%)";
                }else if(e.target.style.filter !== "brightness(0%)"){
                    //brightness(##%).split => ["brightness", "##", ")"][1] = ##
                    const currentBrightness = parseInt(e.target.style.filter.split(/\(([^)]+)\%/)[1]) - 10;
                    e.target.style.filter = `brightness(${currentBrightness}%)`;
                }
                break;
        }
    }
}

const hideBorder = (e) => {
    for(let i = 0; i < cells.length; i++){
        cells.item(i).classList.toggle("hide");
    }
    e.target.classList.toggle("active");

}


createGrid(gridSize);

document.body.addEventListener("mousedown", () => { pointerActive = true; });
document.body.addEventListener("mouseup", () => { pointerActive = false; });
blackButton.addEventListener("click", setMode);
colorButton.addEventListener("click", setMode);
eraserButton.addEventListener("click", setMode);
incremButton.addEventListener("click", setMode);
hideButton.addEventListener("click", hideBorder);
clearButton.addEventListener("click", refreshGrid);
colorSelector.addEventListener("input", setColor);
slider.addEventListener("input", updateGrid)
