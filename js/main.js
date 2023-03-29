const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const FRAME_WIDTH_LONG = 900;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;
const VIS_WIDTH_LONG = FRAME_WIDTH_LONG - MARGINS.left - MARGINS.right;

/**************************************************************/
/**************************************************************/
// append the svg object to the body of the page
var svg = d3.select("#viz1")
  .append("svg")
    .attr("width", FRAME_WIDTH_LONG)
    .attr("height", FRAME_HEIGHT)
  .append("g")
    .attr("transform",
          "translate(" + MARGINS.left + "," + MARGINS.top + ")");

//Read the data
d3.csv("data_clean/table01a.csv", function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["Total Output", "All Livestock and Products",
    "Livestock and Products: Meat", "Livestock and Products: Dairy",
    "Livestock and Products: Poultry and Eggs", "All Crops", "Crops: Food Grains",
    "Crops: Feed Crops", "Crops: Oil Crops", "Crops: Vegetables and Melons",
  "Crops: Fruits and Tree Nuts", "Crops: Other"]

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(d => d)
      .attr("value", d => d)

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([1960,2004])
      .range([ 0, VIS_WIDTH_LONG ]);
    svg.append("g")
      .attr("transform", "translate(0," + VIS_HEIGHT + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,425000])
      .range([ VIS_HEIGHT, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Initialize line with group a
    var line = svg
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) { return x(+d.Year) })
          .y(function(d) { return y(+d["Total output: Quantity (million, $2015)"]) })
        )
        .attr("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "none")

    // Initialize dots with group a
    var dot = svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr("cx", function(d) { return x(+d.Year) })
        .attr("cy", function(d) { return y(+d["Total output: Quantity (million, $2015)"]) })
        .attr("r", 7)
        .style("fill", "#69b3a2")


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
    })

})



/**************************************************************/
/**************************************************************/


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




function build_pesticide(states){


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

      firstRun = 0;



    // Add the line

    states.forEach(item => {
      let prev_point = [0, y(data[0].Value)];

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
        .attr('y2', y(row[i].Value))
        .on("mouseover", function(event, d){
          d3.select(item).style("opacity", 9);
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


    })





  })


}
  function build_fertilizer(states){
  states = Array.from(states);

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
  d3.csv("data_clean/fertilizer_consumption_F.csv").then((data) => {

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
      let prev_point = [0, y(data[0].Value)];

      row = data.filter(function(d){ return d.State == item; });
      //console.log(row[1].Year);



      for (let i = 0; i < 45; i++) {
        fert_svg.append("line")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
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
    d3.csv("data_clean/energy_input_F.csv").then((data) => {

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
      let prev_point = [0, y(data[0].Value)];

      row = data.filter(function(d){ return d.State == item; });



      for (let i = 0; i < 45; i++) {
        energy_svg.append("line")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
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
    })





  })
  }

  function build_labor_input(states){
    d3.selectAll("line").remove();

    states = Array.from(states);

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
  d3.csv("data_clean/labour_input_F.csv").then((data) => {



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

    states.forEach(item => {
      let prev_point = [0, y(data[0].Value)];

      row = data.filter(function(d){ return d.State == item; });



      for (let i = 0; i < 45; i++) {
        labor_svg.append("line")
        .datum(data)
        //.enter()
        .attr("id", item)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr('x1', prev_point[0])
        .attr('y1', prev_point[1])
        .attr('x2', x(row[i].Year))
        .attr('y2', y(row[i].Value))
        .on("mouseover", function(event, d){
          d3.select(item).style("opacity", 9);
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

    })


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

    let key = document.getElementById("list");

    d3.selectAll().remove();

    states_selected.forEach(item => {
      key.innerHTML += "<li id='"+ item + "'>" + item + 'color</li>'
    })

  }

  function removeLine(){
    let newState = document.getElementById("selector").value;

    d3.selectAll(newState).remove();

    if (states_selected.includes(newState)){
      const index = states_selected.indexOf(newState);
      states_selected.splice(index, 1);

      //console.log(states_selected);

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
