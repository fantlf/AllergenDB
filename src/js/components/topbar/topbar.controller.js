HCDietsApp.controller('TopBarCtrl', function ($scope, $rootScope, $location, $cookieStore, $http) {
  $scope.loggedInLinks = [{link : "#/profile", title : "Profile" }, {link : '#/logout', title : "Logout" }];
  $scope.loggedOutLinks = [{link : "#/register", title : "Register"}, {link : "#/login",    title : "Login"}];
  $scope.loggedIn = function() {
    if ($rootScope.globals.currentUser) return true;
    else return false;
  };
});
