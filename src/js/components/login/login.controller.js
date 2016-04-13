HCDietsApp.controller('LoginCtrl', LoginCtrl);

<<<<<<< HEAD
LoginCtrl.$inject = ['$location', '$scope', 'AuthenticationService', 'UserService'];
=======
>>>>>>> origin/master
function LoginCtrl($location, $scope, AuthenticationService, UserService) {
  $scope.login = login;
  AuthenticationService.clearCredentials();

  function login() {
    UserService.GetByEmail($scope.user.email).then(function (response) {
      if(response.data.user && response.data.user.records.length == 1) {
        var id = response.data.user.records[0][0];
        UserService.GetPass(id).then(function(response) {
          var code = CryptoJS.SHA256($scope.user.pass).toString();
          if (code == response.data.pass.records[0][1]) {
            AuthenticationService.setCredentials($scope.user.email, code);
            $location.path('/');
          } else $scope.error = "Username or password is incorrect";
        });
      } else $scope.error = "Username or password is incorrect";
    });
  }
}
