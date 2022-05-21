import { Cell } from './cell';
import { AppConstants } from 'src/app/app.constants';

/**
 * A 2D grid generated
 */
export class Grid {
  public readonly cells: Array<Array<Cell>> = [];
  private readonly cellBackground = AppConstants.white;

  /**
   * Create a grid with <row> &times; <col> cells.
   * @param nRow number of rows
   * @param nCol number of columns
   * @param cellSize size of each cell
   * @param ctx
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

  /** Call draw for each cell in 2d grid */
  draw(lineThickness = AppConstants.lineThickness_2) {
    this.ctx.lineWidth = lineThickness;
    this.cells.forEach((x) =>
      x.forEach((c) => {
        c.draw(this.ctx, this.cellSize, this.cellBackground);
      })
    );
    this.ctx.save();
    this.ctx.restore();
  }

  /** Place num princess randomly within limits of grid
   * @param num no of princess
   */
  placePrincess(num) {
    while (num > 0) {
      const { x1, y1 } = {
        x1: RandomNumber.within(this.nRow),
        y1: RandomNumber.within(this.nCol),
      };
      const { x, y } = this.findCenterofGrid();
      /** Do not place it on center of grid as prince player is already there */
      if (!(x == x && y1 == y)) {
        const current = this.cells[x1][y1];
        this.drawPrincess(current);
        num--;
      }
    }
  }

  /** Draw Player
   * @param cell Cell type in whihc player is to drawn
   * @param isPlayer boolean if prince player is there
   * @param color color of player
   * @param lineThickness number
   */
  drawPlayer(
    cell: Cell,
    isPlayer = false,
    color = AppConstants.priceColor,
    lineThickness = AppConstants.lineThickness_8
  ) {
    if (
      cell.row >= 0 &&
      cell.row < this.nRow &&
      cell.col >= 0 &&
      cell.col < this.nCol
    ) {
      if (isPlayer) {
        cell.isPlayer = true;
        cell.isPrincess = false;
      } else {
        cell.isPlayer = false;
      }
      this.ctx.lineWidth = lineThickness;
      this.ctx.strokeStyle = color;
      this.ctx.beginPath();
      this.ctx.moveTo(
        (cell.col + 0.25) * this.cellSize,
        (cell.row + 0.25) * this.cellSize
      );
      this.ctx.lineTo(
        (cell.col + 0.75) * this.cellSize,
        (cell.row + 0.75) * this.cellSize
      );
      this.ctx.stroke();
    }
  }

  /** Draw Player
   * @param cell Cell type in whihc player is to drawn
   * @param color color of player
   * @param lineThickness number
   */
  drawPrincess(
    cell: Cell,
    color = AppConstants.princessColor,
    lineThickness = AppConstants.lineThickness_8
  ) {
    cell.isPrincess = true;
    this.ctx.lineWidth = lineThickness;
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(
      (cell.col + 0.25) * this.cellSize,
      (cell.row + 0.25) * this.cellSize
    );
    this.ctx.lineTo(
      (cell.col + 0.75) * this.cellSize,
      (cell.row + 0.75) * this.cellSize
    );
    this.ctx.stroke();
  }

  findCenterofGrid() {
    return { x: Math.floor(this.nRow / 2), y: Math.floor(this.nCol / 2) };
  }
}

class RandomNumber {
  static within(n: number): number {
    return Math.floor(Math.random() * n);
  }
}
