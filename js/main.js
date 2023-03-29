const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const FRAME_WIDTH_LONG = 900;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;
const VIS_WIDTH_LONG = FRAME_WIDTH_LONG - MARGINS.left - MARGINS.right;

/**************************************************************/
/**************************************************************/
function build_outputs() {

  // append the svg object to the body of the page
  let svg = d3.select("#viz1")
    .append("svg")
      .attr("width", FRAME_WIDTH_LONG)
      .attr("height", FRAME_HEIGHT)
    .append("g")
      .attr("transform",
            "translate(" + MARGINS.left + "," + MARGINS.top + ")");

  // List of groups (here I have one group per column)
  let allGroup = ["Total Output", "All Livestock and Products",
    "Livestock and Products: Meat", "Livestock and Products: Dairy",
    "Livestock and Products: Poultry and Eggs", "All Crops", "Crops: Food Grains",
    "Crops: Feed Crops", "Crops: Oil Crops", "Crops: Vegetables and Melons",
    "Crops: Fruits and Tree Nuts", "Crops: Other"];

  // add the options to the button
  d3.select("#selectButton")
    .selectAll('myOptions')
   	.data(allGroup)
    .enter()
    	.append('option')
      .text(d => d)
      .attr("value", d => d);

  // Add X axis --> it is a date format
  let x = d3.scaleLinear()
    .domain([1960,2004])
    .range([ 0, VIS_WIDTH_LONG ]);
  svg.append("g")
    .attr("transform", "translate(0," + VIS_HEIGHT + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  let y = d3.scaleLinear()
    .domain( [0,425000])
    .range([ VIS_HEIGHT, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  //Read the data
  d3.csv("data_clean/table01a_F.csv").then(function(data) {
  /*
    let prev_point = [0, y(data[0]["Total.Output"])];

    for (let i = 0; i < 45; i++) {
      pest_svg.append("line")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr('x1', prev_point[0])
      .attr('y1', prev_point[1])
      .attr('x2', x(row[i].Year))
      .attr('y2', y(row[i]["Total.Output"]));

      prev_point = [x(row[i].Year), y(row[i].Value)];
    }*/

      // Initialize line with group a
      let line = svg
        .append('g')
        .append("path")
          .datum(data)
          .attr("d", d3.line()
            .x(function(d) { console.log(d["Year"]); return x(parseInt(d["Year"])); })
            .y(function(d) { console.log(d["Total Output"]); return y(parseInt(d["Total Output"])); })
          )
          .attr("stroke", "black")
          .style("stroke-width", 4)
          .style("fill", "none");

      // Initialize dots with group a
      let dot = svg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
          .attr("cx", function(d) { return x(parseInt(d["Year"])); })
          .attr("cy", function(d) { return y(parseInt(d["Total Output"])); })
          .attr("r", 7)
          .style("fill", "#69b3a2")

/*
      // A function that update the chart
      function update(selectedGroup) {

        // Create new data with the selection?
        const dataFilter = data.map(function(d){return {Year: d.Year, value:d[selectedGroup]} })

        // Give these new data to update line
        line
            .datum(dataFilter)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
              .x(function(d) { return x(+d.Year) })
              .y(function(d) { return y(+d.value) })
            )
        dot
          .data(dataFilter)
          .transition()
          .duration(1000)
            .attr("cx", function(d) { return x(+d.Year) })
            .attr("cy", function(d) { return y(+d.value) })
      }

      // When the button is changed, run the updateChart function
      d3.select("#selectButton").on("change", function(d) {
          // recover the option that has been chosen
          let selectedOption = d3.select(this).property("value")
          // run the updateChart function with this selected option
          update(selectedOption)
      })*/

  });
};

function build_stacked_outputs() {

  let svg = d3.select("#viz1")
    .append("svg")
      .attr("width", FRAME_WIDTH_LONG)
      .attr("height", FRAME_HEIGHT)
    .append("g")
      .attr("transform",
            "translate(" + MARGINS.left + "," + MARGINS.top + ")");

// Parse the Data
d3.csv("data_clean/table01a_F.csv").then(function(data) {

  // List of groups = header of the csv files
  let keys = data.columns.slice(1)

  // Add X axis
  let x = d3.scaleLinear()
    .domain([1960,2004])
    .range([ 0, VIS_WIDTH_LONG ]);
  svg.append("g")
    .attr("transform", "translate(0," + VIS_HEIGHT + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  let y = d3.scaleLinear()
    .domain([0, 450000])
    .range([ VIS_HEIGHT, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette
  let color = d3.scaleOrdinal()
    .domain(keys)
    .range(['#800000','#808000','#469990','#000075','#e6194B','#f58231',
    '##ffe119','#bfef45','#42d4f4','#4363d8','#911eb4','#f032e6'])

  //stack the data?
  let stackedData = d3.stack()
    .keys(keys)
    (data)
    //console.log("This is the stack result: ", stackedData)

  // Show the areas
  svg
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
      .style("fill", function(d) { console.log(d.key) ; return color(d.key); })
      .attr("d", d3.area()
        .x(function(d, i) { return x(d.data.year); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })
    )

})
}



const colors = ['steelblue', 'violet', 'forestgreen', 'darkred', 'grey', 'black', 'brown', 'orange'];

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
      pest_svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", 0 - FRAME_WIDTH/4)
            .attr("y", 0 - MARGINS.left)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Y-Value: check footnote");
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
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("x", 0 - FRAME_WIDTH/4)
          .attr("y", 0 - MARGINS.left)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Y-Value: check footnote");
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
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", 0 - FRAME_WIDTH/4)
            .attr("y", 0 - MARGINS.left)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Y-Value: check footnote");
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
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", 0 - FRAME_WIDTH/4)
            .attr("y", 0 - MARGINS.left)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Y-Value: check footnote");
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
build_outputs();
build_stacked_outputs();
