import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'grid', component: GridComponent },
  { path: '', component: GridComponent },
  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
