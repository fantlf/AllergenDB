HCDietsApp.controller('RecipeformCtrl', RecipeformCtrl);

RecipeformCtrl.$inject = ['SearchService', '$rootScope', '$scope'];
function RecipeformCtrl(SearchService, $rootScope, $scope) {
  $scope.dreqSelect = dreqSelect;
  $scope.addRecipe = addRecipe;
  $scope.dietaryreqs = [];
  $scope.ingredients = [];
  $scope.
  SearchService.getDietaryreqs().then(function(response) {
    var results = response.data.dietaryreq.records;
    for (var i = 0; i < results.length; i++) {
      $scope.dietaryreqs[i] = {
        id : results[i][0],
        name : results[i][1],
        class : "notSelected",
        input : false
      };
    }
  });

  function addRecipe() {

  }

  function buildQuery() {

  }

  function addIngredient() {
    ingredients.push({
      name : $scope.newIngredientName;
      description : $scope.newIngredientDesc;
    });
  }

  function dreqSelect(index) {
    if ($scope.dietaryreqs[index].input) {
      $scope.dietaryreqs[index].input = false;
      $scope.dietaryreqs[index].class = "notSelected";
    }
    else {
      $scope.dietaryreqs[index].input = true;
      $scope.dietaryreqs[index].class = "selected";
    }
  }
}
