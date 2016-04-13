HCDietsApp.factory('SearchService', SearchService);

SearchService.$inject = ['$http'];
function SearchService($http) {

  var service = {};

  service.recipeById = recipeById;
  service.restaurantById = restaurantById;

  function recipeById(id) {
    return $http.get('/3430/161/team7/api.php/recipe?filter[]=id,eq,' + id).then(handleSuccess, handleError('Error getting user by id'));
  }

  function recipeByDietaryReqs(reqList) {

  }

  function restaurantById(id) {
    return $http.get('/3430/161/team7/api.php/restaurant?filter[]=id,eq,' + id).then(handleSuccess, handleError('Error getting user by id'));
  }

  return service;

  // private functions

  function handleSuccess(res) {
    return { success: true, data: res.data };
  }

  function handleError(error) {
    return function () {
        return { success: false, message: error };
    };
  }
}
