

  var barData = [{
    'x': '18-21',
    'y': 78.51
  }, {
    'x': '22-25',
    'y': 84.83
  }, {
    'x': '26-30',
    'y': 82.99
  }, {
    'x': '31-35',
    'y': 74.42
  }, {
    'x': '36-40',
    'y': 67.39
  }, {
    'x': '41-50',
    'y': 63.37
  }, {
    'x': '51-64',
    'y': 62.22
  }];

  var vis = d3.select('.bar')
    .append('svg')
    .attr('width', 1000)
    .attr('height', 500)

  var WIDTH = 1000

  var HEIGHT = 500

  var MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    }

  var xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(barData.map(function (d) {
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


  vis.append('svg:g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
    .call(xAxis);

  vis.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr('x', -25)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Percent of Male Income")
    .call(yAxis);



  vis.selectAll('rect')
    .data(barData)
    .enter()
    .append('rect')
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
    .attr('fill', '#ff6666');
