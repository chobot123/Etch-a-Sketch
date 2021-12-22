/*Initial Global Variables :
            1) container selects the 'container' div class in HTML
            2) clearButton selects the button class 'clear-board' in HTML
            3) eraserButton selects the button class 'eraser' in HTML
            4) slider selects the slider range element in HTML
            5) size selects the <p> element, sibling to (4) in HTML 
*/
const container = document.querySelector(`.container`);
const clearButton = document.querySelector(".clear-board");
const eraserButton = document.querySelector(".eraser");
const blackButton = document.querySelector(".black");
const slider = document.getElementById("myRange");
const size = document.getElementById("size");

/*Intial Grid Size: 
            1) I made the intial grid size be 16 x 16 by selecting an initial slider value
            2) I made a variable gridSize for the functions below to use as a parameter
            3) I made the internal HTML of size change in according to (1) to display current grid size
*/
slider.value = 16;
slider.oninput = function () {
    size.innerHTML = `${this.value} x ${this.value}`;
}
let gridSize = slider.value;


/* 'grid' utilizes a for loop and stylization to set the max size of each cell to 1fr
    and to have the rows and length of the grid container be gridSize**2
        ie) if gridSize = 16 then it makes a 16x16 grid with 256 total 'cells'
*/
let grid = (gridParam) => {
    container.style.gridTemplateColumns = `repeat(${gridParam}, minmax(0,1fr))`;
    container.style.gridTemplateRows = `repeat(${gridParam}, minmax(0,1fr))`;
    for(let size = 0; size < gridParam**2; size++){
        let cell = document.createElement("div");
        container.appendChild(cell).className = "cell";
    }
}

/* 'draw takes a gridSize value and shade value
    1)I use a for loop to go through each cell and to apply a shadeEffect on 'hover'
    2)I used an if loop to dictate whether it applies a whitening effect or shade effect
        on 'hover'
    3)The function 'eraser' is a parameter for an on-click eraser button to apply a whitening 
        effect via (2)
*/
let draw = (shade = "default") => {
    /*
    let cell = document.getElementsByClassName("cell");

    for(let i = 0; i < gridParam**2; i++){
        if(shade === "default"){
            cell[i].addEventListener("mouseenter", shadeEffect);
        }
        else {(shade === "white")
           cell[i].addEventListener("mouseenter", whitenEffect);} 
    }
    */
   if(shade === "default"){
       console.log("shading");
       container.removeEventListener("mouseover", whitenEffect);
       container.addEventListener("mouseover", shadeEffect);}
   else {
       console.log("whiten")
       container.removeEventListener("mouseover", shadeEffect);
       container.addEventListener("mouseover", whitenEffect);
   }
}
let shadeEffect = (e) => {
    if(e.target.className === "cell"){
        e.target.classList.add("shade");
    }
    console.log(e.target);
}

let logit = (e) => {
    console.log(e.target.className);
}

let whitenEffect = (e) => {
    if(e.target.className == "cell shade"){
        e.target.classList.remove("shade");
    }
    console.log(e.target);
    //eraserButton.removeEventListener("click", eraser, false);
}
let eraser = () => {
    draw("white");
}
let blackPrint = () => {
    draw();
    //blackButton.removeEventListener("click", blackPrint, false);
}

/* 'clear' goes through each cell and resets their color back to 'white'
    We want this to apply when: 
        1) The user clicks the 'clear' button
        2) When the user changes grid size via slider
*/
let clear = () => {
    let cell = document.getElementsByClassName("cell");
    for(let i = 0; i < cell.length; i++){
        cell[i].classList.remove("shade");
    }
}

/* 'resetBoard' resets the board by
    1)getting a new grid size
    2)deleting old board via 'deleteBoard' (removes all children from
        grid container)
    3)initializing new board with (1)
*/
let resetBoard = (e) => {
    let newGrid = e.target.value;
    deleteBoard(container);
    grid(newGrid);
    draw();
}
let deleteBoard = (parent) => {
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

/* 'play' consolidates all functionality:
    1) Initializes beginning grid
    2) Adds functionality to buttons e.g. ('clear' button clears board)
*/

grid(gridSize);
draw();
clearButton.addEventListener("click", clear);
eraserButton.addEventListener("click", eraser);
blackButton.addEventListener("click", blackPrint);
slider.addEventListener("mousedown", clear);
slider.addEventListener("mouseup", resetBoard);
