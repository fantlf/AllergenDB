HCDietsApp.controller('RestaurantCtrl', RestaurantCtrl);

RestaurantCtrl.$inject = ['SearchService', '$rootScope', '$scope'];
function RestaurantCtrl(SearchService, $rootScope, $scope) {

  if (!$rootScope.currRestaurant) {
    $location.path('/');
  }

  $scope.restaurant = {
    id : "",
    name : "",
    type : "",
    description : "",
    address : "",
    website : "",
    phone : ""
  };
  $scope.menuitems = [];
  $scope.ratings = [];
  SearchService.getRestaurantById($rootScope.currRestaurant).then(function(response) {
    var results = response.data.restaurant.records[0];
    $scope.restaurant.id = results[0];
    $scope.restaurant.name = results[1];
    $scope.restaurant.type = results[2];
    $scope.restaurant.description = results[3];
    $scope.restaurant.address = results[4];
    $scope.restaurant.website = results[5];
    $scope.restaurant.phone = formatPhone(results[6]);
    var query = "SELECT id, name, description FROM menuitem WHERE id IN (SELECT menuitemid FROM restaurantmenuitem WHERE restaurantid=" + $scope.restaurant.id +")";
    SearchService.runSearchQuery(query).then(function(response) {
      $scope.result1 = response;
      $scope.result2 = query;
      var menuitems = response.data.records;
      for (var i = 0; i < menuitems.length; i++) {
        $scope.menuitems[i] = {id : menuitems[i].id, name : menuitems[i].name, description : menuitems[i].description};
      }
    });
    var query2 = "SELECT name, rating FROM dietaryrestaurant, dietaryreq WHERE dietaryreqid=id AND restaurantid=" + $scope.restaurant.id;
    SearchService.runSearchQuery(query2).then(function(response) {
      for(var i = 0; i < response.data.records.length; i++) {
        $scope.ratings.push({
          dietaryreqname : response.data.records[i].name,
          value : response.data.records[i].rating
        });
      }
    });
  });

  //private functions

  function formatPhone(phone) {
    var newPhone = phone.slice(0,3);
    newPhone += "-";
    newPhone += phone.slice(3,6);
    newPhone += "-";
    newPhone += phone.slice(6,9);
    return newPhone;
  }
}
