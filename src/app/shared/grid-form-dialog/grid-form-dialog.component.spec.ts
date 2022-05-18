import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridFormDialogComponent } from './grid-form-dialog.component';

describe('GridFormDialogComponent', () => {
  let component: GridFormDialogComponent;
  let fixture: ComponentFixture<GridFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
