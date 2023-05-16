import { AfterViewInit, Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';


HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);


@Component({
  selector: 'lib-highchart-gauge',
  templateUrl: './lib-highchart-gauge.component.html',
  styleUrls: ['./lib-highchart-gauge.component.css']
})

export class LibHighchartGaugeComponent implements AfterViewInit{
  
  @Input() size: number;
  @Input() value: number;
  @Input() ringWidth: number;
  @Input() limitData: number[] = [];
  @Input() metricLabel: string = "";
  @Input() bestValue: string = "";
  @Input() index: number = 0;
  @Input() innerLabel: string = '';
  @Input() outerLabel: string = '';
  @Input() bottomLabel: string = ''
  
  theBest = this.bestValue;
  colors = ['#b81f2d', '#edd148', '#2bd81f'];
  

  constructor(){
    this.size = 300;
    this.value = 0;
    this.ringWidth = 25;
    console.log(this.theBest);
  }

  // dial?: Highcharts.DialOptions;
  // pivot?: Highcharts.PivotOptions;
  dial: Highcharts.PlotGaugeDialOptions = {
    radius: '100%',
    backgroundColor: 'white',
    baseWidth: 10,
    baseLength: '10%',
    rearLength: '10%',
    borderColor: 'black',
    borderWidth: 1,
  } as any;

  ngAfterViewInit(): void {
    this.createChartGauge();

  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  private createChartGauge(): void {
    var outerLabel = this.outerLabel;
    var innerLabel = this.innerLabel;
    var limitData = this.limitData;

    const options: Highcharts.Options = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: 'white',
        plotBorderWidth: 0,
        plotShadow: false,
        height: '60%'
      },
      credits: {
        enabled: false,
      },
      tooltip: { enabled: false },
      title: {
        text: this.metricLabel,
        margin: -70
      },
      series: [
        {
        name: this.innerLabel,
        data: [Math.round(240 * this.value)],
        zIndex: 200,
        dataLabels: {
          formatter: function() {
            return innerLabel;
          } as any,
          zIndex:2000,
          borderRadius: 50,
          backgroundColor: '#d0d0ce',
          y: -16,
          color: (
            Highcharts.defaultOptions.title &&
            Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color
          ) || '#05054b',
          style: {
            fontSize: '14px'
          }
        },
        dial: this.dial,
        pivot: {
          backgroundColor: '#d0d0ce',
          borderWidth: 1,
          radius: 25,
          dataLabels: {
          }
        }
      }
    ],
      pane: [{
        startAngle: -120,
        endAngle: 119.9,
        background: undefined,
        center: ['50%', '75%'],
        size: '100%'
      },
      {
        backgroundColor: 'red',
        borderWidth: 2,
        outerRadius: '57%',
        innerRadius: '55%',
      },],

      // the value axis
      yAxis: {
        zindex: 100,
        min: 0,
        max: 240,
        tickPixelInterval: 40,
        // tickPosition: 'inside',
        tickPositions: [ this.bestValue === 'LTB' ? limitData[1] * 2.4 : limitData[2] * 2.4],
        tickColor: '#FFFFFF',
        tickLength: 40,
        tickWidth: 0,
        minorTickInterval: null,
        labels: {
          formatter: function() : any{
            return outerLabel;
          } as any,
          distance: 20,
          style: {
            fontSize: '14px',
            fontWeight:'bold'
            // display: "none"
          }
        },
        lineWidth: 0,
        plotBands: [{
          from: 0,
          to: this.limitData[1] *2.4,
          color: this.bestValue == 'LTB' ? this.colors[2] : this.colors[0],
          thickness: 40
        }, {
          from: this.limitData[1] *2.4,
          to: this.limitData[2] *2.4,
          color: '#edd148',
          thickness: 40
        }, {
          from: this.limitData[2] *2.4,
          to: 240,
          color: this.bestValue == 'LTB' ? this.colors[0] : this.colors[2],
          thickness: 40
        }]
      }
    } as any;

    Highcharts.chart('chartContainer'+this.index, options);
    setInterval(() => {
      this.theBest = this.bestValue;
      // chart.series[0].points[0].update(this.getRandomNumber(0, 100));
    }, 10);
  }
}
