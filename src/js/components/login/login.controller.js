HCDietsApp.controller('LoginCtrl', LoginCtrl);

function LoginCtrl($location, $scope, AuthenticationService) {
  $scope.login = login;
  AuthenticationService.clearCredentials();

  function login() {
    AuthenticationService.login(user.email, user.pass).then(function(response) {
      if (response)
        $location.path('/');
      else
        $scope.error = response.error;
    });
  }
}
