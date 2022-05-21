import { Cell } from './cell';

describe('Cell', () => {
  let cell: Cell;
  beforeEach(() => {
    cell = new Cell(5, 5);
  });

  it('should create', () => {
    expect(cell).toBeTruthy();
  });
});
