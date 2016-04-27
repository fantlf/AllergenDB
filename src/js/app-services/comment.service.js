HCDietsApp.factory('RecipeService', RecipeService);

RecipeService.$inject = ['$http'];
function RecipeService($http) {

  var service = {};

  service.runInsertQuery = runInsertQuery;

  return service;

  function runInsertQuery(query) {
    return $http.get('/3430/161/team7/HighCountryDiets/public/createcomment?query=' + query).then(handleSuccess, handleError('Error Searching'));
  }

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
