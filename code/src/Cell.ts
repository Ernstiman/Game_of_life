import {ctx} from "./setup_game.js"

export class Cell{
    static width = 20;
    static height = 20;
    static cells = [];
    static alive_cells = [];
    static new_alive_cells = [];
    fill_color = "white"
    public alive;
    public i_column;
    public i_row;
    public checked;
    public set_to_alive;
    constructor(private x, private y){
        this.x = x;
        this.y = y;
        this.fill_color = "white"
        this.alive = false;
        this.i_column = x / Cell.width;
        this.i_row = x / Cell.height;
        this.checked = false;
        this.set_to_alive = false;
    }

    count_neighbours(this){
        this.checked = true;
        let count = 0
        for(let i = this.i_row - 1; i < this.i_row + 2; i++){
            
            if(i < 0)i++;
            if(i > Cell.cells.length) break;

            for(let j = this.i_column - 1; j < this.i_column + 2; j++){
                console.log("hej")
                if(j < 0) continue;
                if(j > Cell.cells[0].length) break;
                let neighbour_cell = Cell.cells[i][j];
                if(neighbour_cell.alive) count ++
            }
        }
        return count;
    }

    check_neighbour_cells(this){
        let count = this.count_neighbours();
        for(let i = this.i_row - 1; i < this.i_row + 2; i++){
            if(i < 0) i++
            if(i > Cell.cells.length) break
            for(let j = this.i_column - 1; j < this.i_column + 2; j++){
                if (j = this.i_column || j < 0) continue;
                if (j > Cell.cells[0].length) break;
                let neighbour_cell = Cell.cells[i][j];
                if(neighbour_cell.count_neighbours > 1 && neighbour_cell.count_neighbours < 4 && !Cell.in_arr(neighbour_cell.i_row, neighbour_cell.i_column)){
                    Cell.new_alive_cells.push(neighbour_cell);
                } 
            }
        }
        if(!(count <= 1 || count >= 4)){
            Cell.new_alive_cells.push(this);
        }
        else{
            this.alive = false;
        }

    }

    click_on_function(this, mouse_x, mouse_y){
        this.alive = true;
        Cell.alive_cells.push(Cell.cells[this.i_row][this.i_column])
        console.log(this.count_neighbours())
    }

    draw(this){
        ctx.beginPath();
        // ctx.fillRect(this.x, this.y, Cell.height, Cell.width);
        ctx.strokeStyle = "black"
        this.fill_color = this.alive ? "green": "white";
        
        ctx.fillStyle = this.fill_color;
        ctx.fillRect(this.x, this.y, Cell.width, Cell.height);
        ctx.strokeRect(this.x, this.y, Cell.width, Cell.height);
    }

    static in_arr(row, col){
        for(let i = 0; i < Cell.new_alive_cells.length; i++){
            if(Cell.new_alive_cells[i].i_column === col && Cell.new_alive_cells[i].i_row === row){
                return true
            }
        }
        return false;
    }
}