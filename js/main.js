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



  function build_pesticide(states){
  states = Array.from(states);
  
  //console.log(states)

  d3.csv("data_clean/pesticide_consumption_F.csv").then((data) => {

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
      .domain([0, d3.max(data, function(d) { return +d.Value; })])
      .range([ FRAME_HEIGHT, 0 ]);
    pest_svg.append("g")
      .call(d3.axisLeft(y));
    // Add the line

    states.forEach(item => {
      let prev_point = [0, 0];

      row = data.filter(function(d){ return d.State == item; });



      for (let i = 0; i < 45; i++) {
        pest_svg.append("line")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr('x1', prev_point[0])
        .attr('y1', prev_point[1])
        .attr('x2', x(row[i].Year))
        .attr('y2', y(row[i].Value));

      prev_point = [x(row[i].Year), y(row[i].Value)];
    };


    })
    
    pest_svg.append("text")
    .attr("x", FRAME_WIDTH/2)
    .attr("y", 0 - MARGINS.top/2)
    .attr("text-anchor", "middle") 
    .text("Pesticide Consumption Per Year");


    
  })
}
  function build_fertilizer(states){
  states = Array.from(states);
  
  //console.log(states)

  d3.csv("data_clean/fertilizer_consumption_F.csv").then((data) => {

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
      .domain([0, d3.max(data, function(d) { return +d.Value; })])
      .range([ FRAME_HEIGHT, 0 ]);
    fert_svg.append("g")
      .call(d3.axisLeft(y));
    // Add the line

    states.forEach(item => {
      let prev_point = [0, 0];

      row = data.filter(function(d){ return d.State == item; });
      console.log(row[1].Year);



      for (let i = 0; i < 45; i++) {
        fert_svg.append("line")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr('x1', prev_point[0])
        .attr('y1', prev_point[1])
        .attr('x2', x(row[i].Year))
        .attr('y2', y(row[i].Value));

      prev_point = [x(row[i].Year), y(row[i].Value)];
    };

    })
    fert_svg.append("text")
      .attr("x", FRAME_WIDTH/2)
      .attr("y", 0 - MARGINS.top/2)
      .attr("text-anchor", "middle") 
      .text("Fertilizer Consumption Per Year");

    
  })
}

  function build_energy_input(states){
    states = Array.from(states);
  
  //console.log(states)

    d3.csv("data_clean/energy_input_F.csv").then((data) => {

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
      .domain([0, d3.max(data, function(d) { return +d.Value; })])
      .range([ FRAME_HEIGHT, 0 ]);
    energy_svg.append("g")
      .call(d3.axisLeft(y));
    // Add the line

    states.forEach(item => {
      let prev_point = [0, 0];

      row = data.filter(function(d){ return d.State == item; });
      console.log(row[1].Year);



      for (let i = 0; i < 45; i++) {
        energy_svg.append("line")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr('x1', prev_point[0])
        .attr('y1', prev_point[1])
        .attr('x2', x(row[i].Year))
        .attr('y2', y(row[i].Value));

      prev_point = [x(row[i].Year), y(row[i].Value)];
    };
    })

    
    energy_svg.append("text")
    .attr("x", FRAME_WIDTH/2)
    .attr("y", 0 - MARGINS.top/2)
    .attr("text-anchor", "middle") 
    .text("Energy Input Per Year");


  
    
  })
  }

  function build_labor_input(states){
    d3.selectAll("line").remove();

  states = Array.from(states);
  
  //console.log(states)

  d3.csv("data_clean/labour_input_F.csv").then((data) => {

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
      .domain([0, d3.max(data, function(d) { return +d.Value; })])
      .range([ FRAME_HEIGHT, 0 ]);
    labor_svg.append("g")
      .call(d3.axisLeft(y));
    // Add the line

    states.forEach(item => {
      let prev_point = [0, 0];

      row = data.filter(function(d){ return d.State == item; });
      console.log(row[1].Year);



      for (let i = 0; i < 45; i++) {
        labor_svg.append("line")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr('x1', prev_point[0])
        .attr('y1', prev_point[1])
        .attr('x2', x(row[i].Year))
        .attr('y2', y(row[i].Value));

      prev_point = [x(row[i].Year), y(row[i].Value)];
    };

    


    })
    labor_svg.append("text")
    .attr("x", FRAME_WIDTH/2)
    .attr("y", 0 - MARGINS.top/2)
    .attr("text-anchor", "middle") 
    .text("Labor Input Per Year");

    })
  }

  let states_selected = [];

  function newLine(){
    let newState = document.getElementById("selector").value;
    if (!states_selected.includes(newState)){
      states_selected.push(newState);
    }
    build_pesticide(states_selected);
    build_fertilizer(states_selected);
    build_energy_input(states_selected);
    build_labor_input(states_selected);
  }

  function removeLine(){
    let newState = document.getElementById("selector").value;

    if (states_selected.includes(newState)){
      const index = states_selected.indexOf(newState);
      states_selected.splice(index, 1);

      console.log(states_selected);

      build_pesticide(states_selected);
      build_fertilizer(states_selected);
      build_energy_input(states_selected);
      build_labor_input(states_selected);
    }

    
    
    //console.log(states_selected);
  }

  // selecting states works. find a way to turn the strings into function calls
  // so that the below functions take in a set of strings (selected states)
  // and plots their data. 

build_pesticide([]);
build_fertilizer([]);
build_energy_input([]);
build_labor_input([]);



