import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {

  winMessage: string;
  count: Number;

  constructor(private dialogRef: MatDialogRef<NotificationDialogComponent>, @Inject(MAT_DIALOG_DATA) { count }) {
    this.count = count;
  }
  ngOnInit(): void {
    this.winMessage = environment.messages.winning.replace('${steps}', this.count.toString());
  }

  start() {
    this.dialogRef.close(true);
  }
}

