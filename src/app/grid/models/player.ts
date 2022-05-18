import { Cell } from './cell';

export class Player {

    /**
     * Create a maze with <row> &times; <col> cells.
     * @param 
     * @param nRow number of rows
     * @param nCol number of columns
     */
    constructor(
        public nRow: number,
        public nCol: number,
        public cellSize: number,
        public cell: Cell,
        public ctx: CanvasRenderingContext2D
    ) {
    }

    drawPlayer(cell: Cell, color = '#4080ff', lineThickness = 8) {
        if (cell.row >= 0 && cell.row < this.nRow && cell.col >= 0 && cell.col < this.nCol) {
            this.ctx.lineWidth = lineThickness;
            this.ctx.strokeStyle = color;
            this.ctx.beginPath();
            this.ctx.moveTo((cell.col) * this.cellSize, (cell.row) * this.cellSize);
            this.ctx.lineTo((cell.col + 1) * this.cellSize, (cell.row + 1) * this.cellSize);
            this.ctx.stroke();
        }
    }
}