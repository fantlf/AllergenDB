HCDietsApp.factory('SearchService', SearchService);

SearchService.$inject = ['$http'];
function SearchService($http) {

  var service = {};

  service.getRecipeById = recipeById;
  service.getRestaurantById = getRestaurantById;
  service.getIngredientById = getIngredientById;
  service.getDietaryreqs = getDietaryreqs;
  service.runSearchQuery = runSearchQuery;
  service.getReqIngredients = getReqIngredients;
  service.getCommentsByRecipeId = getCommentsByRecipeId;
  service.getCommentsByRestaurantId = getCommentsByRestaurantId;

  function recipeById(id) {
    return $http.get('/3430/161/team7/HighCountryDiets/public/api/api.php/recipe?filter[]=id,eq,' + id).then(handleSuccess, handleError('Error getting user by id'));
  }

  function getDietaryreqs() {
    return $http.get('/3430/161/team7/HighCountryDiets/public/api/api.php/dietaryreq?order=name,asc').then(handleSuccess, handleError('Error retrieving dietary reqs'));
  }

  function getRestaurantById(id) {
    return $http.get('/3430/161/team7/HighCountryDiets/public/api/api.php/restaurant?filter[]=id,eq,' + id).then(handleSuccess, handleError('Error getting restaurant by id'));
  }

  function getIngredientById(id) {
    return $http.get('/3430/161/team7/HighCountryDiets/public/api/api.php/ingreident?filter[]=id,eq,' + id).then(handleSuccess, handleError('Error getting ingredient by id'));
  }

  function runSearchQuery(query) {
    return $http.get('/3430/161/team7/HighCountryDiets/public/query?query=' + query).then(handleSuccess, handleError('Error Searching'));
  }

  function getReqIngredients(recipeid) {
    return $http.get('/3430/161/team7/HighCountryDiets/public/api/api.php/reqingredient?recipeid=' + recipeid).then(handleSuccess, handleError('Error getting reqingredients'));
  }

  function getCommentsByRecipeId(id) {
    var query = "SELECT uname, commenttext FROM commentrecipe, user WHERE recipeid=" + id + " AND userid=user.id";
    return $http.get('/3430/161/team7/HighCountryDiets/public/query?query=' + query).then(handleSuccess, handleError('Error Searching'));
  }

  function getCommentsByRestaurantId(id) {
    var query = "SELECT uname, commenttext FROM commentrestaurant, user WHERE restaurantid=" + id + " AND userid=user.id";
    return $http.get('/3430/161/team7/HighCountryDiets/public/query?query=' + query).then(handleSuccess, handleError('Error Searching'));
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
