class Board {
    constructor(size, grid) {
        this.size = size;
        this.grid = grid;

        this.createGrid;
    }

    setSize(newSize){
        this.size = newSize;
    }

    getGrid(){
        return this.grid;
    }

    createGrid(){
        this.grid.style.gridTemplateColumns = `repeat(${this.size}, minmax(0,1fr))`;
        this.grid.style.gridTemplateRows = `repeat(${this.size}, minmax(0,1fr))`;
        for(let i = 0; i < gridParam**2; i++){
            let cell = document.createElement("div");
            grid.appendChild(cell).className = "cell";
        }
    }

    clearGrid(){
        this.grid.innerHTML = '';
    }

    updateGrid(){
        this.clearGrid;
        this.createGrid;
    }
}

export default Board;