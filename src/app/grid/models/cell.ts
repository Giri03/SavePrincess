export class Cell {

    /**
   * Create a cell in a maze.
   * @param row rowID of the cell in a maze. integer, row>=0
   * @param col colID of the cell in a maze. integer, col>=0
   */
    constructor(
        public readonly row: number = 0,
        public readonly col: number = 0,
        public isPrincess: boolean = false,
        public isPlayer: boolean = false
    ) { }

    draw(
        ctx: CanvasRenderingContext2D,
        length: number,
        cellBackground = '#FFFFFF'
    ) {
        ctx.fillStyle = cellBackground;
        ctx.fillRect(
            this.col * length,
            this.row * length,
            (this.col + 1) * length,
            (this.row + 1) * length
        );
        ctx.beginPath();
        ctx.moveTo(this.col * length, this.row * length);
        ctx.lineTo((this.col + 1) * length, this.row * length);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo((this.col + 1) * length, this.row * length);
        ctx.lineTo((this.col + 1) * length, (this.row + 1) * length);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo((this.col + 1) * length, (this.row + 1) * length);
        ctx.lineTo(this.col * length, (this.row + 1) * length);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.col * length, (this.row + 1) * length);
        ctx.lineTo(this.col * length, this.row * length);
        ctx.stroke();
    }


}