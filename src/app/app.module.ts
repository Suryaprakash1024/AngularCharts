import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GaugeChartComponent } from './d3/gauge-chart/gauge-chart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HighGuageComponent } from './high-guage/high-guage.component';
import { D3Component } from './d3/d3.component';
import { LibHighchartGaugeComponent } from './high-guage/lib-highchart-gauge/lib-highchart-gauge.component';

@NgModule({
  declarations: [
    AppComponent,
    GaugeChartComponent,
    HighGuageComponent,
    D3Component,
    LibHighchartGaugeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
