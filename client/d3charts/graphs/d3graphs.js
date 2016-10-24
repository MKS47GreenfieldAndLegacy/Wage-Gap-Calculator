

//feed template array called 'barData with objects of x,y values'

  var vis = d3.select('.bar')
    .append('svg')
    .attr('width', 800)
    .attr('height', 600)

  var WIDTH = 800

  var HEIGHT = 500

  var MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    }

  var xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left+20, WIDTH - MARGINS.right], 0.1).domain(barData.map(function (d) {
      return d.x;
    }))


  var yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([40,
      d3.max(barData, function (d) {
        return d.y+20;
      })
    ])

  var xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true)

  var yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient("left")
      .tickSubdivide(true);

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>Percent:</strong> <span style='color:orange'>"+d.y+"</span>";
    });

  vis.call(tip);


  vis.append('svg:g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
    .call(xAxis);

  vis.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (MARGINS.left+20) + ',0)')
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -60)
    .attr('x', -120)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Percent of Male Income")
    .call(yAxis);



  vis.selectAll('rect')
    .data(barData)
    .enter()
    .append('rect')
    .attr('class','rect')
    .attr('x', function (d) {
      return xRange(d.x);
    })
    .attr('y', function (d) {
      return yRange(d.y);
    })
    .attr('width', xRange.rangeBand())
    .attr('height', function (d) {
      return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
    })
    .attr('fill', '#ff6666')
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    

