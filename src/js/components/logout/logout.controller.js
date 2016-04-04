HCDietsApp.controller('LogoutCtrl', LogoutCtrl);

function LogoutCtrl($location, $http, $rootScope, $cookieStore) {
  $rootScope.globals = {};
  $cookieStore.remove('globals');
  $http.defaults.headers.common['Authorization'] = 'Basic '// jshint ignore:line
  $location.path('/');
}
