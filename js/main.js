const USA_FRAME = d3.select("#map")
.append("svg")
.attr("height", 400)
.attr("width", 400)
.attr("class", "usa_frame");


const svg = d3.select("#map")
.append("svg")
.attr("width", "100%")
.attr("height", "100%");

const g = svg.call(zoom).append("g");

g.append("rect")
  .attr("width", WIDTH * OVERLAY_MULTIPLIER)
  .attr("height", HEIGHT * OVERLAY_MULTIPLIER)
  .attr(
    "transform",
    `translate(-${WIDTH * OVERLAY_OFFSET},-${HEIGHT * OVERLAY_OFFSET})`
  )
  .style("fill", "none")
  .style("pointer-events", "all");









// var map = d3.geomap()
//     .geofile('/d3-geomap/topojson/world/countries.json')
//     .draw(d3.select('#map'));

// d3.csv("data_clean/pesticide_consumption.xslx").then((data) => {
//     console.log(data);
// });


// var projection = d3.geo.albersUsa()
//                    .translate([width/2, height/2])    // translate to center of screen
//                    .scale([1000]); 

// d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_usa_states.csv', function(err, rows){
                    
//     function unpack(rows, key) {
//         rows = Array.from(rows);
//         return rows.map(function(row) { return row[key]; });
//     }

//     var data = [{
//         type: 'choropleth',
//         locationmode: 'USA-states',
//         locations: unpack(rows, 'Postal'),
//         z: unpack(rows, 'Population'),
//         text: unpack(rows, 'State'),
//         autocolorscale: true
//     }];

//     var layout = {
//     title: '2014 US Population by State',
//         geo:{
//             scope: 'usa',
//             countrycolor: 'rgb(255, 255, 255)',
//             showland: true,
//             landcolor: 'rgb(217, 217, 217)',
//             showlakes: true,
//             lakecolor: 'rgb(255, 255, 255)',
//             subunitcolor: 'rgb(255, 255, 255)',
//             //showsubunits: true,
//             lonaxis: {},
//             lataxis: {}
//         }
//     };
//     Plotly.newPlot(document.getElementById("map"), data, layout, {showLink: false});
// });

const TOOLTIP = d3.select("#map") 
            .append("div") 
            .attr("class", "tooltip") 
            .style("opacity", 0); 

function handleHover(event, d){
    event.target.style.fill = "yellow";
    TOOLTIP.style("opacity", 1);
};

function handleLeave(event, d){
    event.target.style.fill = "blueviolet";
    TOOLTIP.style("opacity", 0);
};

