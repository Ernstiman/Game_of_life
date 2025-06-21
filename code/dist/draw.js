import { Cell } from "./Cell.js";
import { game_state } from "./setup_game.js";
export function draw_cells() {
    for (let cell_arr of Cell.cells) {
        for (let cell of cell_arr) {
            cell.draw(game_state.ctx);
        }
    }
}
