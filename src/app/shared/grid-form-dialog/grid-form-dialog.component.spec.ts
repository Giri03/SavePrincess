import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GridFormDialogComponent } from './grid-form-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('GridFormDialogComponent', () => {
  let component: GridFormDialogComponent;
  let fixture: ComponentFixture<GridFormDialogComponent>;
  let dialogRef: MatDialogRef<GridFormDialogComponent>;

  beforeEach(async(() => {
    const dialogRefStub = {
      close: (x?) => {
        return of(x);
      },
    };
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
      ],
      declarations: [GridFormDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialogRef = TestBed.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on save and send formgroup value', () => {
    component.form = new FormGroup({});
    const spy = spyOn(dialogRef, 'close');
    component.save();
    expect(spy).toHaveBeenCalledWith(new FormGroup({}).value);
  });

  it('should close dialog on close', () => {
    const spy = spyOn(dialogRef, 'close');
    component.close();
    expect(spy).toHaveBeenCalled();
  });
});
