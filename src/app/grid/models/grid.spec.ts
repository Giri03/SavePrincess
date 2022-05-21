import { Cell } from './cell';
import { Grid } from './grid';

describe('Grid', () => {
  let cell: Cell;
  let grid: Grid;
  let canvas, ctx;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    cell = new Cell(5, 5);
    grid = new Grid(10, 10, 20, ctx);
  });

  it('should create', () => {
    expect(grid).toBeTruthy();
  });
});
