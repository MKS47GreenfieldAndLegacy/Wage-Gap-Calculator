//it would be good to refactor to not need two separate controllers/html skeletons for bar and state
//since they share so much code in common

angular.module('wageGap.makebargraph', [])
.factory('Graphs', function () {

  var fac = {};
  fac.barGraph = function (barData) {


    //feed template array called 'barData with objects of x,y values'
    var Max = 0;
    barData.forEach(function(data){
      if(data.x.length>Max){
        Max = data.x.length;
      }
    });
    //^ Helps scale size of svg on page based on longest length of x-axis data

      var vis = d3.select('.bar')
        .append('svg')
        .attr('width', 1000)
        .attr('height', 700 + Max*4)

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


      vis.append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

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
  };

  return fac;
  })
.controller('MakeBarGraphController', ['$scope', '$http', 'Graphs', function ($scope, $http, Graphs) {

  $scope.data = {
    selected: ['Gender'],
    potentials: [
      // 'Age',//leaving out age to decrease the number of necessary API variables for basic skeleton
      // 'Gender',//making gender autoselected for skeleton version
      'Occupation',
      'Race',
      'State'
    ],
    profiles: [],
    profilesnum: 0,
    options: {
      // age: ['15-19','20-24','25-29','30-34','35-39','40-44','45-49','50-54','55-59','60-65'],
      Gender: ['Male', 'Female'],
      Occupation: [
        'Management',
        'Business and financial operations',
        'Computer and mathematical',
        'Architecture and engineering',
        'Life, physical, and social science',
        'Community and social services',
        'Legal',
        'Education, training, and library',
        'Arts, design, entertainment, sports, and media',
        'Healthcare practitioner and technical',
        'Healthcare support',
        'Protective service',
        'Food preparation and serving related',
        'Building and grounds cleaning and maintenance',
        'Personal care and service',
        'Sales and related',
        'Office and administrative support',
        'Farming, fishing, and forestry',
        'Construction and extraction',
        'Installation, maintenance, and repair',
        'Production',
        'Transportation',
        'Material moving'
      ],
      Race: ['White','African-American/Black','American Indian/Alaskan Native','Asian','Pacific Islander','Other'],
      State: [
        "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID",
        "IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM",
        "NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
      ]
    },
    newGraphData: {}
  };

  $scope.newBarGraph = function () {
    console.log('hi');
      d3.select('.main')
        .insert('div','.first')
        .classed('first', true)
        .classed('bar', true);
      console.log('graphs?:', Graphs);

      var data = $scope.data.options[$scope.data.selected[1]].map(function (option) {
        var yVal;
        // var income = $scope.data.fullData.find(function (dataObj) {
        //   return dataObj[$scope.data.selected[1]] === option;
        // }).income;
          return {'x': option, 'y': Math.abs(Math.random()*100)};
      });

      Graphs.barGraph(data);

      d3.select('.states').classed('first', false);

  };

  //initializes empty profiles with selected variables on choosing the number of people to compare
  $scope.initializeProfiles = function () {
    $scope.data.profiles = [];
    for(var i = 0; i < Number($scope.data.profilesnum); i++){
      // +1 /-1 to deal with 0-indexed profile array versus normal counting of number of people
      $scope.data.profiles.push({number: i + 1});
      $scope.data.selected.forEach(function(variable) {
        $scope.data.profiles[i][variable] = null;
      });
    }
  };

//sends the query to the server
$scope.query = function (profile, variable) {
  //set the data to send as only gender and the currently selected other variable
  //otherwise there are issues with old data still attached to the profile when changing variables
  var dataToSend = {
    Gender: profile.Gender
  };
  dataToSend[variable] = profile[variable];

  $http({
    method: 'POST',
    url: '/graph',
    data: dataToSend
  }).then(function (responseBody) {
    console.log('res body data', responseBody.data);
    $scope.newGraphData = responseBody.data;
    console.log(profile);
    $scope.data.newGraphData.id = profile.number;
    console.log($scope.data.newGraphData.id);
  });
  // console.log(profile, dataToSend);
};

  //checks if an variable is in selected array to display it as checked or not
  // $scope.exists = function (item, list) {
  //   return list.indexOf(item) > -1;
  // };

  //toggles checkboxes
  //doesn't toggle gender (auto-included in current model)
  // $scope.toggle = function (item, list) {
  //   if(item !== 'Gender'){
  //     var i = list.indexOf(item);
  //     if(i > -1){
  //       list.splice(i, 1);
  //     } else {
  //       list.push(item);
  //     }
  //   }
  // };

  //for radio buttons (delete if switched to checkboxes)
  // $scope.toggle = function (item, list) {
  //   list.splice(1);
  //   list.push(item);
  // };
}]);
