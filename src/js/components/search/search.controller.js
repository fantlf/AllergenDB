HCDietsApp.controller('SearchCtrl', function SearchCtrl($scope, $http) {
  $scope.test = function() {
    $http.get("/3430/161/team7/AllergenDB/public/php/search.php")
    .then(function (response) {$scope.names = response.data.records;});
  };
  $scope.error = "";
});
