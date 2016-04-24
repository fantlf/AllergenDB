HCDietsApp.controller('RecipeCtrl', RecipeCtrl);

RecipeCtrl.$inject = ['SearchService', '$rootScope', '$scope'];
function RecipeCtrl(SearchService, $rootScope, $scope) {
  $scope.recipe = {id : "", name : "", description : "", directions : ""};
  $scope.ingredients = [];
  SearchService.getRecipeById($rootScope.currRecipe).then(function(response) {
    var results = response.data.recipe.records[0];
    $scope.recipe.id = results[0];
    $scope.recipe.name = results[1];
    $scope.recipe.description = results[2];
    $scope.recipe.directions = results[3];
    var query = "SELECT id, name, quantity FROM ingredient, reqingredient WHERE id=ingredientid AND recipeid=" + $scope.recipe.id;
    SearchService.runSearchQuery(query).then(function(response) {
      var ingredients = response.data.records;
      for (var i = 0; i < ingredients.length; i++) {
        $scope.ingredients[i] = {id : ingredients[i].id, name : ingredients[i].name, quantity : ingredients[i].quantity};
      }
    });
  });


}
