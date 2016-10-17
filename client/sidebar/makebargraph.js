//it would be good to refactor to not need two separate controllers/html skeletons for bar and state
//since they share so much code in common


angular.module('wageGap.makebargraph', [])
.controller('MakeBarGraphController', ['$scope', function ($scope) {

  $scope.data = {
    selected: [],
    potentials: [
      // 'Age',//leaving out age to decrease the number of necessary API variables for basic skeleton
      'Gender',
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
        'Agriculture, Forestry, Fishing, and Hunting, and Mining',
        'Construction',
        'Manufacturing',
        'Wholesale Trade',
        'Retail Trade',
        'Transportation and Warehousing and Utilities',
        'Information',
        'Finance and Insurance, and Real Estate, and Rental and Leasing',
        'Professional, Scientific, and Management, and Administrative, and Waste Management Services',
        'Educational Services, and Health Care and Social Assistance',
        'Arts, Entertainment, and Recreation, and Accommodation and Food Services',
        'Other Services, Except Public Administration',
        'Public Administration',
        'Military'
      ],
      Race: ['White','African-American/Black','American Indian/Alaskan Native','Asian','Pacific Islander'],
      State: [
        "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID",
        "IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM",
        "NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
      ]
    }
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
      console.log($scope.data.profiles[i]);
    }
  };

  //toggles checkboxes
  $scope.toggle = function (item, list) {
    var i = list.indexOf(item);
    if(i > -1){
      list.splice(i, 1);
    } else {
      list.push(item);
    }
  };

  //checks if an variable is in selected array to display it as checked or not
  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };
}]);
