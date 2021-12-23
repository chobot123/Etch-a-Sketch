/* ------------------ ETCH-A-SKETCH PROJECT ---------------------------
        HOW IT WORKS:
            1) Builds an initial grid (16x16) w/ an inherit black cursor
            2) Adds drawing/erasing functionality to each button 
            3) Adds Slider functionality to set size of grid (ie cursor size when drawing)
*/

//Global variables to reference HTML elements
const container = document.querySelector(`.container`);
const buttonContainer = document.querySelectorAll(`button`);
const clearButton = document.querySelector(".clear-board");
const eraserButton = document.querySelector(".eraser");
const blackButton = document.querySelector(".black");
const colorButton = document.querySelector(".color");
const incremButton = document.querySelector(".increment")
const slider = document.getElementById("myRange");
const size = document.getElementById("size");

//Sets initial slider value and displays grid size; keeps track of the grid size value
slider.value = 16;
slider.oninput = function () {
    size.innerHTML = `${this.value} x ${this.value}`;
}
let gridSize = slider.value;

//Helper functions for each button when pressed; calls upon specific drawing/erasing effect
let eraser = () => {draw("white");}
let blackPrint = () => {draw();}
let colorPrint = () => {draw("color");}
let incremPrint = () => {draw("increm");}

/* Effect for each Button:
        1) colorEffect => Adds a random color to cursor
        2) shadeEffect => Adds black color to cursor
        3) whitenEffect => Adds white color to cursor (essentially 'erases' other colors)
        4) incremEffect => Adds shade of black that gets 10% darker each cell
*/
let colorEffect = (e) => {
    e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    e.target.style.filter=`brightness(100%)`;
}
let shadeEffect = (e) => {e.target.style.backgroundColor = "black";}
let whitenEffect = (e) => {
    e.target.style.backgroundColor = "white";
    e.target.style.filter=`brightness(100%)`;
}
let incremEffect = (e) => {
        let brightness = "";    
        let string = e.target.style.filter;
        //get brightness level as string
        for(let i=0;i<string.length;i++){
            if(!isNaN(string[i])){
                brightness+=string[i];
            }
        }
        //decrease brightness level by 10%
        e.target.style.filter=`brightness(${brightness - 10}%)`;
}

//Depending on (above), terminates any other effect and uses current effect
let draw = (shade = "default") => {
    container.removeEventListener("mouseover", incremEffect);
    container.removeEventListener("mouseover", colorEffect);
    container.removeEventListener("mouseover", whitenEffect);
    container.removeEventListener("mouseover", shadeEffect);
    if(shade === "default"){
        clear();
        container.addEventListener("mouseover", shadeEffect);
    }
    else if(shade === "white") {
        container.addEventListener("mouseover", whitenEffect);
    }
    else if(shade === "color"){
        container.addEventListener("mouseover", colorEffect);
    }
    else if(shade === "increm"){
        container.addEventListener("mouseover", incremEffect);
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
