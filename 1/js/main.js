// the main student data
let mainData = [{"Student": 1, "marks": 6},
	{ "Student": 2, "marks": 100},
	{ "Student": 3, "marks": 90},
	{ "Student": 4, "marks": 55},
	{ "Student": 5, "marks": 83},
	{ "Student": 6, "marks": 88},
	{ "Student": 7, "marks": 91},
	{ "Student": 8, "marks": 92},
	{ "Student": 9, "marks": 67},
	{ "Student": 10, "marks": 73}
];

let currentData = []; // display data
var deleteCount = 0;

$(document).ready(function(){
	// first sort
	sortData();
	// initArray();
	// console.log(currentData);
	displayChat(currentData);
});
/**
* @desc sort student data
*/
const sortData = () =>{
	mainData.sort(function(a,b) {return a.marks - b.marks});
	initArray();
	displayChat(currentData);
}
/**
* @desc Display chat with the student data using D3.js
*/
const displayChat = (data) => {
	var margin = {top: 20, right: 20, bottom: 20, left: 20};
	var width = 500 - margin.left - margin.right;
	var height = 500 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	$("svg#main").html("");
	var svg = d3.select("#main")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform",
	          "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
    	.domain([0, 100])
	    .range([ 0, width]);

	svg.append("g")
	    .attr("transform", "translate(0," + height + ")")
	    .call(d3.axisBottom(x))
	    .selectAll("text")
	      .attr("transform", "translate(5,0)rotate(0)")
	      .style("text-anchor", "end");

	// Y axis
	var y = d3.scaleBand()
	    .range([ 0, height ])
	    .domain(data.map(function(d) { return d.Student; }))
	    .padding(.1);
	svg.append("g")
	    .call(d3.axisLeft(y))

	//Bars
	svg.selectAll("myRect")
	    .data(data)
	    .enter()
	    .append("rect")
	    .attr("x", x(0) )
	    .attr("y", function(d) { return y(d.Student); })
	    .attr("width", function(d) { return x(d.marks); })
	    .attr("height", y.bandwidth() )
	    .attr("fill", "#69b3a2");
};

/**
* @desc delete the three bars representing students with least marks from the graph
*/
function delete3Student(){
	//currentData.splice(0,3);
	deleteCount += 3;
	for ( let i = 0; i < currentData.length; i++){
		if ( i < deleteCount )
			currentData[i].marks = 0;
	}
	displayChat(currentData);
}
/**
* @desc show all student graph
*/
function viewAllStudent(){
	initArray();
	displayChat(currentData);
}

function initArray(){
	currentData = [];
	for ( var i = 0; i < mainData.length; i++){
		var student = {Student: mainData[i].Student , marks: mainData[i].marks};
		currentData[i] = student;
	}
	deleteCount = 0;
}