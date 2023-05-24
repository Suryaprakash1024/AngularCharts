import { Component } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'lib-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent {
  
  ngOnInit() {
    setTimeout((x: any) => {
      this.draw();
    }, 10);
  }
  draw() {
    const div = d3.select('.bar-graph');
    const margin = { top: 50, right: 50, bottom: 90, left: 75 };
    const width = window.innerWidth - margin.right - margin.left - 150;
    const height = window.innerHeight - margin.top - margin.bottom -200;

    const maxY = 100
    const data = [10, 68, 96, 79];
    const dataLabel = ['June','July','August','September'];

    const svg = div.append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background-color', 'white')
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width])

    const yScale = d3.scaleLinear()
      .domain([0, maxY])
      .range([height, 0])
      
    const line  = d3.line()
      .x((d, i) => xScale(i))
      .y((d :any ,i) => yScale(d))
      .curve( d3.curveMonotoneX) as any;

    const xAxis = svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))

    const yAxis = svg.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(yScale))

    /*
   * Appending the line to the SVG.
   */
    svg.append('path')
      .datum(data)
      .attr('class', 'data-line glowed')
      .style('stroke', '#D073BA')
      .style('stroke-width', 2)
      .style('fill', 'none')
      .attr('d', line)

    /*
    * Add little circles at data points.
    */
    const circles = svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('cx', (d, i) => xScale(i))
      .attr('cy', d => yScale(d))
      .attr('r', 4)
      .style('fill', '#D073BA')
      .style('stroke', '#11141C')
      .style('stroke-width', 2)


    /*
    * Glow effects (Optional)
    */
    const defs = svg.append('defs')
    const glowDeviation = '4.5'

    // Filter for the outside glow
    const filter = defs.append('filter').attr('id', 'glow')
    filter.append('feGaussianBlur')
      .attr('stdDeviation', glowDeviation)
      .attr('result', 'coloredBlur')

    const feMerge = filter.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'coloredBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

    // Add the glow!!
    d3.selectAll('.glowed').style('filter', 'url(#glow)')

  }

}
