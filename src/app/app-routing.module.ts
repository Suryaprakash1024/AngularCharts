import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { D3Component } from './d3/d3.component';
import { HighGuageComponent } from './high-guage/high-guage.component';

const routes: Routes = [
  { path: '', redirectTo: 'd3', pathMatch: 'full' },
  { path: 'highcharts', component: HighGuageComponent },
  { path: 'd3', component: D3Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
