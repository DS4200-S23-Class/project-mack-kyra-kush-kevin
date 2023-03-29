const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const colors = ['steelblue', 'violet', 'forestgreen', 'darkred'];

let pest_svg = d3.select("#pest")
  .append("svg")
    .attr("width", FRAME_WIDTH + MARGINS.left + MARGINS.right)
    .attr("height", FRAME_HEIGHT + MARGINS.top + MARGINS.bottom)
    // .call(d3.zoom().on("zoom", function () {
    //    pest_svg.attr("transform", d3.event.transform)
    // }))
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
let labor_svg = d3.select("#labor")
 
  .append("svg")
    .attr("width", FRAME_WIDTH + MARGINS.left + MARGINS.right)
    .attr("height", FRAME_HEIGHT + MARGINS.top + MARGINS.bottom)
  .append("g")
    .attr("transform",
          "translate(" + MARGINS.left + "," + MARGINS.top + ")"); 
let labor_tooltip = d3.select("#labor")
            .append("div")
            .style("position", "absolute")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px");
let energy_tooltip = d3.select("#energy")
            .append("div")
            .style("position", "absolute")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px");
let fert_tooltip = d3.select("#fert")
            .append("div")
            .style("position", "absolute")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px");
let pest_tooltip = d3.select("#pest")
            .append("div")
            .style("position", "absolute")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px");


