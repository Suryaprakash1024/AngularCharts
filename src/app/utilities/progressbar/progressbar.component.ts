import { Component, Input } from '@angular/core';
import * as d3 from "d3";
import { colorCodes } from 'src/app/models/color-code';

@Component({
  selector: 'lib-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent {

  @Input() value: number = 0;
  
  progress: any;
  ContainerStyles = {};

  ngOnInit() {
    this.drawProgressBar();
  }
  constructor(){
    this.ContainerStyles = {
      'width': window.innerWidth * 0.5 + 'px',
      'background-color': 'white'
    };
  }

  drawProgressBar() {
    var svg = d3.select('.progress-bar')
      .append('svg')
      .attr('height', 100)
      .attr('width', window.innerWidth * 0.5);

    var states = ['started', 'inProgress', 'completed'],
      segmentWidth = window.innerWidth * (this.value/200),
      currentState = 'started';

    var colorScale = d3.scaleOrdinal()
      .domain(states)
      .range(['yellow', 'orange', 'green']);

    svg.append('rect')
      .attr('class', 'bg-rect')
      .attr('rx', 0)
      .attr('ry', 0)
      .attr('fill', colorCodes.shadow)
      .attr('height', 15)
      .attr('width', function () {
        return window.innerWidth * 0.5;
      })
      .attr('x', 0);

    this.progress = svg.append('rect')
      .attr('class', 'progress-rect')
      .attr('fill', function (): any {
        return colorCodes.green;//colorScale(currentState);
      })
      .attr('height', 15)
      .attr('width', 0)
      .attr('rx', 0)
      .attr('ry', 0)
      .attr('x', 0);

    this.progress.transition()
      .duration(1000)
      .attr('width', function () {
        var index = states.indexOf(currentState);
        return (index + 1) * segmentWidth;
      });
      // Add the percentage text
    var percentageText = svg.append('text')
    .text(this.value + "%")
    .attr('x', (window.innerWidth * ((this.value-4)/200)))
    .attr('y', 12.5)
    .attr('font-size', 12)
    .attr('fill', '#000')
  }
  moveProgressBar(state: any) {
    var states = ['started', 'inProgress', 'completed'],
      segmentWidth = 100,
      currentState = 'started';
    var colorScale = d3.scaleOrdinal()
      .domain(states)
      .range(['yellow', 'orange', 'green']);
    this.progress.transition()
      .duration(1000)
      .attr('fill', function (): any {
        return colorScale(state);
      })
      .attr('width', function () {
        var index = states.indexOf(state);
        return (index + 1) * segmentWidth;
      });
  }
}
