HCDietsApp.controller('RecipeCtrl', RecipeCtrl);

RecipeCtrl.$inject = ['localStorageService','$location','SearchService', '$rootScope', '$scope'];

function RecipeCtrl(localStorageService, $location, SearchService, $rootScope, $scope) {

  if (!$rootScope.currRecipe) {
    $location.path('/');
  }

  $scope.loggedIn = false;
  if ($rootScope.globals.currentUser) {
    $scope.loggedIn = true;
  }

  $scope.recipe = {id : "", name : "", description : "", steps : []};
  $scope.comments = [];
  $scope.newComment = "";
  $scope.finalComment = {userid : "", recipeid : "", commenttext : ""};
  $scope.ingredients = [];
  $scope.addComment = addComment;
  $scope.login = login;
  $scope.register = register;

  loadComments();
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
  function loadComments() {
    $scope.comments = [];
    SearchService.getCommentsByRecipeId($rootScope.currRecipe).then(function(response) {
      var results = response.data.records;
      for (var i = 0; i < results.length; i++) {
        $scope.comments.push({
          uname : results[i].uname,
          commenttext : results[i].commenttext
        });
      }
    });
  }

  // INSERTS comment to tables
  function addComment() {
    compileInsertData();

    var insertQuery = "INSERT INTO commentrecipe(userid, recipeid, commenttext) VALUES (" +
    $scope.finalComment.userid + "," +
    $scope.finalComment.recipeid + ",'" +
    $scope.finalComment.commenttext + "')";
    $scope.results = insertQuery;
    SearchService.runSearchQuery(insertQuery).then(function(response) {
      if(response.data.records[0].results != "error") {
        loadComments();
      } else {
        alert("Oops! Something went wrong. We're working to fix it, try again later.");
      }
    });

  }
  function login() {
    localStorageService.set("returnLoc", "recipe");
    $location.path('/login');
  }
  function register() {
    localStorageService.set("returnLoc", "recipe");
    $location.path('/register');
  }
  //Private Functions
  function breakSteps(steps) {
    newSteps = steps.split("~~~");
    return newSteps;
  }

  function compileInsertData() {
    $scope.finalComment.commenttext = scanString($scope.newComment);
    $scope.finalComment.userid = $rootScope.globals.currentUser.id;
    $scope.finalComment.recipeid = $scope.recipe.id;
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