function build_pesticide(states, firstRun){
  
  states = Array.from(states);

  d3.csv("data_clean/pesticide_consumption_F.csv").then((data) => {
    let x = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return d.Year; })
        , d3.max(data, function(d) { return d.Year; })])
      .range([ 0, FRAME_WIDTH ]);
  // Add Y axis
    let y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.Value; })])
      .range([ FRAME_HEIGHT, 0 ]);

    if(firstRun) {

      pest_svg.append("text")
            .attr("x", FRAME_WIDTH/2)
            .attr("y", 0 - MARGINS.top/2)
            .attr("text-anchor", "middle") 
            .text("Pesticide Consumption Per Year")
      pest_svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", FRAME_WIDTH/2)
            .attr("y", FRAME_HEIGHT + 40)
            .text("Year");
      pest_svg.append("g")
        .attr("transform", "translate(0," + FRAME_HEIGHT + ")")
        .call(d3.axisBottom(x));
      pest_svg.append("g")
        .call(d3.axisLeft(y));

      pest_svg.append("text")
        .attr("x", FRAME_WIDTH/2)
        .attr("y", 0 - MARGINS.top/2)
        .attr("text-anchor", "middle") 
        .text("Pesticide Consumption Per Year");

    }
    

    
    
    
    // Add the line
    let state_count = 0;

    states.forEach(item => {
      let prev_point = [0, y(data[0].Value)];
      row = data.filter(function(d){ return d.State == item; });



      for (let i = 0; i < 45; i++) {
        pest_svg.append("line")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", colors[state_count])
        .attr("stroke-width", 1.5)
        .attr('x1', prev_point[0])
        .attr('y1', prev_point[1])
        .attr('x2', x(row[i].Year))
        .attr('y2', y(row[i].Value))
        .on("mouseover", function(event, d){
          //row = data.filter(function(d) {return d.State == item && d.Year == 1960+i;})
          d3.select("#" + item).attr("stroke-width", 3);

          pest_tooltip
            .style("opacity", 1)
            .html(row[i].State + " in " + row[i].Year +": " + row[i].Value)
            .style("left", `${event.screenX+10}px`)
            .style("top", `${event.screenY - 100}px`)
          })
        .on("mousemove", function(event, d) {
          pest_tooltip
          .html(row[i].State + " in " + row[i].Year +": " + row[i].Value)
          .style("left", `${event.layerX+10}px`)
          .style("top", `${event.layerY}px`)
      })
        .on("mouseleave", function(event, d) {
          pest_tooltip
          .style("opacity", 0);
        });

      prev_point = [x(row[i].Year), y(row[i].Value)];
    };

      state_count ++;
    })

    


    
  })

    
}
  function build_fertilizer(states, firstRun){
  states = Array.from(states);
  
      d3.csv("data_clean/fertilizer_consumption_F.csv").then((data) => {

    let x = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return d.Year; })
        , d3.max(data, function(d) { return d.Year; })])
      .range([ 0, FRAME_WIDTH ]);
    

    // Add Y axis
    let y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.Value; })])
      .range([ FRAME_HEIGHT, 0 ]);

    if(firstRun) {
    fert_svg.append("g")
      .call(d3.axisLeft(y));
    fert_svg.append("g")
      .attr("transform", "translate(0," + FRAME_HEIGHT + ")")
      .call(d3.axisBottom(x));
    fert_svg.append("text")
          .attr("x", FRAME_WIDTH/2)
          .attr("y", 0 - MARGINS.top/2)
          .attr("text-anchor", "middle") 
          .text("Fertilizer Consumption Per Year")
    fert_svg.append("text")
          .attr("class", "x label")
          .attr("text-anchor", "end")
          .attr("x", FRAME_WIDTH/2)
          .attr("y", FRAME_HEIGHT + 40)
          .text("Year");
    }


    // Add the line

    let state_count = 0;
    states.forEach(item => {
      let prev_point = [0, y(data[0].Value)];

      row = data.filter(function(d){ return d.State == item; });
      //console.log(row[1].Year);



      for (let i = 0; i < 45; i++) {
        fert_svg.append("line")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", colors[state_count])
        .attr("stroke-width", 1.5)
        .attr('x1', prev_point[0])
        .attr('y1', prev_point[1])
        .attr('x2', x(row[i].Year))
        .attr('y2', y(row[i].Value))
        .on("mouseover", function(event, d){
          d3.select(item).style("opacity", 9);
          fert_tooltip
            .style("opacity", 1)
            .html(row[i].State + " in " + row[i].Year +": " + row[i].Value)
            .style("left", `${event.screenX+10}px`)
            .style("top", `${event.screenY - 100}px`)
          })
        .on("mousemove", function(event, d) {
          fert_tooltip
          .html(row[i].State + " in " + row[i].Year +": " + row[i].Value)
          .style("left", `${event.layerX+10}px`)
          .style("top", `${event.layerY}px`)
      })
        .on("mouseleave", function(event, d) {
          fert_tooltip
          .style("opacity", 0);
        });

      prev_point = [x(row[i].Year), y(row[i].Value)];
    };
      state_count ++;
    })

    
  })
}

  function build_energy_input(states, firstRun){
    states = Array.from(states);
  
    
    d3.csv("data_clean/energy_input_F.csv").then((data) => {

    let x = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return d.Year; })
        , d3.max(data, function(d) { return d.Year; })])
      .range([ 0, FRAME_WIDTH ]);
    

    // Add Y axis
    let y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.Value; })])
      .range([ FRAME_HEIGHT, 0 ]);

    if(firstRun) {
        energy_svg.append("text")
          .attr("x", FRAME_WIDTH/2)
          .attr("y", 0 - MARGINS.top/2)
          .attr("text-anchor", "middle") 
          .text("Energy Input Per Year")
        energy_svg.append("text")
          .attr("class", "x label")
          .attr("text-anchor", "end")
          .attr("x", FRAME_WIDTH/2)
          .attr("y", FRAME_HEIGHT + 40)
          .text("Year");
        energy_svg.append("g")
          .call(d3.axisLeft(y));
        energy_svg.append("g")
          .attr("transform", "translate(0," + FRAME_HEIGHT + ")")
          .call(d3.axisBottom(x));
      }
    
    // Add the line
      let state_count = 0;

    states.forEach(item => {
      let prev_point = [0, y(data[0].Value)];
      row = data.filter(function(d){ return d.State == item; });



      for (let i = 0; i < 45; i++) {
        energy_svg.append("line")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", colors[state_count])
        .attr("stroke-width", 1.5)
        .attr('x1', prev_point[0])
        .attr('y1', prev_point[1])
        .attr('x2', x(row[i].Year))
        .attr('y2', y(row[i].Value))
        .on("mouseover", function(event, d){
          d3.select(item).style("opacity", 9);
          energy_tooltip
            .style("opacity", 1)
            .html(row[i].State + " in " + row[i].Year +": " + row[i].Value)
            .style("left", `${event.screenX+10}px`)
            .style("top", `${event.screenY - 100}px`)
          })
        .on("mousemove", function(event, d) {
          energy_tooltip
          .html(row[i].State + " in " + row[i].Year +": " + row[i].Value)
          .style("left", `${event.layerX+10}px`)
          .style("top", `${event.layerY}px`)
      })
        .on("mouseleave", function(event, d) {
          energy_tooltip
          .style("opacity", 0);
        });

      prev_point = [x(row[i].Year), y(row[i].Value)];
    };

      state_count++;

    })



  
    
  })
  }

  function build_labor_input(states, firstRun){
    d3.selectAll("line").remove();

    states = Array.from(states);
  
    
  d3.csv("data_clean/labour_input_F.csv").then((data) => {


  
    let x = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return d.Year; })
        , d3.max(data, function(d) { return d.Year; })])
      .range([ 0, FRAME_WIDTH ]);
    

    // Add Y axis
    let y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.Value; })])
      .range([ FRAME_HEIGHT, 0 ]);

    if(firstRun) {
      labor_svg.append("g")
        .call(d3.axisLeft(y));
      labor_svg.append("g")
        .attr("transform", "translate(0," + FRAME_HEIGHT + ")")
        .call(d3.axisBottom(x));
      labor_svg.append("text")
          .attr("x", FRAME_WIDTH/2)
          .attr("y", 0 - MARGINS.top/2)
          .attr("text-anchor", "middle") 
          .text("Labor Input Per Year")
      labor_svg.append("text")
          .attr("class", "x label")
          .attr("text-anchor", "end")
          .attr("x", FRAME_WIDTH/2)
          .attr("y", FRAME_HEIGHT + 40)
          .text("Year");
    }
    
    let state_count = 0;

    states.forEach(item => {
      let prev_point = [0, y(data[0].Value)];
      row = data.filter(function(d){ return d.State == item; });

      

      for (let i = 0; i < 45; i++) {
        labor_svg.append("line")
        .datum(data)
        //.enter()
        .attr("id", item)
        .attr("fill", "none")
        .attr("stroke", colors[state_count])
        .attr("stroke-width", 1.5)
        .attr('x1', prev_point[0])
        .attr('y1', prev_point[1])
        .attr('x2', x(row[i].Year))
        .attr('y2', y(row[i].Value))
        .on("mouseover", function(event, d){
          d3.select(item).attr("stroke-width", 3);
          labor_tooltip
            .style("opacity", 1)
            .html(row[i].State + " in " + row[i].Year +": " + row[i].Value)
            .style("left", `${event.screenX+10}px`)
            .style("top", `${event.screenY - 100}px`)
          })
        .on("mousemove", function(event, d) {
          labor_tooltip
          .html(row[i].State + " in " + row[i].Year +": " + row[i].Value)
          .style("left", `${event.layerX+10}px`)
          .style("top", `${event.layerY}px`)
      })
        .on("mouseleave", function(event, d) {
          labor_tooltip
          .style("opacity", 0);
        });
          //.Year + " in " + row[i].State + ": "
          //+ row[i].Value))
        //.on("mouseout", handleMouseleave());

        prev_point = [x(row[i].Year), y(row[i].Value)];

        
        

        

        
    };
      state_count++;
    })
    

    })
  }

  let states_selected = [];

  function newLine(){
    let newState = document.getElementById("selector").value;
    if (!states_selected.includes(newState)){
      states_selected.push(newState);
      dispKey();
    }
    build_pesticide(states_selected, false);
    build_fertilizer(states_selected, false);
    build_energy_input(states_selected, false);
    build_labor_input(states_selected, false);

    let key = document.getElementById("list");

    d3.selectAll().remove();



    

  }

  function removeLine(){
    let newState = document.getElementById("selector").value;

    d3.selectAll(newState).remove();

    if (states_selected.includes(newState)){
      const index = states_selected.indexOf(newState);
      states_selected.splice(index, 1);

      //console.log(states_selected);

      build_pesticide(states_selected, false);
      build_fertilizer(states_selected, false);
      build_energy_input(states_selected, false);
      build_labor_input(states_selected, false);

      dispKey();
    }
  
    //console.log(states_selected);
  }

  function dispKey(){
    let state_count = 0;
    d3.selectAll("li").remove()

    states_selected.forEach(item => {
      d3.select("#list")
        .append("li")
        .attr("class", "keypoint")
        .html(item + ": " + colors[state_count]);
      state_count ++;
    })
  }

  // selecting states works. find a way to turn the strings into function calls
  // so that the below functions take in a set of strings (selected states)
  // and plots their data. 

build_pesticide([], true);
build_fertilizer([], true);
build_energy_input([], true);
build_labor_input([], true);