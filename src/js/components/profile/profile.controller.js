HCDietsApp.controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject=['$location', 'UserService', '$rootScope', '$scope'];
function ProfileCtrl($location, UserService, $rootScope, $scope) {
  loadCurrentUser();
  function loadCurrentUser() {
    $scope.user = {};
      UserService.GetByEmail($rootScope.globals.currentUser.email)
          .then(function (response) {
              $scope.user.id = response.data.user.records[0][0];
              $scope.user.email = response.data.user.records[0][1];
              $scope.user.fname = response.data.user.records[0][2];
              $scope.user.sname = response.data.user.records[0][3];
              $scope.user.uname = response.data.user.records[0][4];
          });
  }

  function gotorecipeform(){
    $location.path('/recipeform');
  }
}
