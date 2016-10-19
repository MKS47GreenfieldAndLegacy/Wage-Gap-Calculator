//it would be good to refactor to not need two separate controllers/html skeletons for bar and state
//since they share so much code in common

angular.module('wageGap.makestatesgraph', [])
.controller('MakeStatesGraphController', ['$scope', '$http', function ($scope, $http) {

  $scope.data = {
    selected: ['Gender'],
    potentials: [
      // 'Age',//leaving out age to decrease the number of necessary API variables for basic skeleton
      // 'Gender',//making age autoselected for skeleton version
      'Occupation',
      'Race'
    ],
    profiles: [],
    profilesnum: 0,
    options: {
      // age: ['15-19','20-24','25-29','30-34','35-39','40-44','45-49','50-54','55-59','60-65'],
      Gender: ['Male', 'Female'],
      Occupation: [
        'Management occupations',
        'Business and financial operations occupations',
        'Computer and mathematical occupations',
        'Architecture and engineering occupations',
        'Life, physical, and social science occupations',
        'Community and social services occupations',
        'Legal occupations',
        'Education, training, and library occupations',
        'Arts, design, entertainment, sports, and media occupations',
        'Healthcare practitioner and technical occupations',
        'Healthcare support occupations',
        'Protective service occupations',
        'Food preparation and serving related occupations',
        'Building and grounds cleaning and maintenance occupations',
        'Personal care and service occupations',
        'Sales and related occupations',
        'Office and administrative support occupations',
        'Farming, fishing, and forestry occupations',
        'Construction and extraction occupations',
        'Installation, maintenance, and repair occupations',
        'Production occupations',
        'Transportation occupations',
        'Material moving occupations'
      ],
      Race: ['White','African-American/Black','American Indian/Alaskan Native','Asian','Pacific Islander','Latino','Other']
    }
  };

  //initializes empty profiles with selected variables on choosing the number of people to compare
  //TODO: make it so that they don't empty out already filled out profiles when they add more
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

  $scope.query = function (profile, variable) {
    //set the data to send as only gender and the currently selected other variable
    //otherwise there are issues with old data still attached to the profile when changing variables
    var dataToSend = {
      Gender: profile.Gender
    };
    dataToSend[variable] = profile[variable];

    $http({
      method: 'GET',
      url: '/graph',
      data: dataToSend
    });
    console.log(profile, dataToSend);
  };

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
  $scope.toggle = function (item, list) {
    list.splice(1);
    list.push(item);
  };

  //checks if an variable is in selected array to display it as checked or not
  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };
}]);
