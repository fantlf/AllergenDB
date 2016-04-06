HCDietsApp.controller('SearchCtrl', SearchCtrl);

SearchCtrl.$inject = ['$scope', '$http'];

function SearchCtrl($scope, $http) {
  $scope.search = search;

  function search() {
    $http.get("/3430/161/team7/AllergenDB/public/php/search.php?query=" + $scope.query)
    .then(function (response) {
      $scope.searchResults = response.data.records;
      /*$scope.searchResults = {keys : [], vals : []};
      Object.keys(response.data.records).forEach(function(key,index) {
        $scope.searchResults.keys.push(key);
        $scope.searchResults.vals.push(index);
      });*/
    });
  }

}
