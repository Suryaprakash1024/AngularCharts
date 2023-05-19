import { Component } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'lib-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent {

  data = [
    { month: "January", sales: 100 },
    { month: "February", sales: 80 },
    { month: "March", sales: 30 },
    { month: "April", sales: 40 },
    { month: "May", sales: 100 }
  ] as { month: string; sales: number }[];

  ngOnInit() {
    setTimeout( (x: any) => {
      this.draw();
    },10);
  }
  draw() {
    var data = this.data;
    // Create the chart elements.
    var svg = d3.select(".bar-graph").append("svg");
    var xScale = d3
      .scaleBand()
      .domain(this.data.map(d => d.month))
      .range([0, 50]);

    var xAxis = d3.axisBottom(xScale);

    var yScale = d3
      .scaleLinear()
      .domain(this.data.map(d => d.sales))
      .range([0, 50]);

    var yAxis = d3.axisLeft(yScale);

    var bars = svg.selectAll(".bar")
      .data(this.data);

    // Style the chart elements.
    bars.style("fill", "steelblue");
    xAxis.tickFormat(function (d: any): any { return data[d].month; });
    yAxis.tickFormat(function (d: any): any { return data[d].sales; });


    // Add interactivity to the chart.
    bars.on("click", function (d) {
      console.log(d.sales);
    });

    svg
    .append("path")
    .datum(data)
    .attr("d", d3.line<{ month: string; sales: number }>()
      .curve(d3.curveLinear)
      .x(d => xScale(d.month) || 0)
      .y(d => yScale(d.sales) || 0)
    )
    .attr("class", "line");
  

    bars.enter().append("rect")
      .attr("x", function (d): any { return xAxis.scale()(d.month); })
      .attr("y", function (d): any { return yAxis.scale()(d.sales); })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d): any { 
        return yAxis.scale()(d.sales); 
      })
      .attr("fill", "steelblue");
  }
}
