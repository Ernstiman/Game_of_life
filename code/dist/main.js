import { construct_cells, game_state } from "./setup_game.js";
import { draw_cells } from "./draw.js";
import { Cell } from "./Cell.js";
construct_cells();
draw_cells();
addEventListener("click", (e) => {
    const mouse_x = e.offsetX;
    const mouse_y = e.offsetY;
    if (mouse_x <= game_state.ctx.canvas.width &&
        mouse_y <= game_state.ctx.canvas.height) {
        let clicked_cell = Cell.cells[Math.floor(mouse_y / Cell.width)][Math.floor(mouse_x / Cell.width)];
        if (!Cell.alive_cells.some(cell => cell === clicked_cell))
            Cell.alive_cells.push(clicked_cell); // Checks if the clicked cell already is in the array.
        clicked_cell.alive = true;
        draw_cells();
    }
});
addEventListener("keydown", (e) => {
    if (e.key === " ") {
        game_loop();
    }
});
function game_loop() {
    draw_cells();
    for (let cell of Cell.alive_cells) {
        cell.check_neighbour_cells();
        for (let neigbour_cell of cell.neighbour_cells) {
            neigbour_cell.check_neighbour_cells();
        }
    }
    for (let cell of Cell.set_to_alive_cells) {
        cell.alive = true;
    }
    for (let cell of Cell.set_to_dead_cells) {
        cell.alive = false;
    }
    Cell.alive_cells = Cell.set_to_alive_cells;
    Cell.set_to_alive_cells = [];
    Cell.set_to_dead_cells = [];
    setTimeout(game_loop, game_state.itteration_time);
}
