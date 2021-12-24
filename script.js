/* ------------------ ETCH-A-SKETCH PROJECT ---------------------------
        HOW IT WORKS:
            1) Builds an initial grid (16x16) w/ an inherit black cursor
            2) Adds drawing/erasing functionality to each button 
            3) Adds Slider functionality to set size of grid (ie cursor size when drawing)
*/

//Global variables to reference HTML elements
const container = document.querySelector(`.container`);
const clearButton = document.querySelector(".clear-board");
const eraserButton = document.querySelector(".eraser");
const blackButton = document.querySelector(".black");
const colorButton = document.querySelector(".color");
const incremButton = document.querySelector(".increment");
const buttonContainer = document.querySelectorAll(`button`);
const slider = document.getElementById("myRange");
const size = document.getElementById("size");

//Sets initial slider value and displays grid size; keeps track of the grid size value
slider.value = 16;
slider.oninput = function () {
    size.innerHTML = `${this.value} x ${this.value}`;
}
let gridSize = slider.value;

//Helper functions for each button when pressed; calls upon specific drawing/erasing effect and 'selects' each button (see below)
let eraser = (e) => {
    draw("white");
    triggerButton(e);
}
let blackPrint = (e) => {
    draw();
    triggerButton(e);
}
let colorPrint = (e) => {
    draw("color");
    triggerButton(e);
}
let incremPrint = (e) => {
    draw("increm");
    triggerButton(e);
}

//Button 'selected' effect
let triggerButton = (e) => {
    let currentButton = e.target;
    for(let i=0; i<buttonContainer.length;i++){
        if(buttonContainer[i] !== currentButton){
            buttonContainer[i].classList.remove(`active`);
        }
        else buttonContainer[i].classList.add(`active`);
    }
}

/* Effect for each Button:
        1) colorEffect => Adds a random color to cursor
        2) shadeEffect => Adds black color to cursor
        3) whitenEffect => Adds white color to cursor (essentially 'erases' other colors)
        4) incremEffect => Adds shade of black that gets 10% darker each cell
*/

let colorEffect = (e) => {
    e.preventDefault();
    container.addEventListener("mouseover", colorEffect);
    if(e.target.className === "cell"){
        e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        e.target.style.filter=`brightness(100%)`;
   }
}
let shadeEffect = (e) => {
    e.preventDefault();
    container.addEventListener("mouseover", shadeEffect);
    if(e.target.className === "cell"){
        e.target.style.filter=`brightness(0%)`;
   }
}
let whitenEffect = (e) => {
    e.preventDefault();
    container.addEventListener("mouseover", whitenEffect);
    if(e.target.className === "cell"){
        e.target.style.backgroundColor = "white";
        e.target.style.filter=`brightness(100%)`;
   }
}
let incremEffect = (e) => {
    e.preventDefault();
    container.addEventListener("mouseover", incremEffect);
    let brightness = "";    
    let string = e.target.style.filter;
        //get brightness level as string
    for(let i=0;i<string.length;i++){
        if(!isNaN(string[i])){
            brightness+=string[i];
        }
    }

    if(e.target.className === "cell"){
        e.target.style.filter=`brightness(${brightness - 10}%)`;
    }
}

//remove all effects (for mouse up)
let removeEffect = () => {
    container.removeEventListener("mouseover", shadeEffect);
    container.removeEventListener("mouseover", whitenEffect);
    container.removeEventListener("mouseover", incremEffect);
    container.removeEventListener("mouseover", colorEffect);
}

//Depending on (above), terminates any other effect and uses current effect
let draw = (shade = "default") => {
    container.removeEventListener("mousedown", incremEffect);
    container.removeEventListener("mousedown", colorEffect);
    container.removeEventListener("mousedown", whitenEffect);
    container.removeEventListener("mousedown", shadeEffect);
    if(shade === "default"){
        container.addEventListener("mousedown", shadeEffect);
        container.addEventListener("mouseup", removeEffect);
    }
    else if(shade === "white") {
        container.addEventListener("mousedown", whitenEffect);
        container.addEventListener("mouseup", removeEffect);
    }
    else if(shade === "color"){
        container.addEventListener("mousedown", colorEffect);
        container.addEventListener("mouseup", removeEffect);
    }
    else if(shade === "increm"){
        container.addEventListener("mousedown", incremEffect);
        container.addEventListener("mouseup", removeEffect);
    }
}

//Sets grid based on gridSize; makes sure each cell is same 1fr size relative to container size
let grid = (gridParam) => {
    container.style.gridTemplateColumns = `repeat(${gridParam}, minmax(0,1fr))`;
    container.style.gridTemplateRows = `repeat(${gridParam}, minmax(0,1fr))`;
    for(let size = 0; size < gridParam**2; size++){
        let cell = document.createElement("div");
        container.appendChild(cell).className = "cell";
    }
    /*
    let children = container.children;
    for(let j=0;j<children.length;j++){
        children[j].style.filter = `brightness(100%)`;
    }*/
    clear();
}

//clears all effects from board
let clear = () => {
    let cell = document.getElementsByClassName("cell");
    for(let i = 0; i < cell.length; i++){
        cell[i].style.backgroundColor = "white";
        cell[i].style.filter=`brightness(100%)`;
    }
}

//Implements new grid depending on new grid size
let resetBoard = (e) => {
    let newGrid = e.target.value;
    deleteBoard(container);
    grid(newGrid);
}

//Deletes current board to implement (above)
let deleteBoard = (parent) => {
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

//ACTIVE functions
grid(gridSize);
draw();
clearButton.addEventListener("click", clear);
eraserButton.addEventListener("click", eraser);
blackButton.addEventListener("click", blackPrint);
colorButton.addEventListener("click", colorPrint);
incremButton.addEventListener("click", incremPrint);
slider.addEventListener("mousedown", clear);
slider.addEventListener("mouseup", resetBoard);
