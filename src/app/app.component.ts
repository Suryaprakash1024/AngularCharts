import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  ngOnInit(){
  }
  constructor(private apiService: AppService,
    private router: Router) {}

  toggleView() {
    const currentUrl = this.router.url;

    if (currentUrl === '/highcharts') {
      this.router.navigateByUrl('/d3');
    } else {
      this.router.navigateByUrl('/highcharts');
    }
  }
  getLink(){
    const currentUrl = this.router.url;

    if (currentUrl !== '/highcharts') {
      return 'D3 JS';
    } else {
      return 'Highcharts';
    }
  }
  
}

