// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var line = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.Value); });

// append the svg object to the body of the page
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// load the data
d3.csv("data_clean/energy_input.csv", function(error, data) {
  console.log(data);
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.Year = +d.Year;
    d.Value = +d.Value;
  });

  // set the domain of the axes
  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y.domain([0, d3.max(data, function(d) { return d.Value; })]);

  // add the X axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the Y axis
  svg.append("g")
      .call(d3.axisLeft(y));

  // create a group for each state and draw the line
  var states = data.columns.slice(1);
  states.forEach(function(state) {
    var stateData = data.map(function(d) {
      return {Year: d.Year, Value: d[state]};
    });

    svg.append("path")
        .datum(stateData)
        .attr("class", "line")
        .attr("d", line)
        .style("stroke", function(d) { return d[0].Value > d[d.length - 1].Value ? "red" : "steelblue"; });
  });
});


d3.csv('data_clean/pesticide_consumption.csv', function(err, rows){
      function unpack(rows, key) {
          rows = Array.from(rows);
          return rows.map(function(row) { return row[key]; });
      }

      var data = [{
          type: 'choropleth',
          locationmode: 'USA-states',
          locations: unpack(rows, 'code'),
          z: unpack(rows, 'Year'),
          text: unpack(rows, 'state'),
          zmin: 0,
          zmax: 17000,
          colorscale: [
              [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
              [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
              [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
          ],
          colorbar: {
              title: 'x',
              thickness: 0.2
          },
          marker: {
              line:{
                  color: 'rgb(255,255,255)',
                  width: 2
              }
          }
      }];
      
      console.log(unpack(rows, 'Year'));


      var layout = {
          title: 'Pesticide consumption',
          geo:{
              scope: 'usa',
              showlakes: true,
              lakecolor: 'rgb(255,255,255)'
          }
      };

      Plotly.newPlot("map", data, layout, {showLink: false});
});
