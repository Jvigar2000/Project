// jameson Vigar 
// data vis Final 

d3.csv("PopSpot.csv").get(function(error,data){
    console.log(data);
})

document.getElementById('fileInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(e) {
        var csv = e.target.result;
        
        // Use D3.js to parse the CSV data
        d3.csvParse(csv, function(d) {
            return {
                // Parse your data columns here
                // For example:
                // Artist: d.Artist,
                // Popularity: +d.Popularity
            };
        }).then(function(data) {
            // Create visualization using D3.js
            createVisualization(data);
        });
    };
    
    reader.readAsText(file);
});

function createVisualization(data) {
    var svgWidth = 800;
    var svgHeight = 400;
    var margin = { top: 20, right: 20, bottom: 30, left: 40 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select('#visualization')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var x = d3.scaleLinear()
              .domain([0, d3.max(data, function(d) { return d.Popularity; })])
              .range([0, width]);

    var y = d3.scaleBand()
              .domain(data.map(function(d) { return d.Artist; }))
              .range([height, 0])
              .padding(0.1);

    svg.selectAll('.bar')
       .data(data)
       .enter()
       .append('rect')
       .attr('class', 'bar')
       .attr('x', 0)
       .attr('y', function(d) { return y(d.Artist); })
       .attr('width', function(d) { return x(d.Popularity); })
       .attr('height', y.bandwidth())
       .attr('fill', 'teal');

    svg.append('g')
       .attr('transform', 'translate(0,' + height + ')')
       .call(d3.axisBottom(x));

    svg.append('g')
       .call(d3.axisLeft(y));
}
