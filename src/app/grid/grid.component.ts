import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cell } from './models/cell';
import { Grid } from './models/grid';
import { keyboardMap } from './models/keyboard-map';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterViewInit, OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'CawStudioGame';
  grid: Grid;
  row = 6;
  col = 6;
  cellSize = 25;
  currentPlayerposition: Cell;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  noOfSteps;
  public princessCount: BehaviorSubject<Number> = new BehaviorSubject(0);

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('maze');
    this.ctx = this.canvas.getContext('2d');
    this.drawMaze();

    this.princessCount.subscribe((count) => {
      if (count === 0) {
        alert('You saved the Princess!!')
      }
    })
  }

  drawMaze() {
    this.grid = new Grid(this.row, this.col, this.cellSize, this.ctx);
    this.canvas.width = this.col * this.cellSize;
    this.canvas.height = this.row * this.cellSize;
    this.grid.draw();
    this.initiatePlayer();
    this.initiatePrincess();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const direction = keyboardMap[event.key];
    if (direction) this.move(direction);
  }

  move(direction: 'Left' | 'Right' | 'Up' | 'Down') {
    let nextCell: Cell;
    if (direction === 'Left') {
      if (this.currentPlayerposition.col < 1) return;
      nextCell = this.grid.cells[this.currentPlayerposition.row][
        this.currentPlayerposition.col - 1
      ];
    }
    if (direction === 'Right') {
      if (this.currentPlayerposition.col + 1 >= this.col) return;
      nextCell = this.grid.cells[this.currentPlayerposition.row][
        this.currentPlayerposition.col + 1
      ];
    }
    if (direction === 'Up') {
      if (this.currentPlayerposition.row < 1) return;
      nextCell = this.grid.cells[this.currentPlayerposition.row - 1][
        this.currentPlayerposition.col
      ];
    }
    if (direction === 'Down') {
      if (this.currentPlayerposition.row + 1 >= this.row) return;
      nextCell = this.grid.cells[this.currentPlayerposition.row + 1][
        this.currentPlayerposition.col
      ];
    }
    this.noOfSteps++;
    this.grid.drawPlayer(this.currentPlayerposition, false, '#FFFFFF');
    this.currentPlayerposition = nextCell;
    this.grid.drawPlayer(this.currentPlayerposition, true);
    this.princessCountTrack();
  }

  initiatePlayer() {
    const { x, y } = this.findCenterofGrid();
    this.currentPlayerposition = this.grid.cells[x][y];
    this.grid.drawPlayer(this.currentPlayerposition);
  }

  initiatePrincess() {
    const no_princess = Math.floor((this.row + this.col) / 2);
    this.grid.placePrincess(no_princess);
  }

  findCenterofGrid() {
    return { x: Math.floor(this.row / 2), y: Math.floor(this.col / 2) };
  }

  princessCountTrack() {
    let count = 0;
    this.grid.cells.map(cells => {
      count += cells.filter(cell => cell.isPrincess).length;
    });
    this.princessCount.next(count);
  }


}
