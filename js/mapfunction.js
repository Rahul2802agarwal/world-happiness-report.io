var DrawMap = function(mapData, happyData,selectedYear,selectedCountry){

  var mapDataYear = happyData.filter(function(happyd){return happyd.year == selectedYear;});

  let countrySelect = function(d){

      currentCountry = mapDataYear.filter(function(data){return data.country == d.properties.name;});


      d3.selectAll('.mapbar').remove();
      d3.selectAll('.countryText').remove();
      d3.selectAll('.happyface').remove();

      if(selectedCountry == d.properties.name)
      {
        d3.selectAll(".Country")
            .transition()
            .duration(200)
            .style("opacity", 1)

          selectedCountry = ''

      }
      else{
          svg.append('text').text(d.properties.name)
          .attr('stroke','red')
          .attr("id","countryText")
          .attr('stroke-width','0.5')
          .attr('fill', 'white')
          .attr('font-size','40')
          .attr('class','countryText')
          .attr('x',width-260)
          .attr('y', 50);

        if(currentCountry.length !=0)
        {
          d3.selectAll(".Country")
              .transition()
              .duration(200)
              .style("opacity", 0.2)
              

        d3.select(this)
              .transition()
              .duration(200)
              .style("opacity",1)
              
        
        var imgs = svg.append("image")
            .attr("xlink:href", imageName(d.score))
            .attr("x", width-230)
            .attr("y", "60")
            .attr("width", "50")
            .attr("height", "50")
            .attr("class",'happyface countryText');


           svg.append('text').text("Rank #" + currentCountry[0].rank)
            .attr('stroke','red')
            .attr("id","countryText")
            .attr('stroke-width','0.5')
            .attr('fill', 'white')
            .attr('font-size','25')
            .attr('class','countryText')
            .attr('x',width-260)
            .attr('y', 140);

            DrawBar(currentCountry[0])
        }
        else{

            svg.append('text').text("Data is not Avaiable")
            .attr('stroke','red')
            .attr("id","countryText")
            .attr('stroke-width','0.5')
            .attr('fill', 'white')
            .attr('font-size','25')
            .attr('class','countryText')
            .attr('x',width+30)
            .attr('y', 140);

        }
      
        selectedCountry = d.properties.name
      }
    }

  svg.append('g')
      .selectAll('path')
      .data(mapData.features)
      .enter()
      .append("path")
      .attr("d",d3.geoPath()
      .projection(projection))
      // set the color of each Country
      .attr("fill", function(d){
              currentCountry = mapDataYear.filter(function(data){return data.country == d.properties.name;});
              if(d3.set(currentCountry).empty()){
              d.score = -1
              }
              else{

              d.score = currentCountry[0].score
              }

              return mapColor(d.score);

          })
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8  )
      .attr('stroke',function(d){
              return mapStroke(d.score);

          })
      .on("click",countrySelect);

      mapLengend()

}

var mapColor = function(score){


    if(score == -1){
      return '#808088'
    }
    else if(score>=2.5 && score<3.5){
        return '#87011c'
    }
    else if(score>=3.5 && score<4.5){
        return 'rgb(235, 29, 36)'
    }
    else if(score>=4.5 && score<5.5){
        return 'rgb(119, 91, 157)'
    }
    else if(score>=5.5 && score<6.5){
        return '#d0743c'
    }
    else if(score>=6.5 && score<7.5){
        return '#569b56'
    }
    else if(score>=7.5 && score<8.5){
        return '#166316'
    }

}
var mapStroke = function(score){


    if(score == -1){
      return 'none'
    }
    else{
        return 'black'
      }

}

var imageName = function(score){
    if(score>=2.5 && score<3.5){
        return 'images/depressed.jpg'
    }
    else if(score>=3.5 && score<4.5){
        return 'images/sad.jpg'
    }
    else if(score>=4.5 && score<5.5){
        return 'images/unhappy.jpg'
    }
    else if(score>=5.5 && score<6.5){
        return 'images/satisfied.jpg'
    }
    else if(score>=6.5 && score<7.5){
        return 'images/joyful.png'
    }
    else if(score>=7.5 && score<8.5){
        return 'images/exuberant.png'
    }
}

