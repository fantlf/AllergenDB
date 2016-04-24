var HCDietsApp = angular.module("HCDietsApp", [
  'mm.foundation',
  'ngRoute',
  'ngCookies',
]);

HCDietsApp.config(config);
HCDietsApp.run(run);

  config.$inject = ['$routeProvider'];
  function config($routeProvider) {
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
        .when('/login', {
            controller: 'LoginCtrl',
            templateUrl: 'components/login/login.view.html',
            controllerAs: 'ctrl'
        })
        .when('/recipe', {
            controller: 'RecipeCtrl',
            templateUrl: 'components/recipe/recipe.view.html',
            controllerAs: 'ctrl'
        })
        .when('/profile',   {
          templateUrl: 'components/profile/profile.view.html',
          controller:  'ProfileCtrl',
          controllerAs:'ctrl'
        })
        .when('/recipeform',   {
          templateUrl: 'components/recipeform/recipeform.view.html',
          controller:  'RecipeformCtrl',
          controllerAs:'ctrl'
        })
        .when('/restaurant', {
            controller: 'RestaurantCtrl',
            templateUrl: 'components/restaurant/restaurant.view.html',
            controllerAs: 'ctrl'
        })
        .when('/register', {
            controller: 'RegisterCtrl',
            templateUrl: 'components/register/register.view.html',
            controllerAs: 'ctrl'
        })
        .when('/logout', {
            controller: 'LogoutCtrl',
            templateUrl: 'components/logout/logout.view.html',
            controllerAs: 'ctrl'
        })
        .otherwise({ redirectTo: '/' });
  }
  run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
  function run($rootScope, $location, $cookies, $http) {
    $rootScope.currRecipe = $cookies.getObject('currRecipe') || {};
    $rootScope.currRestaurant = $cookies.getObject('currRestaurant') || {};
      // keep user logged in after page refresh
      $rootScope.globals = $cookies.getObject('globals') || {};
      if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }
  }

  HCDietsApp.controller("HCDietsAppCtrl", function HCDietsAppCtrl($scope, $rootScope) {
    $scope.loggedInLinks = [{link : "#/profile", title : "Profile" }, {link : '#/logout', title : "Logout" }];
    $scope.loggedOutLinks = [{link : "#/register", title : "Register"}, {link : "#/login",    title : "Login"}];
    $scope.loggedIn = function() {
      if ($rootScope.globals.currentUser) return true;
      else return false;
    };
  });
