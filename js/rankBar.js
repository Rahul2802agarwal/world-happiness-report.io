
var margin = {top: 25, right: 30, bottom: 30, left: 60};
var width = 1200 - margin.left - margin.right;
var height = 1200 - margin.top - margin.bottom;


var svgBar = d3.select("#rankbar").append('svg')
            .attr('height','2400')
            .attr('display','block')
            .attr('width','1120');
var g = svgBar.append("g").attr("transform", "translate(190," + margin.top + ")");
   
var format = d3.format('.3r'); // round off the variable upto 2 decimal place

var y = d3.scaleBand()      // x = d3.scaleBand()
    .range([0, 2*height])  // .rangeRound([0, width])
    

var x = d3.scaleLinear()    // y = d3.scaleLinear()
    .rangeRound([0, width]);  // .rangeRound([height, 0]);


var radioYear = d3.select("#scatterYear")

radioYear.on("change", function(){
  scatterYear = d3.select('input[name="scatteryear"]:checked').property("id");
  
  d3.json(fileName(scatterYear), function(error, data) {
    if (error) throw error;

      // console.log(data)
    rankBar(data)
  })
  
});

d3.json("2019.json", function(error, data) {
  if (error) throw error;

  console.log(data)
  rankBar(data)


})

var fileName = function(scatterYear){

    if(scatterYear == '2019'){
      return'2019.json'
    }
    else  if(scatterYear == '2018'){
      return'2018.json'
    }
    else  if(scatterYear == '2017'){
      return'2017.json'
    }
    else  if(scatterYear == '2016'){
      return'2016.json'
    }
    else  if(scatterYear == '2015'){
      return'2015.json'
    }



}