var DrawCircle = function(){
    var dataArray= [2015,2016,2017,2018,2019] // circle data
        var circleGroup = svg.append('g').attr('transform','translate(0,0)'); // circle and text group

        var circleDraw = circleGroup.selectAll('circle')
                             .data(dataArray)
                             .enter()
                             .append('circle')
                             .attr("cx",'30')
                             .attr("cy",'100')
                             .attr("r",'30')
                             .attr("fill","white")
                             .attr("stroke",'black')
                             .attr("class",function(d){return "y"+d.toString() + " yearProp"+ " yearCircle";});

        var textDraw=   circleGroup.append('text')
                            .selectAll('tspan')
                            .data(dataArray).enter().append('tspan')
                            .attr('x', "25")
                            .attr('y',"100")
                            .attr('stroke','none')
                            .attr('stroke-width','0.5')
                            .attr('fill', 'green')
                            .attr('font-size','15')
                            .text(function(d){return d})
                            .attr("class",function(d){return "y"+d.toString() + " yearCircle"+ " yearText";});
        circleDraw
            .transition()
            .duration(3000)
            .delay(2500)
            .attr("cx",function(d,i){return 200*i + 100})
            .attr("cy",250)
            .style("fill","white")
            .attr("r",50);

        textDraw
            .transition()
            .duration(3000)
            .delay(2500)
            .attr("x",function(d,i){return 200*i + 90})
            .attr("y",250);
    return(circleDraw)

}

var DrawLine = function(currentCountry,currentCountry2){
    var height = 300;
      var width = 500;

      var max = d3.max(currentCountry,function(d){ return d.score; });
      var minDate = d3.min(currentCountry,function(d){ return d.year; });
      var maxDate = d3.max(currentCountry,function(d){ return d.year; });

      var y = d3.scaleLinear()
                  .domain([4,8])
                  .range([height,0]);
      var x = d3.scaleTime()
                  .domain([minDate,maxDate])
                  .range([0,width]);
      var yAxis = d3.axisLeft(y);
      var xAxis = d3.axisBottom(x).ticks(5).tickFormat(d => d.getFullYear());

      var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

      var margin = {left:50,right:50,top:40,bottom:0};

      var chartGroup = svg.append("g")
                  .attr("transform","translate("+margin.left+","+margin.top+")");

      var line = d3.line()
                      .x(function(d){ return x(d.year); })
                      .y(function(d){ return y(d.score); });

      chartGroup.append("path")
                .attr('fill',"none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d",line(currentCountry));
     chartGroup.append("path")
                .attr('fill',"none")
                .attr("stroke", "red")
                .attr("stroke-width", 2)
                .attr("d",line(currentCountry2));
      chartGroup.append("g").attr("class","x axis").attr("transform","translate(0,"+height+")").call(xAxis);
      chartGroup.append("g").attr("class","y axis").call(yAxis);

}

var dataHandle = function(d){
    return {
            
            gdp: parseFloat(d.gdp),
            family: parseFloat(d.family),
            life: parseFloat(d.life),
            freedom: parseFloat(d.freedom),
            trust: parseFloat(d.trust),
            generosity: parseFloat(d.generosity),
            
          };
}

