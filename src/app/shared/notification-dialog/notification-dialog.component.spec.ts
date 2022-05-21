import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { of } from 'rxjs';

import { NotificationDialogComponent } from './notification-dialog.component';

describe('NotificationDialogComponent', () => {
  let component: NotificationDialogComponent;
  let fixture: ComponentFixture<NotificationDialogComponent>;
  let dialogRef: MatDialogRef<NotificationDialogComponent>;

  beforeEach(async(() => {
    const dialogRefStub = {
      close: (x?) => {
        return of(x);
      },
    };
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [NotificationDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { count: 3 } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set count as 1', () => {
    expect(component.count).toEqual(3);
  });

  it('should set winMessage', () => {
    expect(component.winMessage).toEqual('You saved the princess in 3 steps!!');
  });

  it('should close dialog on start and send true', () => {
    const spy = spyOn(dialogRef, 'close');
    component.start();
    expect(spy).toHaveBeenCalledWith(true);
  });
});
