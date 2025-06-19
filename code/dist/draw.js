import { Cell } from "./Cell.js";
export function draw_cells() {
    for (let cell_arr of Cell.cells) {
        for (let cell of cell_arr) {
            cell.draw();
        }
    }
}
