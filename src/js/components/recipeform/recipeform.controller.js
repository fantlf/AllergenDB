HCDietsApp.controller('RecipeformCtrl', RecipeformCtrl);

RecipeformCtrl.$inject = ['RecipeService', 'SearchService', '$location', '$rootScope', '$scope'];
function RecipeformCtrl(RecipeService, SearchService, $location, $rootScope, $scope) {
  $scope.recipe = {
    name : { input : "", error : false, errorMessage : "", inputClass : "noClass"},
    description : { input : "", error : false, errorMessage : "", inputClass : "noClass"},
    ingredients : [],
    steps : [
      { name : "Step 1", id : "step1", input : "", error : false, errorMessage : ""},
      { name : "Step 2", id : "step2", input : "", error : false, errorMessage : ""}
    ],
  };
  $scope.finalRecipe = {
    name : "",
    description : "",
    ingredients : [],
    steps : []
  };
  //Functions
  $scope.addStep = addStep;
  $scope.removeStep = removeStep;
  $scope.selectDietaryReq = selectDietaryReq;
  $scope.addRecipe = addRecipe;
  $scope.addIngredient = addIngredient;
  $scope.removeIngredient = removeIngredient;

  //Variables
  $scope.mainError = "";
  $scope.dietaryreqs = [];
  $scope.usedDietaryReqs = [];
  $scope.newIngredient = { name : "", desc : "", quantity : "", error : false, errorMessage : ""};

  //Get Dietary Reqs
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

  // Main function. Inserts the recipe
  function addRecipe() {
    compileInsertData();
    if ($scope.finalRecipe.ingredients.length === 0) {
      $scope.mainError = "Please enter at least one ingredient";
      return;
    }
    var query = buildQuery();
    $scope.results = query;
    RecipeService.runInsertQuery(query).then(function(response) {
      if (response.data.records[0].success) {
        $location.path('/profile');
      } else {
        alert("Oops! Something went wrong. We're working to fix it, try again later.");
      }
    });
  }


  function addStep() {
    $scope.recipe.steps.push(
      { name : "Step " + $scope.recipe.steps.length, id : "step" + $scope.recipe.steps.length, input : "", error : false, errorMessage : ""}
    );
    updateHeight();
  }

  function removeStep(index) {
    $scope.recipe.steps.splice(index, 1);
  }

  function addIngredient() {
    if ($scope.newIngredient.name === "") {
      $scope.newIngredient.error = true;
      $scope.newIngredient.errorMessage = "Please give the ingredient a name";
    } else if($scope.newIngredient.quantity === "") {
      $scope.newIngredient.error = true;
      $scope.newIngredient.errorMessage = "Please give specify the quantity";
    } else {
      $scope.recipe.ingredients.push(
        {
        name : $scope.newIngredient.name,
        description : $scope.newIngredient.desc,
        quantity : $scope.newIngredient.quantity
        }
      );
      $scope.newIngredient.desc = "";
      $scope.newIngredient.name = "";
      $scope.newIngredient.quantity = "";
      $scope.newIngredient.error = false;
    }
  }

  function removeIngredient(index) {
    $scope.recipe.ingredients.splice(index, 1);
  }

  function selectDietaryReq(index) {
    if ($scope.dietaryreqs[index].input) {
      $scope.dietaryreqs[index].input = false;
      $scope.dietaryreqs[index].class = "notSelected";
      $scope.usedDietaryReqs.splice(
        $scope.usedDietaryReqs.indexOf({
          id : $scope.dietaryreqs[index].id,
          name : $scope.dietaryreqs[index].name
        }),
        1
      );
    }
    else {
      $scope.dietaryreqs[index].input = true;
      $scope.dietaryreqs[index].class = "selected";
      $scope.usedDietaryReqs.push({
        id : $scope.dietaryreqs[index].id,
        name : $scope.dietaryreqs[index].name
      });
    }
  }

  // Private Functiones

  function buildQuery() {
    var directions = "";
    for (var k = 0; k < $scope.finalRecipe.steps.length; k++) {
      if (k > 0) directions += "~~~";
      directions += $scope.finalRecipe.steps[k];
    }
    var tempQuery = "BEGIN; " +
      "INSERT INTO recipe(name, description, directions, creator) VALUES( '" + 
      $scope.finalRecipe.name + "','" +
      $scope.finalRecipe.description + "','" +
      directions + "'," +
      $rootScope.globals.currentUser.id + "); " +
      "SELECT LAST_INSERT_ID() INTO @mysql_recipeid; ";
    for (var i = 0; i < $scope.finalRecipe.ingredients.length; i++) {
      tempQuery += "INSERT INTO ingredient(name, description) VALUES( '" +
        $scope.finalRecipe.ingredients[i].name + "','" + 
        $scope.finalRecipe.ingredients[i].description + "'); " + 
        "SELECT LAST_INSERT_ID() INTO @mysql_ingredientid;" +
        "INSERT INTO reqingredient(recipeid, ingredientid, quantity) VALUES(@mysql_recipeid, @mysql_ingredientid, '" + $scope.finalRecipe.ingredients[i].quantity + "');";
    }
    for (var j = 0; j < $scope.usedDietaryReqs.length; j++) {
      tempQuery += "INSERT INTO dietaryrecipe(recipeid, dietaryreqid) VALUES(@mysql_recipeid, " + $scope.usedDietaryReqs[j].id + ");";
    }
    tempQuery += "COMMIT;";
    return tempQuery;
  }

  function compileInsertData() {
    $scope.finalRecipe.name = scanString($scope.recipe.name.input);
    $scope.finalRecipe.description = scanString($scope.recipe.description.input);

    $scope.finalRecipe.ingredients = []; //clear ingredients
    for (var p = 0; p < $scope.recipe.ingredients.length; p++) {
      $scope.finalRecipe.ingredients.push({
        name : scanString($scope.recipe.ingredients[p].name),
        description : scanString($scope.recipe.ingredients[p].description),
        quantity : scanString($scope.recipe.ingredients[p].quantity),
      });
    }

    $scope.finalRecipe.steps = []; // clear steps
    for (var q = 0; q < $scope.recipe.steps.length; q++) {
      $scope.finalRecipe.steps.push(scanString($scope.recipe.steps[q].input));
    }
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
  function updateHeight() {
    $('#step-div').animate({scrollTop: $('#step-div').prop("scrollHeight")}, 500);
  }
}
