/* For GRID : Make a function that makes a grid based on inputs ROW and COL
              The grid would be dynamic as we can then manipulate the row and col
              by user inputs (via slider, button, etc.) */


const container = document.querySelector(`.container`);
console.log(container); 

let grid = (row, col) => {
    container.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${col}, 1fr)`;

    for(let size = 0; size < row * col; size++){
        let cell = document.createElement("div");
        cell.innerHTML = size + 1;
        console.log(cell.innerHTML);
        container.appendChild(cell).className = "cell";
    }
}

grid(15, 15);