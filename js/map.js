//---- height and width  for the svg elements-----/
var height = 500
var width = 800
//----------------------------------------------//

//-------------------svg element ---------------//
var svg = d3.select('#details').append('svg')
            .attr('height','500')
            .attr('width','100%');
//---------------------------------------------//

//--------------map and projection---------------//
var path = d3.geoPath();
var projection = d3.geoMercator()
                    .scale(110)
                    .center([0,30])
                    .translate([width/1.8,height/2]);
//-----------------------------------------------//


var selectedYear = '2019';
var selectedCountry = ''
var format = d3.format('.2r'); // round off the variable upto 2 decimal place

//------------------load the csv file---------------------//

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
  .get(function(error, happyData){
//--------reading the map data----------------------------//
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .get(function(error, mapData){
        //----------------circle and text svg --------------------//
        circleDraw = DrawCircle();
        
        circleDraw  // click the circle to set it properties 
            .on("click",function(d){
                selectedYear = d

                d3.selectAll('.yearProp')
                   .transition()
                    .duration(3000)
                    .delay(function(d, i){return i * 200})
                    .attr("cx",'4%')
                    .attr('position','absolute')
                    .attr("cy",function(d,i){return 80*i + 100})
                    .attr("r",'17');
            

                d3.selectAll('.yearText')
                    .transition()
                    .duration(3000)
                    .delay(function(d, i){return i * 200})
                    .attr("x", "5.5%")
                    .attr('position','absolute')
                    .style('fill','black')
                    .attr("y",function(d,i){return 80*i + 80});



                d3.selectAll(".yearProp")
                     .style("opacity", 0.6)
                     .style('stroke','black')
                     .style("fill","white");
            
                d3.selectAll(".y"+d)
                     .style("opacity",1)
                     .style("fill",'#e8c251')
                     .style('stroke','black');

            d3.selectAll('.Country').remove();
            d3.selectAll('.countryText').remove();
            d3.selectAll('.mapbar').remove();
//        CountrySelect(mapData, happyData, selectedYear);
        DrawMap(mapData, happyData, selectedYear,selectedCountry);


//--------------------------------lengend--------------------------------------------------------------//


//----------------------------------lengend end-------------------------------------------------------//


        
        });
  })
    
});
























