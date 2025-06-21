import { Cell } from "./Cell.js";
let canvas = document.getElementById('canvas');
export let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
export function construct_cells() {
    for (let j = 0; j < canvas.height / Cell.height; j++) {
        Cell.cells[j] = new Array;
        for (let i = 0; i < canvas.width / Cell.width; i++) {
            Cell.cells[j][i] = new Cell(i * Cell.width, j * Cell.height);
        }
    }
}
export const game_state = {
    ctx: ctx,
    rows: ctx.canvas.height / Cell.height,
    columns: ctx.canvas.width / Cell.width,
    itteration_time: 200,
};
