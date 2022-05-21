import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-grid-form-dialog',
  templateUrl: './grid-form-dialog.component.html',
  styleUrls: ['./grid-form-dialog.component.scss'],
})
export class GridFormDialogComponent implements OnInit {
  form: FormGroup;
  row: number;
  col: number;
  messages = environment.messages;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GridFormDialogComponent>
  ) {}

  ngOnInit() {
    /**
     * creating form which takes no of rows and columns
     */
    this.form = this.fb.group({
      row: ['', [Validators.required, Validators.min(2)]],
      col: ['', [Validators.required, Validators.min(2)]],
    });
  }

  /** on save close the dialog by passing form value */
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
