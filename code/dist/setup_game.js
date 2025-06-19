import { Cell } from "./Cell.js";
let canvas = document.getElementById('canvas');
export let ctx = canvas.getContext('2d');
canvas.height = 300;
canvas.width = 300;
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
    update: false,
    check_cells: false,
};
