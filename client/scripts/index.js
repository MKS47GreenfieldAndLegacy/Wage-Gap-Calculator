var wageGap = angular.module('wageGap', [
  'ui.router',
  'wageGap.sidebar',
  'wageGap.sidebar.makestatesgraph',
  'wageGap.sidebar.makebargraph',
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/landing');

  $stateProvider
    .state('landing', {
      templateUrl: './../index.html',
      url: '/landing',
      controller: 'LandingController'
    })
    .state('landing.bargraph', {
      templateUrl: './../sidebar/makebargraph.html',
      url: '/bargraph',
      controller: 'MakeBarGraphController'
    })
    .state('landing.statesgraph', {
      templateUrl: './../sidebar/makestatesgraph.html',
      url: '/statesgraph',
      controller: 'MakeStatesGraphController'
    });
});
