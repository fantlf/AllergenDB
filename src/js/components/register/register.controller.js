HCDietsApp.controller('RegisterCtrl', RegisterCtrl);

function RegisterCtrl(UserService, $location, $rootScope, $scope, $http) {
  $scope.user = {};
  $scope.register = function() {
    $http.get("api.php/user?filter[]=email,eq," + $scope.user.email).then(function(response) {
      $scope.myData = response.data;
      $scope.users = response.data.user.records;
    });
  };
}
