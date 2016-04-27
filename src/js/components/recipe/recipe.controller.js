HCDietsApp.controller('RecipeCtrl', RecipeCtrl);

RecipeCtrl.$inject = ['SearchService', '$rootScope', '$scope'];

function RecipeCtrl(SearchService, $rootScope, $scope) {

  if (!$rootScope.currRecipe) {
    $location.path('/');
  }

  $scope.recipe = {id : "", name : "", description : "", steps : []};
  $scope.commentrecipe = {userid : "", recipeid : "", commenttext : ""};
  $scope.ingredients = [];
  $scope.addComment = addComment;
  $scope.loadComment = loadComment;
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
  // Loads Comments
  function loadComment() {
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

  // INSERTS comment to tables
  function addComment() {
    compileInsertData();

    var insertQuery = "INSERT INTO commentrecipe(userid, recipeid, commenttext) VALUES ('" +
    $scope.comment.userid + "','" +
    $scope.comment.recipeid + "','" +
    $scope.commentrecipe.commenttext + ";";
    $scope.results = insertQuery;
    CommentService.runInsertQuery(insertQuery).then(function(response) {
      if(response.data.records[0].success) {
        $location.path('/');
      } else {
        alert("Oops! Something went wrong. We're working to fix it, try again later.");
      }
    });

  }
  //Private Functions
  function breakSteps(steps) {
    newSteps = steps.split("~~~");
    return newSteps;
  }

  function compileInsertData() {
    $scope.commentrecipe.commenttext = scanString($scope.recipe.commentbox);
    $scope.commentrecipe.userid = $rootScope.global.currentUser;
    $scope.commentrecipe.recipeid = $scope.recipe.id;
  }

  function scanString(string) {
    string = addslashes(string);
    return string;
  }

  function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
      replace(/\u0008/g, '\\b').
      replace(/\t/g, '\\t').
      replace(/\n/g, '\\n').
      replace(/\f/g, '\\f').
      replace(/\r/g, '\\r').
      replace(/'/g, '\\\'').
      replace(/"/g, '\\"');
    }
  }