var DrawBar =  function(country){

  country = dataHandle(country)
  result = Object.entries(country).map(([id, value]) => ({ id, value }));

 
  
  var margin = {top: 20, right: 20, bottom: 70, left: 40},
      width1 = 500 - margin.left - margin.right,
      height1 = 250 - margin.top - margin.bottom;
  // set the ranges
  var x = d3.scaleBand()
            .range([0, width1])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height1 , 0]);

   x.domain(result.map(function(d) { return d.id; }));
   y.domain([0, 2]);
 
   

    // define the axis

    var xAxis = d3.axisBottom()
                 .scale(x + width1);

    var yAxis = d3.axisLeft()
                  .scale(y)


 
  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(result)
      .enter().append("rect")
      .attr("class", "bar mapbar")
      .attr("x", function(d) { return width-287+x(d.id); })
      .attr("width", x.bandwidth())
      .attr('fill','#6b486b')
      .attr("y", function(d) { return 200+y(d.value); })
      .attr("height", function(d) { return height1 - y(d.value); });

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(820,365)")
      .attr('class','mapbar baraxis')
      // .attr('font-size','16px')

      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .attr("transform","translate(820,200)")
      .attr('class','mapbar baraxis')
      // .attr('font-size','16px')
      .call(d3.axisLeft(y));
}
  
var mapLengend = function(){

  var data = ['Depressed', 'Sad', 'Unhappy', 'satisfied', 'Joyfull', 'Exberant']
  var colorCode = d3.scaleOrdinal()
    .range(['#87011c','rgb(235, 29, 36)','rgb(119, 91, 157)','#d0743c','#569b56','#166316']);

  var legend = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(data)
    .enter().append("g")
    //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
   // .attr("transform", function(d, i) { return "translate(-150," + (340 + i * 20) + ")"; });


  legend.append("rect")
      .attr("x", function(d,i){ return  width - 510 })
      .attr("y", function(d,i){return height - 795 + i*20})
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", colorCode);

  legend.append("text")
      .attr('class','legendText')
      .attr("x", function(d,i){ return  width - 513 })
      .attr("y",function(d,i){return height - 785 + i*20})
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
}


var rankBar =  function(data){
  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  data = data.sort(function (a, b) {
            return d3.ascending(a.score, b.score);
        })
  var x = d3.scaleLinear()
            .range([0, width/1.2])
            .domain([0, d3.max(data, function (d) {
                return d.score;
            })]);
    var y =d3.scaleBand()
            .range([1.5*height, 0])
            .domain(data.map(function (d) {
                return d.country;
            }));

    // format the data
  data.forEach(function(d) {
    d.score = +d.score;
  });

  // Scale the range of the data in the domains
  x.domain([0, d3.max(data, function(d){ return d.score; })])
  y.domain(data.map(function(d) { return d.country; }));

    d3.selectAll('.rank_rect').remove();
    d3.selectAll('.rankaxis').remove();

      // append the rectangles for the bar chart
  g.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar rank_rect")
      //.attr("x", function(d) { return x(d.sales); })
      .attr("width", function(d) {return x(d.score); } )
      .attr("y", function(d) { return y(d.country); })
      .attr('fill','#7b6888')
      .attr('stroke','black')
      .attr("height", y.bandwidth())
      .on("mouseover", function(d) {
            tooltip.transition()
                 .duration(200)
                 .style("opacity", .9);
            tooltip.html(d.country + "<br/> (" + d.score + ")")
                 .style("left", (d3.event.pageX + 5) + "px")
                 .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                 .duration(500)
                 .style("opacity", 0);
              tooltip.html("")
        });
  // add the x Axis
  g.append("g")
      .attr("transform", "translate(0," + 1.5*height + ")")
      .attr('class','rankaxis')
      .call(d3.axisBottom(x));

  // add the y Axis
  g.append("g")
  .attr('class','rankaxis')
      .call(d3.axisLeft(y));
  
}


 
var scatterComparison =  function(data, year, parameter){
   var yearData = data.filter(function(happyd){return happyd.year == year;});
   
   console.log(parameter)
   // add the tooltip area to the webpage
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      d3.selectAll('.scatter_xaxis').remove();
      // // Add X axis
      var x = d3.scaleLinear()
        .domain([0, d3.max(yearData, function(d) {return format(d[parameter]); })])
        .range([ 0, width - 600 ]);
      scatterSvg.append("g")
        .attr("transform", "translate(0, 550)")
        .attr("class",'scatter_xaxis')
        .call(d3.axisBottom(x));



      // Add Y axis
      var y = d3.scaleLinear()
        .domain([2.5, d3.max(data, function(d) {return format(d.score); })])
        .range([ height-600, 0]);
      scatterSvg.append("g")
        .call(d3.axisLeft(y));

    d3.selectAll('.scattercircle').remove();
    // Add circles
    scatterSvg.append('g')
      .selectAll("dot")
      .data(yearData)
      .enter()
      .append("circle")
        .attr("cx", function (d,i) { return x(d[parameter]); } )
        .attr("cy", function (d,i) { return y(d.score); } )
        .attr("r", 10)
        .attr('class', function(d){return 'scattercircle '+d.Continent})
        .style("fill", function(d){
          return regionColor(d.Continent)

        })
        .attr('stroke','black')
        .attr('opacity','0.7')
         .on("mouseover", function(d) {
            tooltip.transition()
                 .duration(200)
                 .style("opacity", .9);
            tooltip.html(d.country + "<br/> (" + d.gdp 
            + ", " + d.score + ")")
                 .style("left", (d3.event.pageX + 5) + "px")
                 .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                 .duration(500)
                 .style("opacity", 0);
              tooltip.html("")
        });
      d3.selectAll('.scatterText').remove();
         scatterSvg.append('text').text(parameter)
          .attr('stroke','red')
          .attr('fill', 'white')
          .attr('stroke','none')
          .attr('font-size','20')
          .attr('class','scatterText')
          .attr("transform", "translate(0, 550)")
          .attr('x','10')
          .attr('y', 50);

          scatterSvg.append('text').text('Happiness score')
          .attr('stroke','red')
          .attr("id","scatterText")
          .attr('fill', 'white')
          .attr('stroke','none')
          .attr('font-size','20')
          .attr('class','countryText')
          .attr("transform", "rotate(90)")
          .attr('x','10')
          .attr('y', '50');

      scatterLengend()
}

