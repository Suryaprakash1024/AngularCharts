import { Component, Input } from '@angular/core';
import * as d3 from "d3";
import { colorCodes } from 'src/app/models/color-code';

@Component({
  selector: 'lib-circularprogressbar',
  templateUrl: './circularprogressbar.component.html',
  styleUrls: ['./circularprogressbar.component.css']
})
export class CircularprogressbarComponent {

  @Input() index: number = 0;
  @Input() innerLabel: string = '';
  @Input() scaleColor: string = 'green'
  @Input() value: number = 0;
  @Input() heading: string = '';

  ngOnInit() {
    setTimeout((x: any) => {
      this.draw();
    }, 10);
  }
  getClassName() {
    return 'bar-graph' + this.index;
  }
  draw() {
    var current: any;
    var width = 350,
      height = 220; // adjust for height of input bar div

    var scaleColor = this.scaleColor;
    var color = [getColorCode(), colorCodes['shadow']];

    function getColorCode() {
      console.log(scaleColor)
      return scaleColor == 'green' ? colorCodes['green'] : scaleColor == 'red' ? colorCodes['red'] : colorCodes['yellow'];
    }


    // draw and append the container
    var svg = d3.select(".bar-graph" + this.index).append("svg")
      .attr("width", width).attr("height", height);

    // set the thickness of the inner and outer radii
    var min = 200;
    var oRadius = min / 2 * 0.9;
    var iRadius = min / 2 * 0.5;

    // construct default pie laoyut
    var pie = d3.pie().value(function (d: any) {
      return d;
    }).sort(null);

    // construct arc generator
    var arc = d3.arc()
      .outerRadius(oRadius)
      .innerRadius(iRadius) as any;

    svg.append("text")
        .attr("x", 150)
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(this.heading)
        .style("fill", "#05054b")
        .style("font-size", "17")
        .style("font-weight", "bold");

    // creates the pie chart container
    var g = svg.append('g')
      .attr('transform', 'translate(150,120)')

    g.append('text')
      .attr('text-anchor', 'middle')
      .text(this.innerLabel)
      .attr('font-weight', '700');
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
    var value :number = +this.value;
    function render() {
      // generate new random data
      data = [value,100 - value]//makeData(2);
      console.log(data, 'Data')
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
      return function (t: any) {
        return arc(i(t));
      };
    }
  }

}
