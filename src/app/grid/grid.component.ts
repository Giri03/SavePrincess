import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { GridFormDialogComponent } from '../shared/grid-form-dialog/grid-form-dialog.component';
import { NotificationDialogComponent } from '../shared/notification-dialog/notification-dialog.component';
import { Cell } from './models/cell';
import { Grid } from './models/grid';
import { keyboardMap } from './models/keyboard-map';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterViewInit, OnInit {

  private title = 'SavePrincessGame';
  private grid: Grid;
  public row = 0;
  public col = 0;
  private cellSize = 25;
  public currentPlayerposition: Cell;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private noOfSteps = 1;
  public princessCounter: BehaviorSubject<Number> = new BehaviorSubject(0);

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.princessCounter = new BehaviorSubject(0);
    this.noOfSteps = 1;
    this.openDialogToEnterDetails().subscribe((value) => {
      this.row = parseInt(value.row);
      this.col = parseInt(value.col);
      this.startGame();
    });
  }

  ngAfterViewInit() {

  }

  startGame() {
    this.canvas = <HTMLCanvasElement>document.getElementById('maze');
    this.ctx = this.canvas.getContext('2d');
    this.drawMaze();
  }

  drawMaze() {
    if (this.row > 0 && this.col > 0) {
      this.grid = new Grid(this.row, this.col, this.cellSize, this.ctx);
      this.canvas.width = this.col * this.cellSize;
      this.canvas.height = this.row * this.cellSize;
      this.grid.draw();
      this.initiatePlayer();
      this.initiatePrincess();
    }
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
    this.princessCount();
  }

  initiatePlayer() {
    const { x, y } = this.findCenterofGrid();
    this.currentPlayerposition = this.grid.cells[x][y];
    this.grid.drawPlayer(this.currentPlayerposition, true);
  }

  initiatePrincess() {
    const no_princess = Math.floor((this.row + this.col) / 2);
    this.grid.placePrincess(no_princess);
    this.princessCountTrack();
  }

  findCenterofGrid() {
    return { x: Math.floor(this.row / 2), y: Math.floor(this.col / 2) };
  }

  princessCount() {
    let count = 0;
    this.grid.cells.map(cells => {
      count += cells.filter(cell => cell.isPrincess).length;
    });
    this.princessCounter.next(count);
  }

  princessCountTrack() {
    this.princessCounter.pipe(skip(1)).subscribe((count) => {
      if (count === 0) {
        this.showSuccessMessage(this.noOfSteps);
      }
    });
  }

  openDialogToEnterDetails(): Observable<any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(GridFormDialogComponent, dialogConfig);
    return dialogRef.afterClosed();
  }

  showSuccessMessage(count) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { count: count };
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(NotificationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((ready) => {
      if (ready)
        this.clearGame();
    });
  }

  clearGame() {
    this.princessCounter.complete();
    this.ngOnInit();
  }
}

