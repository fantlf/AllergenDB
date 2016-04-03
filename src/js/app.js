var HCDietsApp = angular.module("HCDietsApp", [
  'mm.foundation',
  'ngRoute',
  'ngCookies',
]);

HCDietsApp.config(config);
HCDietsApp.run(run);

  config.$inject = ['$routeProvider', '$locationProvider'];
  function config($routeProvider, $locationProvider) {
      $routeProvider
        .when('/',       {redirectTo:'/home'})
        .when('/home',   {
          templateUrl: 'components/home/home.view.html',
          controller:  'HomeCtrl',
          controllerAs:'ctrl'
        })
        .when('/about',   {
          templateUrl: 'components/about/about.view.html',
          controller:  'AboutCtrl',
          controllerAs:'ctrl'
        })
        .when('/search',   {
          templateUrl: 'components/search/search.view.html',
          controller:  'SearchCtrl',
          controllerAs:'ctrl'
        })
        .when('/account',   {
          templateUrl: 'components/account/account.view.html',
          controller:  'AccountCtrl',
          controllerAs:'ctrl'
        })
        .when('/login', {
            controller: 'LoginCtrl',
            templateUrl: 'components/login/login.view.html',
            controllerAs: 'ctrl'
        })
        .when('/register', {
            controller: 'RegisterCtrl',
            templateUrl: 'components/register/register.view.html',
            controllerAs: 'ctrl'
        })
        .otherwise({ redirectTo: '/login' });
  }

  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
  function run($rootScope, $location, $cookieStore, $http) {
      
  }

  HCDietsApp.controller("HCDietsAppCtrl", function HCDietsAppCtrl($scope) {

  });
