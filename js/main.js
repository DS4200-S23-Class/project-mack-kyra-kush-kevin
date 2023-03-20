var map = d3.choropleth()
    .geofile('/d3-geomap/topojson/countries/USA.json')
    .projection(d3.geoAlbersUsa)
    .column('2012')
    .unitId('fips')
    .scale(1000)
    .legend(true);