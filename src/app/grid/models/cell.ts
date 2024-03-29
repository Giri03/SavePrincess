import { AppConstants } from 'src/app/app.constants';
export class Cell {
  /**
   * Create a cell in a maze.
   * @param row rowID of the cell in a grid. integer, row>=0
   * @param col colID of the cell in a grid. integer, col>=0
   */
  constructor(
    public readonly row: number = 0,
    public readonly col: number = 0,
    public isPrincess: boolean = false,
    public isPlayer: boolean = false
  ) {}

  /** Draw a 2d maze with given rows and cols */
  draw(
    ctx: CanvasRenderingContext2D,
    length: number,
    cellBackground = AppConstants.cellBackgroundColor
  ) {
    ctx.fillStyle = cellBackground;
    ctx.fillRect(
      this.col * length,
      this.row * length,
      (this.col + 1) * length,
      (this.row + 1) * length
    );
    /** draw bottom lines */
    ctx.beginPath();
    ctx.moveTo(this.col * length, (this.row + 1) * length);
    ctx.lineTo((this.col + 1) * length, (this.row + 1) * length);
    ctx.stroke();
    /** draw right lines */
    ctx.beginPath();
    ctx.moveTo((this.col + 1) * length, this.row * length);
    ctx.lineTo((this.col + 1) * length, (this.row + 1) * length);
    ctx.stroke();
    if (this.row == 0) {
      /** if first row draw - then draw top lines */
      ctx.beginPath();
      ctx.moveTo(this.col * length, this.row * length);
      ctx.lineTo((this.col + 1) * length, this.row * length);
      ctx.stroke();
    }
    if (this.col == 0) {
      /** if first col draw - then draw left lines */
      ctx.beginPath();
      ctx.moveTo(this.col * length, this.row * length);
      ctx.lineTo(this.col * length, (this.row + 1) * length);
      ctx.stroke();
    }
  }
}
