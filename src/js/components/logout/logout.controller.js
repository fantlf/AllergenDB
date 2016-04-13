HCDietsApp.controller('LogoutCtrl', LogoutCtrl);

function LogoutCtrl($location, $http, $rootScope, $cookies) {
  $rootScope.globals = {};
  $cookies.remove('globals');
  $http.defaults.headers.common['Authorization'] = 'Basic '// jshint ignore:line
  $location.path('/');
}
