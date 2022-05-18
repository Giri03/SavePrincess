import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Cell } from './models/cell';
import { Grid } from './models/grid';
import { Player } from './models/player';
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
  row = 10;
  col = 10;
  cellSize = 25;
  player: Player;
  currentPlayerposition: Cell;
  // cell size
  // board = new recta();
  // private maze: Maze;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('maze');
    this.ctx = this.canvas.getContext('2d');
    this.drawMaze();
  }

  drawMaze() {
    this.grid = new Grid(this.row, this.col, this.cellSize, this.ctx);
    this.canvas.width = this.col * this.cellSize;
    this.canvas.height = this.row * this.cellSize;
    this.grid.draw();
    this.currentPlayerposition = this.grid.cells[0][0];
    this.player = new Player(this.row, this.col, this.cellSize, this.currentPlayerposition, this.ctx);
    this.player.drawPlayer(this.currentPlayerposition);
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
    this.currentPlayerposition = nextCell;
    this.player.drawPlayer(this.currentPlayerposition);
  }




}
