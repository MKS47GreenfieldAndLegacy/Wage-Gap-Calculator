var wageGap = angular.module('wageGap', [
  'ui.router',
  //there's some great examples and lots of docs for Angular Material at https://material.angularjs.org/latest/
  //you call ngMaterial here basically it just implements and enables Google's Material design specs
  //(a UI component framework used similarly to how many people use Bootstrap, does a lot of design/css work for you)
  'ngMaterial',
  // 'material.svgAssetsCache',
  'wageGap.sidebar',
  'wageGap.makestatesgraph',
  'wageGap.makebargraph',
  'wageGap.home'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      templateUrl: './../home.html',
      url: '/home',
      controller: 'HomeController'
    })
    .state('makebargraph', {
      templateUrl: './../sidebar/makebargraph.html',
      url: '/bargraph',
      controller: 'MakeBarGraphController'
    })
    .state('makestatesgraph', {
      templateUrl: './../sidebar/makestatesgraph.html',
      url: '/statesgraph',
      controller: 'MakeStatesGraphController'
    });
}).run(function () {
//just in case we need to add something later to run here
});
