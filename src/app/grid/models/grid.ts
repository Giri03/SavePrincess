import { Cell } from './cell';

/**
 * A 2-dimensional grid generated
 */
export class Grid {
    public readonly cells: Array<Array<Cell>> = [];
    private readonly cellBackground = '#FFFFFF';

    /**
     * Create a grid with <row> &times; <col> cells.
     * @param nRow number of rows
     * @param nCol number of columns
     */
    constructor(
        public nRow: number,
        public nCol: number,
        public cellSize: number,
        public ctx: CanvasRenderingContext2D
    ) {
        // initialize cells
        for (let i = 0; i < nRow; i++) {
            this.cells[i] = [];
            for (let j = 0; j < nCol; j++) {
                this.cells[i][j] = new Cell(i, j);
            }
        }

    }

    draw(lineThickness = 2) {
        this.ctx.lineWidth = lineThickness;
        this.cells.forEach((x) =>
            x.forEach((c) => {
                c.draw(this.ctx, this.cellSize, this.cellBackground);
            })
        );
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.cellBackground;
        this.ctx.moveTo(this.nCol * this.cellSize, (this.nRow) * this.cellSize);
        this.ctx.lineTo(this.nCol * this.cellSize, this.nRow * this.cellSize);
        this.ctx.stroke();
        this.ctx.restore();
    }

    placePrincess(num) {
        while (num > 0) {
            const current = this.cells[RandomNumber.within(this.nRow)][
                RandomNumber.within(this.nCol)
            ];
            this.drawPrincess(current);
            num--;
        }
    }

    drawPlayer(cell: Cell, isPlayer = false, color = '#4080ff', lineThickness = 8) {
        if (cell.row >= 0 && cell.row < this.nRow && cell.col >= 0 && cell.col < this.nCol) {
            if (isPlayer) {
                cell.isPlayer = true;
                cell.isPrincess = false;
            } else {
                cell.isPlayer = false;
            }
            this.ctx.lineWidth = lineThickness;
            this.ctx.strokeStyle = color;
            this.ctx.beginPath();
            this.ctx.moveTo((cell.col + 0.5) * this.cellSize, (cell.row + 0.5) * this.cellSize);
            this.ctx.lineTo((cell.col + 0.75) * this.cellSize, (cell.row + 0.75) * this.cellSize);
            this.ctx.stroke();
        }
    }

    drawPrincess(cell: Cell, color = '#32a850', lineThickness = 8) {
        cell.isPrincess = true;
        this.ctx.lineWidth = lineThickness;
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo((cell.col + 0.5) * this.cellSize, (cell.row + 0.5) * this.cellSize);
        this.ctx.lineTo((cell.col + 0.75) * this.cellSize, (cell.row + 0.75) * this.cellSize);
        this.ctx.stroke();
    }



}

class RandomNumber {
    static within(n: number): number {
        return Math.floor(Math.random() * n);
    }
}
