import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GridComponent } from './grid/grid.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NotificationDialogComponent } from './shared/notification-dialog/notification-dialog.component';
import { GridFormDialogComponent } from './shared/grid-form-dialog/grid-form-dialog.component';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';

const ANGULAR_MATERIAL_MODULES = [
  MatDialogModule,
  MatButtonModule,
  ReactiveFormsModule,
  MatInputModule,
  FormsModule
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GridComponent,
    NotificationDialogComponent,
    GridFormDialogComponent,
    NotFoundPageComponent
  ],
  imports: [
    ...ANGULAR_MATERIAL_MODULES,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
