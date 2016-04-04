
$http.get("api.php/user?filter[]=email,eq," + $scope.user.email).then(function(response) {
  $scope.myData = response.data;
  $scope.users = response.data.user.records;
});
$http.get('/api.php/user?filter[]=email,eq,' + $scope.user.email).then(function(response) {
  $scope.myData  = response.data;
  $scope.myData2 = response.data.user.records[0][0];
});
