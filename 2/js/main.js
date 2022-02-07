var csvData = [];
var tooltip = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

function readImage(input) {
    //console.log(input)
	if (input.files && input.files[0]) {
		let reader = new FileReader();
		    reader.readAsBinaryString(input.files[0]);
		reader.onload = function (e) {
			csvData = $.csv.toObjects(e.target.result);
			//console.log(csvData);
			displayChat(csvData);
		}
	}
}
const displayChat = (data) => {
// set the dimensions and margins of the graph
	var margin = {top: 10, right: 30, bottom: 30, left: 60},
	    width = 500 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select("#main")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform",
		      	"translate(" + margin.left + "," + margin.top + ")");

	//Read the data
	  // Add X axis
	var x = d3.scaleLinear()
		.domain([0, 100])
		.range([ 0, width ]);
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	// Add Y axis
	var y = d3.scaleLinear()
		.domain([0, 5])
		.range([ height, 0]);
		svg.append("g")
		.call(d3.axisLeft(y));

	  // Add dots
	svg.append('g')
		.selectAll("dot")
		.data(data)
		.enter()
		.append("circle")
		  .attr("cx", function (d) { return x(d.duration); } )
		  .attr("cy", function (d) { return y(d.rating); } )
		  .attr("r", 5)
		  .style("fill", "#69b3a2")
		  .on("mouseover", function(d) { // mouseenter to circle
	          tooltip.transition()
	               .duration(200)
	               .style("opacity", .9);
	          tooltip.html(d["name"])
	               .style("left", (d3.event.pageX + 5) + "px")
	               .style("top", (d3.event.pageY - 28) + "px");
	      })
	      .on("mouseout", function(d) { // mouseout to circle
	          tooltip.transition()
	               .duration(500)
	               .style("opacity", 0);
	      });
    // display labels in x,y-axis
	svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Duration");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Average rating");

    // Add grid to svg
    const xAxis2 = d3.axisBottom(x).ticks(10);
	var xAxisGrid = svg.append("g")         
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis2
        	.tickSize(-height)
            .tickFormat("")
        );
    xAxisGrid.selectAll('.domain')
        .attr({
          fill: 'none',
          stroke: 'none'
        });
    xAxisGrid.selectAll('.tick line')
        .attr("fill","none")
        .attr('stroke-width', 1)
        .attr("stroke",'lightgray');

    const yAxis2 = d3.axisLeft(y).ticks(10);
	var yAxisGrid = svg.append("g")         
        .attr("class", "grid")
        .call(yAxis2
        	.tickSize(-width)
            .tickFormat("")
        );
    yAxisGrid.selectAll('.domain')
        .attr({
          fill: 'none',
          stroke: 'none'
        });
    yAxisGrid.selectAll('.tick line')
        .attr("fill","none")
        .attr('stroke-width', 1)
        .attr("stroke",'lightgray');
    // svg.append("g")         
    //     .attr("class", "grid")
    //     .call(make_y_axis(y)
    //         .tickSize(-width, 0, 0)
    //         .tickFormat("")
    //     );
}