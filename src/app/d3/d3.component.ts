import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Chart } from '../models/Chart';
import { position } from '../models/Position';

@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.css']
})
export class D3Component {
  ChartsData: Chart[] = [];
  ngOnInit(){
    this.getData();
  }
  constructor(private apiService: AppService) {}

  clicked(index: number){
    console.log(index);
  }

  getData() {
    console.log('calling');
    this.apiService.getData().subscribe((data : Chart[]) => {
      this.ChartsData = data;
      this.ChartsData.forEach(x => {
        if(x.uomPosition === position.suffix){
          x.innerLabel = x.value + x.uomSymbol;
          x.outerlabel = x.limit3 +x.uomSymbol;
        }
        else if(x.uomPosition === position.prefix){
          x.innerLabel = x.uomSymbol + x.value;
          x.outerlabel = x.uomSymbol + x.limit3;
        }
        
        // x.outerlabel = x.limit3.toString();
        x.value = x.value/x.limit4;
        x.limit1 = x.limit1/x.limit4 * 100;
        x.limit2 = x.limit2/x.limit4 * 100;
        x.limit3 = x.limit3/x.limit4 * 100;
        x.limit4 = 100;
      
      })
      console.log(this.ChartsData);
    });
  }
  getLimitData(index:number) :number[]{
    const data: Chart = this.ChartsData[index];
    return [data.limit1,data.limit2,data.limit3,data.limit4];
  }

}



