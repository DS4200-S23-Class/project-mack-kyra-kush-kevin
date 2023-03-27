const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 30, right: 30, top: 30, bottom: 30};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

let pest_svg = d3.select("#pest")
  .append("svg")
    .attr("width", FRAME_WIDTH + MARGINS.left + MARGINS.right)
    .attr("height", FRAME_HEIGHT + MARGINS.top + MARGINS.bottom)
  .append("g")
    .attr("transform",
          "translate(" + MARGINS.left + "," + MARGINS.top + ")");

let fert_svg = d3.select("#fert")
  .append("svg")
    .attr("width", FRAME_WIDTH + MARGINS.left + MARGINS.right)
    .attr("height", FRAME_HEIGHT + MARGINS.top + MARGINS.bottom)
  .append("g")
    .attr("transform",
          "translate("  + MARGINS.left + "," + MARGINS.top + ")");

let energy_svg = d3.select("#energy")
  .append("svg")
    .attr("width", FRAME_WIDTH + MARGINS.left + MARGINS.right)
    .attr("height", FRAME_HEIGHT + MARGINS.top + MARGINS.bottom)
  .append("g")
    .attr("transform",
          "translate(" + MARGINS.left + "," + MARGINS.top + ")");
let labor_svg = d3.select("#energy")
 
  .append("svg")
    .attr("width", FRAME_WIDTH + MARGINS.left + MARGINS.right)
    .attr("height", FRAME_HEIGHT + MARGINS.top + MARGINS.bottom)
  .append("g")
    .attr("transform",
          "translate(" + MARGINS.left + "," + MARGINS.top + ")");


// mouse handlers for circles
function handleMouseover(event, d) { 
    event.target.style.fill = "orange";
}; 

function handleMouseleave(event, d) { 
    event.target.style.fill = "darkred";   
}; 

function handleClick(event, d) { 
    if (event.target.style.stroke === "lightblue") { 
        event.target.style.stroke = "";}   
    else { 
        event.target.style.stroke = "lightblue"; 
        event.target.style.strokeWidth = "3px"; 
        } 
    }; 





files=["data_clean/labour_input.csv", "data_clean/pesticide_consumption.csv",
  "data_clean/fertilizer_consumption.csv", "data_clean/energy_input.csv"];



  function build_pesticide(){
  let prev_point = [0, 0];

  d3.csv("data_clean/pesticide_consumption.csv").then((data) => {

    //Add X axis --> it is a date format
    let x = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return d.Year; })
        , d3.max(data, function(d) { return d.Year; })])
      .range([ 0, FRAME_WIDTH ]);
    pest_svg.append("g")
      .attr("transform", "translate(0," + FRAME_HEIGHT + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    let y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.AL; })])
      .range([ FRAME_HEIGHT, 0 ]);
    pest_svg.append("g")
      .call(d3.axisLeft(y));
    // Add the line

    for (let i = 0; i < data.length; i++) {
      pest_svg.append("line")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr('x1', prev_point[0])
      .attr('y1', prev_point[1])
      .attr('x2', x(data[i].Year))
      .attr('y2', y(data[i].AL));

      prev_point = [x(data[i].Year), y(data[i].AL)];


    }

    pest_svg.append("text")
    .attr("x", FRAME_WIDTH/2)
    .attr("y", 0 - MARGINS.top/2)
    .attr("text-anchor", "middle") 
    .text("Pesticide Consumption Per Year");


      fitter(data);
    })
  }
  function build_fertilizer(){
  let prev_point = [0, 0];

  d3.csv("data_clean/fertilizer_consumption.csv").then((data) => {

    //Add X axis --> it is a date format
    let x = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return d.Year; })
        , d3.max(data, function(d) { return d.Year; })])
      .range([ 0, FRAME_WIDTH ]);
    fert_svg.append("g")
      .attr("transform", "translate(0," + FRAME_HEIGHT + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    let y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.AL; })])
      .range([ FRAME_HEIGHT, 0 ]);
    fert_svg.append("g")
      .call(d3.axisLeft(y));
    // Add the line

    for (let i = 0; i < data.length; i++) {
      fert_svg.append("line")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr('x1', prev_point[0])
      .attr('y1', prev_point[1])
      .attr('x2', x(data[i].Year))
      .attr('y2', y(data[i].AL));

      prev_point = [x(data[i].Year), y(data[i].AL)];


    }
    fert_svg.append("text")
      .attr("x", FRAME_WIDTH/2)
      .attr("y", 0 - MARGINS.top/2)
      .attr("text-anchor", "middle") 
      .text("Fertilizer Consumption Per Year");


      fitter(data);
    })
  }

  function build_energy_input(){
  let prev_point = [0, 0];
  let counter = 0;
  d3.csv("data_clean/energy_input.csv").then((data) => {


    //Add X axis --> it is a date format
    let x = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return d.Year; })
        , d3.max(data, function(d) { return d.Year; })])
      .range([ 0, FRAME_WIDTH ]);
    energy_svg.append("g")
      .attr("transform", "translate(0," + FRAME_HEIGHT + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    let y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.AL; })])
      .range([ FRAME_HEIGHT, 0 ]);
    energy_svg.append("g")
      .call(d3.axisLeft(y));
    // Add the line

    for (let i = 0; i < data.length; i++) {
      energy_svg.append("line")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr('x1', prev_point[0])
      .attr('y1', prev_point[1])
      .attr('x2', x(data[i].Year))
      .attr('y2', y(data[i].AL));

      prev_point = [x(data[i].Year), y(data[i].AL)];


    }

    
    energy_svg.append("text")
    .attr("x", FRAME_WIDTH/2)
    .attr("y", 0 - MARGINS.top/2)
    .attr("text-anchor", "middle") 
    .text("Energy Input Per Year");


  
    })
  }

  function build_labor_input(){
  let prev_point = [0, 0];

  d3.csv("data_clean/labour_input.csv").then((data) => {

    //Add X axis --> it is a date format
    let x = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return d.Year; })
        , d3.max(data, function(d) { return d.Year; })])
      .range([ 0, FRAME_WIDTH ]);
    labor_svg.append("g")
      .attr("transform", "translate(0," + FRAME_HEIGHT + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    let y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.AL; })])
      .range([ FRAME_HEIGHT, 0 ]);
    labor_svg.append("g")
      .call(d3.axisLeft(y));
    // Add the line

    for (let i = 0; i < data.length; i++) {
      labor_svg.append("line")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr('x1', prev_point[0])
      .attr('y1', prev_point[1])
      .attr('x2', x(data[i].Year))
      .attr('y2', y(data[i].AL));

      prev_point = [x(data[i].Year), y(data[i].AL)];


    }
    labor_svg.append("text")
    .attr("x", FRAME_WIDTH/2)
    .attr("y", 0 - MARGINS.top/2)
    .attr("text-anchor", "middle") 
    .text("Labor Input Per Year");

    })
  }

  build_pesticide();
  build_fertilizer();
  build_energy_input();
  build_labor_input();

