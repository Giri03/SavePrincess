import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { interval, of } from 'rxjs';
import { GridFormDialogComponent } from '../shared/grid-form-dialog/grid-form-dialog.component';

import { GridComponent } from './grid.component';
import { Cell } from './models/cell';
import { Grid } from './models/grid';

class MockCellClass {
  row: number = 10;
  col: number = 10;
}
class MockGridClass {
  draw() {
    return;
  }
  eachCell = new Cell(1, 1);
  cells = [
    [
      new Cell(0, 0),
      new Cell(1, 0),
      new Cell(2, 0),
      new Cell(3, 0),
      new Cell(4, 0),
    ],
    [
      new Cell(0, 1),
      new Cell(1, 1),
      new Cell(2, 1),
      new Cell(3, 1),
      new Cell(4, 1),
    ],
    [
      new Cell(0, 2),
      new Cell(1, 2),
      new Cell(2, 2),
      new Cell(3, 2),
      new Cell(4, 2),
    ],
    [
      new Cell(0, 3),
      new Cell(1, 3),
      new Cell(2, 3),
      new Cell(3, 3),
      new Cell(4, 3),
    ],
    [
      new Cell(0, 4),
      new Cell(1, 4),
      new Cell(2, 4),
      new Cell(3, 4),
      new Cell(4, 4),
    ],
  ];
  drawPlayer() {
    return;
  }
  placePrincess() {
    return;
  }
}

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let ctx: CanvasRenderingContext2D;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        FormsModule,
      ],
      declarations: [GridComponent],
      providers: [{ provide: Grid, useClass: MockGridClass }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize vars', () => {
    expect((component as any).title).toEqual('SavePrincessGame');
    expect(component.col).toEqual(0);
    expect(component.row).toEqual(0);
    expect((component as any).cellSize).toEqual(25);
    expect((component as any).noOfSteps).toEqual(1);
  });

  describe('ngOnInit', () => {
    it('should set row and col', () => {
      spyOn(component, 'startGame');
      spyOn(component, 'openDialogToEnterDetails').and.returnValue(
        of({ row: 10, col: 10 })
      );
      component.ngOnInit();
      expect(component.row).toEqual(10);
      expect(component.col).toEqual(10);
      expect(component.startGame).toHaveBeenCalled();
    });

    it('should define canvas and drawMaze', () => {
      spyOn(component, 'drawMaze');
      spyOn(component, 'openDialogToEnterDetails').and.returnValue(
        of({ row: 10, col: 10 })
      );
      component.ngOnInit();
      expect((component as any).canvas).toBeDefined();
      expect(component.drawMaze).toHaveBeenCalled();
    });

    it('should drawMaze, set canvas and grid, initiatePlayer and princess', () => {
      spyOn(component, 'openDialogToEnterDetails').and.returnValue(
        of({ row: 10, col: 10 })
      );
      component.ngOnInit();
      expect((component as any).canvas.width).toEqual(250);
      expect((component as any).canvas.width).toEqual(250);
      spyOn(component, 'initiatePlayer');
      spyOn(component, 'initiatePrincess');
      component.ngOnInit();
      expect(component.initiatePlayer).toHaveBeenCalled();
      expect(component.initiatePrincess).toHaveBeenCalled();
    });
  });

  describe('princessCountTrack', () => {
    it('when count > 0 should not show pop up', () => {
      spyOn(component, 'showSuccessMessage');
      component.princessCounter.next(0);
      component.princessCounter.next(2);
      component.princessCountTrack();
      expect(component.showSuccessMessage).not.toHaveBeenCalled();
    });
    xit('when count == 0 should not show pop up', () => {
      const stream = interval(5);
      spyOn(component, 'showSuccessMessage');
      stream.subscribe(component.princessCounter);
      component.princessCountTrack();
      expect(component.showSuccessMessage).toHaveBeenCalled();
    });
  });

  describe('openDialogToEnterDetails', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = TestBed.inject(MatDialog);
      spyOn(matDialogStub, 'open').and.callThrough();
      component.openDialogToEnterDetails();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });

  describe('clearGame', () => {
    it('makes expected calls', () => {
      spyOn(component, 'ngOnInit').and.callThrough();
      component.clearGame();
      expect(component.ngOnInit).toHaveBeenCalled();
    });
  });

  describe('ShowSuccessMessage', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = TestBed.inject(MatDialog);
      spyOn(matDialogStub, 'open').and.returnValue({
        afterClosed: () => of(true),
      } as MatDialogRef<GridFormDialogComponent>);
      component.showSuccessMessage(4);
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });

  describe('move', () => {
    beforeEach(() => {
      component['noOfSteps'] = 2;
      (component as any).grid = new MockGridClass();
      component.col = 5;
      component.row = 5;
    });
    it('to left - should go to previous row', () => {
      component.currentPlayerposition = new Cell(2, 2);
      component.move('Left');
      expect(component['noOfSteps']).toEqual(3);
      expect(component.currentPlayerposition.col).toEqual(2);
      expect(component.currentPlayerposition.row).toEqual(1);
    });

    it('to right - should go to next row', () => {
      component.currentPlayerposition = new Cell(2, 2);
      component.move('Right');
      expect(component['noOfSteps']).toEqual(3);
      expect(component.currentPlayerposition.col).toEqual(2);
      expect(component.currentPlayerposition.row).toEqual(3);
    });

    it('to Up - should go to previous col', () => {
      component.currentPlayerposition = new Cell(2, 2);
      component.move('Up');
      expect(component['noOfSteps']).toEqual(3);
      expect(component.currentPlayerposition.col).toEqual(1);
      expect(component.currentPlayerposition.row).toEqual(2);
    });

    it('to Down - should go to next col', () => {
      component.currentPlayerposition = new Cell(2, 2);
      component.move('Down');
      expect(component['noOfSteps']).toEqual(3);
      expect(component.currentPlayerposition.col).toEqual(3);
      expect(component.currentPlayerposition.row).toEqual(2);
    });

    it('outside of view on down - should not move', () => {
      component.currentPlayerposition = new Cell(4, 4);
      component.move('Down');
      expect(component['noOfSteps']).toEqual(2);
      expect(component.currentPlayerposition.col).toEqual(4);
      expect(component.currentPlayerposition.row).toEqual(4);
    });

    it('outside of view on right - should not move', () => {
      component.currentPlayerposition = new Cell(4, 4);
      component.move('Right');
      expect(component['noOfSteps']).toEqual(2);
      expect(component.currentPlayerposition.col).toEqual(4);
      expect(component.currentPlayerposition.row).toEqual(4);
    });

    it('outside of view on Left - should not move', () => {
      component.currentPlayerposition = new Cell(0, 0);
      component.move('Left');
      expect(component['noOfSteps']).toEqual(2);
      expect(component.currentPlayerposition.col).toEqual(0);
      expect(component.currentPlayerposition.row).toEqual(0);
    });

    it('outside of view on Up - should not move', () => {
      component.currentPlayerposition = new Cell(0, 0);
      component.move('Up');
      expect(component['noOfSteps']).toEqual(2);
      expect(component.currentPlayerposition.col).toEqual(0);
      expect(component.currentPlayerposition.row).toEqual(0);
    });
  });
});