var regionColor = function(region){


  if(region == "Asia"){
    return '#87011c'
  }
  else if(region == 'Australia'){
    return 'rgb(119, 91, 157)'
  }
  else if(region == "Europe"){
    return 'rgb(104, 202, 215)'
  }
  else if(region == "Africa"){
    return '#d0743c'
  }
  else if(region == "South America"){
    return '#569b56'
  }
  else if(region == "North America"){
    return 'yellow'
  }

}

var scatterLengend = function(){

  var selectedLegend = 'none'

  var data = ['Asia', 'Australia', 'Europe', 'Africa', 'South America', 'North America']
  var colorCode = d3.scaleOrdinal()
    .range(['#87011c','rgb(119, 91, 157)','rgb(104, 202, 215)','#d0743c','#569b56','yellow']);

  var legend = scatterSvg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(data)
    .enter().append("g")

  legend.append("rect")
      .attr("x", function(d,i){ return  width - 510 })
      .attr("y", function(d,i){return height - 795 + i*20})
      .attr("width", 19)
      .attr("height", 19)
      .attr('opacity','0.7')
      .attr("fill", colorCode)
      .on('click', function(d){
        if(d == selectedLegend)
        {
          d3.selectAll(".scattercircle")
          .style("opacity",1)

          selectedLegend = ''
        }
        else{

          if(d == 'North America')
          {
            d3.selectAll(".scattercircle")
            .style("opacity",0.2)
            d3.selectAll(".North")
            .style('opacity',1)
          }
          else if(d=='South America')
          {
            d3.selectAll(".scattercircle")
            .style("opacity",0.2)
            d3.selectAll(".South")
            .style('opacity',1)
          }
          else{

            d3.selectAll(".scattercircle")
              .style("opacity",0.2)
            d3.selectAll("."+d.split()[0])
              .style('opacity',1)
          }
          selectedLegend = d

        }

      });

  legend.append("text")
      .attr('class','legendText')
      .attr("x", function(d,i){ return  width - 513 })
      .attr("y",function(d,i){return height - 785 + i*20})
      .attr("dy", "0.32em")
      .text(function(d) { return d; })

}
