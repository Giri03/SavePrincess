import { Cell } from './cell';

/**
 * A 2-dimensional maze generated
 */
export class Grid {
    public readonly cells: Array<Array<Cell>> = [];
    private readonly cellBackground = '#FFFFFF';

    /**
     * Create a maze with <row> &times; <col> cells.
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

        // generate maze
        const current = this.cells[RandomNumber.within(this.nRow)][
            RandomNumber.within(this.nCol)
        ];
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

    
}

class RandomNumber {
    static within(n: number): number {
        return Math.floor(Math.random() * n);
    }
}