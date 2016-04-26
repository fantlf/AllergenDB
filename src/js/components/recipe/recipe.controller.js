HCDietsApp.controller('RecipeCtrl', RecipeCtrl);

RecipeCtrl.$inject = ['SearchService', '$rootScope', '$scope'];

function RecipeCtrl(SearchService, $rootScope, $scope) {
<<<<<<< Updated upstream
  $scope.recipe = {id : "", name : "", description : "", steps : []};
=======
  $scope.recipe  = {id : "", name : "", description : "", directions : ""};
  $scope.commentrecipe = {userid : "", recipeid : "", commenttext : ""};
>>>>>>> Stashed changes
  $scope.ingredients = [];
  $scope.addComment = addComment;
  SearchService.getRecipeById($rootScope.currRecipe).then(function(response) {
    var results = response.data.recipe.records[0];
    $scope.recipe.id = results[0];
    $scope.recipe.name = results[1];
    $scope.recipe.description = results[2];
    $scope.recipe.steps = breakSteps(results[3]);
    var query = "SELECT id, name, quantity FROM ingredient, reqingredient WHERE id=ingredientid AND recipeid=" + $scope.recipe.id;
    SearchService.runSearchQuery(query).then(function(response) {
      var ingredients = response.data.records;
      for (var i = 0; i < ingredients.length; i++) {
        $scope.ingredients[i] = {id : ingredients[i].id, name : ingredients[i].name, quantity : ingredients[i].quantity};
      }
    });
  });

  function addComment() {
      SearchService.getCommentsByRecipeId($rootScope.currRecipe).then(function(response) {
        var results = response.data.commentrecipe.records[0];
        $scope.commentrecipe.uname = results[0];
        $scope.commentrecipe.recipeid = results[1];
        $scope.commentrecipe.commenttext = results[2];
        var query = "SELECT uname, commenttext FROM commentrecipe, user WHERE id=userid AND recipeid =" + $scope.commentrecipe.recipeid;
        SearchService.runSearchQuery(query).then(function(response) {
          var comments = response.data.records;
          for (var i = 0; i < comment.length; i++) {
            $scope.comment[i] = {uname : comment[i].uname, commenttext : comment[i].commenttext};
          }
        });
      });
  }
<<<<<<< Updated upstream

  //Private Functions

  function breakSteps(steps) {
    newSteps = steps.split("~~~");
    return newSteps;
  }

=======
>>>>>>> Stashed changes
}
