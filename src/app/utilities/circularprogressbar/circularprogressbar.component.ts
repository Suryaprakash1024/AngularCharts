import { Component } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'lib-circularprogressbar',
  templateUrl: './circularprogressbar.component.html',
  styleUrls: ['./circularprogressbar.component.css']
})
export class CircularprogressbarComponent {

  ngOnInit() {
    setTimeout((x: any) => {
      this.draw();
    }, 10);
  }
  draw() {
    var current: any;
    var width = 450,
      height = 350; // adjust for height of input bar div

    var color = ['red','green'];

    // draw and append the container
    var svg = d3.select(".bar-graph").append("svg")
      .attr("width", width).attr("height", height);

    // set the thickness of the inner and outer radii
    var min = 200;
    var oRadius = min / 2 * 0.9;
    var iRadius = min / 2 * 0.5;

    // construct default pie laoyut
    var pie = d3.pie().value(function (d :any) {
      return d;
    }).sort(null);

    // construct arc generator
    var arc = d3.arc()
      .outerRadius(oRadius)
      .innerRadius(iRadius) as any;

    // creates the pie chart container
    var g = svg.append('g')
      .attr('transform', 'translate(300,250)')

    g.append('text').attr('text-anchor', 'middle').text("90%")
    // generate random data
    var data = [0, 100];

    // enter data and draw pie chart
    var path = g.datum(data).selectAll("path")
      .data(pie)
      .enter().append("path")
      .attr("class", "piechart")
      .attr("fill", function (d, i) { return color[i]; })
      .attr("d", arc)
      .each(function (d) {
        current = d;
      })

    function render() {
      // generate new random data
      data = makeData(2);
      // add transition to new path
      g.datum(data).selectAll("path").data(pie).transition().duration(1000).attrTween("d", arcTween)

      // add any new paths
      g.datum(data).selectAll("path")
        .data(pie)
        .enter().append("path")
        .attr("class", "piechart")
        .attr("fill", function (d, i) { return color[i]; })
        .attr("d", arc)
        .each(function (d) { current = d; })

      // remove data not being used
      g.datum(data).selectAll("path")
        .data(pie).exit().remove();
    }

    render();

    function makeData(size: number) {
      return d3.range(size).map(function (item) {
        console.log(Math.random() * 100)
        return Math.random() * 100;
      });
    };

    // Store the displayed angles in _current.
    // Then, interpolate from _current to the new angles.
    // During the transition, _current is updated in-place by d3.interpolate.
    function arcTween(a: any) {
      var i = d3.interpolate(current, a);
      current = i(0);
      return function (t :any) {
        return arc(i(t));
      };
    }
  }

}
