var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

 // append the svg object to the body of the page
var scatterSvg = d3.select("#scattercomparison")
  .append("svg")
    .attr("width", '100%' )
    .attr("height", '700')
    .attr('display','block')
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//------------------------------------------------------------------------//
    
var scatterYear = '2019';
var scatterParameter = 'gdp'
var format = d3.format('.2r'); // round off the variable upto 2 decimal place


var radioYear = d3.select("#radioYear")
var radioParameter = d3.select("#radioparameter")

radioYear.on("change", function(){
  scatterYear = d3.select('input[name="year"]:checked').property("id");
  scatterParamter = d3.select('input[name="parameter"]:checked').property("id");
  console.log(scatterYear)

  d3.csv('data.csv')
  .row(function(d){
    return {country: d.country,
            region: d.region,
            rank: parseFloat(d.rank),
            score: parseFloat(d.score),
            gdp: parseFloat(d.gdp),
            family: parseFloat(d.family),
            life: parseFloat(d.life),
            freedom: parseFloat(d.freedom),
            trust: parseFloat(d.trust),
            generosity: parseFloat(d.generosity),
            year: d.year,
            Continent: d.Continent
          };
    })
  .get(function(error, data){
  	if (error) throw error;

  		scatterComparison(data,scatterYear,scatterParameter)

  })
  
})

// ---------------------------------------------------------radioYear----------------------------------//
radioParameter.on("change", function(){
   scatterYear = d3.select('input[name="year"]:checked').property("id");
  scatterParameter = d3.select('input[name="parameter"]:checked').property("id");
  console.log(scatterParameter)

  d3.csv('data.csv')
  .row(function(d){
    return {country: d.country,
            region: d.region,
            rank: parseFloat(d.rank),
            score: parseFloat(d.score),
            gdp: parseFloat(d.gdp),
            family: parseFloat(d.family),
            life: parseFloat(d.life),
            freedom: parseFloat(d.freedom),
            trust: parseFloat(d.trust),
            generosity: parseFloat(d.generosity),
            year: d.year,
            Continent: d.Continent
          };
    })
  .get(function(error, data){
  	if (error) throw error;

  		scatterComparison(data,scatterYear,scatterParameter)

  })
  
})


//------------------load the csv file-----------------------------------//
  d3.csv('data.csv')
  .row(function(d){
    return {country: d.country,
            region: d.region,
            rank: parseFloat(d.rank),
            score: parseFloat(d.score),
            gdp: parseFloat(d.gdp),
            family: parseFloat(d.family),
            life: parseFloat(d.life),
            freedom: parseFloat(d.freedom),
            corruption: parseFloat(d.corruption),
            generosity: parseFloat(d.generosity),
            year: d.year,
            Continent: d.Continent
          };
    })
  .get(function(error, data){
  	if (error) throw error;

  		scatterComparison(data,scatterYear,scatterParameter)

  })