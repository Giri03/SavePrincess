import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-grid-form-dialog',
  templateUrl: './grid-form-dialog.component.html',
  styleUrls: ['./grid-form-dialog.component.scss']
})
export class GridFormDialogComponent implements OnInit {

  form: FormGroup;
  row: number;
  col: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GridFormDialogComponent>) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      row: ['', [Validators.required, Validators.min(2)]],
      col: ['', [Validators.required, Validators.min(2)]]
    });
  }


  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }


}