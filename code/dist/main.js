import { construct_cells } from "./setup_game.js";
import { draw_cells } from "./draw.js";
import { Cell } from "./Cell.js";
construct_cells();
draw_cells();
addEventListener("click", (e) => {
    console.log(Cell.alive_cells);
    const mouse_x = Math.floor(e.offsetX / Cell.width);
    const mouse_y = Math.floor(e.offsetY / Cell.height);
    const clicked_cell = Cell.cells[mouse_y][mouse_x];
    clicked_cell.click_on_function();
    draw_cells();
});
addEventListener("keydown", (e) => {
    if (e.key === " ") {
        game_loop();
    }
});
function game_loop() {
    console.log(Cell.alive_cells);
    draw_cells();
    for (let cell of Cell.alive_cells) {
        cell.check_neighbour_cells();
    }
    for (let cell of Cell.new_alive_cells) {
        cell.alive = true;
    }
    Cell.alive_cells = Cell.new_alive_cells;
    Cell.new_alive_cells = [];
    setTimeout(game_loop, 1000);
}
