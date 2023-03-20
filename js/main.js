import {us, states, statemesh, Choropleth, Legend} from "@d3/choropleth"


function UsStateChoropleth(data, {
	features = states,
	border = statemesh,
	width = 8975,
	height = 610,
	...options
} = {}) {
	return Choropleth(data, {features, borders, width, height, ...options});
}

chartData = FileAttachment("table01a.xlsx").csv({typed: true})


chart = UsStateChoropleth(chartData, {
  id: d => namemap.get(d.name),
  value: d => d.rate,
  scale: d3.scaleQuantize,
  domain: [1, 7],
  range: d3.schemeBlues[6],
  title: (f, d) => `${f.properties.name}\n${d?.rate}%`
})


UsStateChoropleth(data, options);