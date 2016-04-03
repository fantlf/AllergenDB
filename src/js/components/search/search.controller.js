HCDietsApp.controller('SearchCtrl', function SearchCtrl($scope, $http) {
  $scope.test = function() {
    $http.get("php/search.php")
    .then(function (response) {$scope.names = response.data.records;});
};
});
