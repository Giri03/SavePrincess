import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { GridFormDialogComponent } from '../shared/grid-form-dialog/grid-form-dialog.component';
import { NotificationDialogComponent } from '../shared/notification-dialog/notification-dialog.component';
import { Cell } from './models/cell';
import { Grid } from './models/grid';
import { keyboardMap } from './models/keyboard-map';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  private grid: Grid;
  public row = 0;
  public col = 0;
  private cellSize = AppConstants.cellSize;
  public currentPlayerposition: Cell;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private noOfSteps = 1;
  public princessCounter: BehaviorSubject<Number> = new BehaviorSubject(0);

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    /** Initialize count of no of princess and noOfSteps */
    this.princessCounter = new BehaviorSubject(0);
    this.noOfSteps = 1;
    /** Open dialog to enter board details */
    this.openDialogToEnterDetails().subscribe((value) => {
      this.row = parseInt(value.row);
      this.col = parseInt(value.col);
      this.startGame();
    });
  }

  /** Dialog to enter board details */
  openDialogToEnterDetails(): Observable<any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(GridFormDialogComponent, dialogConfig);
    return dialogRef.afterClosed();
  }

  /** Start the game by setting the canvas */
  startGame() {
    this.canvas = <HTMLCanvasElement>document.getElementById('maze');
    this.ctx = this.canvas.getContext('2d');
    this.drawBoard();
  }

  /** Draw a 2D Board */
  drawBoard() {
    if (this.row > 0 && this.col > 0) {
      this.grid = new Grid(this.row, this.col, this.cellSize, this.ctx);
      this.canvas.width = this.col * this.cellSize;
      this.canvas.height = this.row * this.cellSize;
      this.grid.draw();
      this.initiatePlayer();
      this.initiatePrincess();
    }
  }

  /** Draw Prince player at middle of grid */
  initiatePlayer() {
    const { x, y } = this.findCenterofGrid();
    this.currentPlayerposition = this.grid.cells[x][y];
    this.grid.drawPlayer(this.currentPlayerposition, true);
  }

  /** Draw Princess player randomly on grid
   * no of princess will be avg of no_row + no_col
   */
  initiatePrincess() {
    const no_princess = Math.floor((this.row + this.col) / 2);
    this.grid.placePrincess(no_princess);
    this.princessCountTrack();
  }

  /** Calculate center of grid */
  findCenterofGrid() {
    return { x: Math.floor(this.row / 2), y: Math.floor(this.col / 2) };
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const direction = keyboardMap[event.key];
    if (direction) this.move(direction);
  }

  /** Move the prince player and update no of steps on move
   * @param direction ('Left' | 'Right' | 'Up' | 'Down')
   */
  move(direction: 'Left' | 'Right' | 'Up' | 'Down') {
    let nextCell: Cell;
    if (direction === 'Left') {
      if (this.currentPlayerposition.col < 1) return;
      nextCell =
        this.grid.cells[this.currentPlayerposition.row][
          this.currentPlayerposition.col - 1
        ];
    }
    if (direction === 'Right') {
      if (this.currentPlayerposition.col + 1 >= this.col) return;
      nextCell =
        this.grid.cells[this.currentPlayerposition.row][
          this.currentPlayerposition.col + 1
        ];
    }
    if (direction === 'Up') {
      if (this.currentPlayerposition.row < 1) return;
      nextCell =
        this.grid.cells[this.currentPlayerposition.row - 1][
          this.currentPlayerposition.col
        ];
    }
    if (direction === 'Down') {
      if (this.currentPlayerposition.row + 1 >= this.row) return;
      nextCell =
        this.grid.cells[this.currentPlayerposition.row + 1][
          this.currentPlayerposition.col
        ];
    }
    this.noOfSteps++;
    this.grid.drawPlayer(this.currentPlayerposition, false, '#FFFFFF');
    this.currentPlayerposition = nextCell;
    this.grid.drawPlayer(this.currentPlayerposition, true);
    this.princessCount();
  }

  /** Calculate no of princess in grid */
  princessCount() {
    let count = 0;
    this.grid.cells.map((cells) => {
      count += cells.filter((cell) => cell.isPrincess).length;
    });
    this.princessCounter.next(count);
  }

  /** Keep track if princess are present on grid */
  princessCountTrack() {
    this.princessCounter.pipe(skip(1)).subscribe((count) => {
      if (count === 0) {
        this.showSuccessMessage(this.noOfSteps);
      }
    });
  }

  /**
   *  show success dialog when all princess captured
   * @param count noOfSteps required to capture all princess
   */
  showSuccessMessage(count) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { count: count };
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(
      NotificationDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((ready) => {
      if (ready) this.clearGame();
    });
  }

  /**
   * Clear the game and initialize again
   */
  clearGame() {
    this.princessCounter.complete();
    this.ngOnInit();
  }
}
