import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { D3Component } from './d3/d3.component';
import { HighGuageComponent } from './high-guage/high-guage.component';
import { UtilitiesComponent } from './utilities/utilities.component';

const routes: Routes = [
  { path: '', redirectTo: 'd3', pathMatch: 'full' },
  { path: 'highcharts', component: HighGuageComponent },
  { path: 'd3', component: D3Component },
  { path: 'Utilities', component: UtilitiesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
