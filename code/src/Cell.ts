import {game_state, ctx} from "./setup_game.js"

export class Cell{
    static width = 20;
    static height = 20;
    static cells = [];
    static alive_cells = [];
    static set_to_alive_cells = [];
    static set_to_dead_cells = [];
    static checked = [];
    public i_column;
    public i_row;
    private alive;
    private fill_color;
    private neighbour_cells;
    private set_to_alive;    
    constructor(private x, private y){
        this.x = x;
        this.y = y;
        this.fill_color = "white"
        this.alive = false;
        this.i_column = x / Cell.width;
        this.i_row = y / Cell.height;
        this.neighbour_cells = [];
        this.set_to_alive = false;
    }

    get_neighbour_cells(){
        
        for(let i = this.i_row - 1; i < this.i_row + 2; i++){

            if(i < 0) continue; 
            if(i > game_state.rows - 1) break;
            for(let j = this.i_column - 1; j < this.i_column + 2; j++){

                if((j === this.i_column && i === this.i_row) || j < 0) continue;
                if(j > game_state.columns - 1) break;
                
                let neigbour_cell = Cell.cells[i][j];
                this.neighbour_cells.push(neigbour_cell);
            }
        }
    }

    check_neighbour_cells(){
        if(!Cell.checked.some(cell => cell === this)){
            this.neighbour_cells = [];
            this.get_neighbour_cells();
            let count = 0;
            for(let cell of this.neighbour_cells){
                if(cell.alive) count++
            }
            if(this.alive){
                if(count <= 1 || count >= 4) Cell.set_to_dead_cells.push(this);
                else Cell.set_to_alive_cells.push(this);
            } //If the cell is to die.
            else{
                if(count === 3) Cell.set_to_alive_cells.push(this);
                else Cell.set_to_dead_cells.push(this); // if the cell is to be alive the next itteration.   
            }
            Cell.checked.push(this);
        }
    }

    draw(this, ctx){
        ctx.beginPath();
        ctx.strokeStyle = "black"
        this.fill_color = this.alive ? "green": "white";        
        ctx.fillStyle = this.fill_color;
        ctx.fillRect(this.x, this.y, Cell.width, Cell.height);
        ctx.strokeRect(this.x, this.y, Cell.width, Cell.height);
    }
}