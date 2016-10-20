var wageGap = angular.module('wageGap', [
  'ui.router',
  //there's some great examples and lots of docs for Angular Material at https://material.angularjs.org/latest/
  //you call ngMaterial here basically it just implements and enables Google's Material design specs
  //(a UI component framework used similarly to how many people use Bootstrap, does a lot of design/css work for you)
  // 'ngMaterial',
  // 'material.svgAssetsCache',
  'wageGap.sidebar',
  'wageGap.makestatesgraph',
  'wageGap.makebargraph'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      templateUrl: './../index.html',
      url: '/',
      controller: 'SidebarController'
    })
    .state('home.sidebar', {
      templateUrl: './../index.html',
      abstract: true
    })
    .state('home.main', {
      templateUrl: './../index.html',
      abstract: true
    })
    .state('home.sidebar.bargraph', {
      templateUrl: './../sidebar/makebargraph.html',
      controller: 'MakeBarGraphController'
    })
    .state('home.sidebar.statesgraph', {
      templateUrl: './../sidebar/makestatesgraph.html',
      controller: 'MakeStatesGraphController'
    })
    .state('home.main.statesgraph', {
      templateUrl: './../d3charts/states/statesgraph.html'
    });
}).run(function () {

});
