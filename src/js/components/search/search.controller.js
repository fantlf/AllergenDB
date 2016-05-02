HCDietsApp.controller('SearchCtrl', SearchCtrl);

SearchCtrl.$inject = ['$cookies', '$location', '$rootScope', '$scope', 'SearchService'];
function SearchCtrl($cookies, $location, $rootScope, $scope, SearchService) {
  /* ============== How Searching Works ==============

    buildQuery looks at all the data in the form
    and builds a query to search based on the current
    rewuires and stores the query in $scope.query

    runQuery runs the current query stored in $scope.query
    it then stores the result in $scope.results

    displayResults displays the current results in $scope.results
    and updates the classes of each input.

    update is an onclick function placed on every input
    it runs buildQuery, runQuery, displayResults in that oder.
    This function only does anything is $scope.searching is set to true

    search starts the searching process. It is called by clicking the
    search button. It does the same thing as update, but then sets
    $searching to true.

    The point of this extra search function is so that when a user
    first starts building their query, they dont get results until
    they are finished and click search. Then, after that, any changes
    they make autmoatically update their results.

  */
  localStorageService.set("returnLoc", "restaurant");
  $scope.search = search;
  $scope.update = update;
  $scope.dreqSelect = dreqSelect;
  $scope.goToPage = goToPage;
  $scope.query = "";
  $scope.nameMatch = "";
  $scope.dietaryreqs = [];
  // get the dietaryreqs
  /* Dietary Requirement Attributes
    id    <- id in the database
    name  <- displayed on label
    class <- the css class that is applied to its button
    input <- is it checked, ng-model
  */
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

  $scope.type = "recipe";
  function update() {
    if ($scope.searching) {
      var query = buildQuery();
      runQuery(query);
      //displayResults(results);
    }
  }

  function search(type) {
    $scope.type = type;
    $scope.searching = true;
    update();
  }
  function buildQuery() {
    /*
        SELECT id, name, description
        FROM recipe,
        WHERE id IN (SELECT recipeid
                     FROM dietaryrecipe
                     WHERE dietaryreqid='cheked req id')
    */
    var tempQuery = "SELECT id, name, description FROM " + $scope.type;
    var hasReq = false;
    // Take care of dietary reqs selected
    for (var i = 0; i < $scope.dietaryreqs.length; i++) {
      if ($scope.dietaryreqs[i].input) {
        if (!hasReq) {
          tempQuery += " WHERE";
          hasReq = true;
        }
        else {
          tempQuery += " AND";
        }
        tempQuery += " id IN (SELECT ";
        tempQuery += $scope.type;
        tempQuery += "id FROM dietary";
        tempQuery += $scope.type;
        tempQuery += " WHERE dietaryreqid='";
        tempQuery += $scope.dietaryreqs[i].id;
        tempQuery += "')";
      }
    }
    // take care of a name input
    if ($scope.nameMatch !== "") {
      if (!hasReq) {
        tempQuery += " WHERE";
      } else {
        tempQuery += " AND";
      }
      tempQuery += " name LIKE '%" + $scope.nameMatch + "%'";
    }
    return tempQuery;
  }

  function runQuery(query) {
    $scope.results1 = query;
    SearchService.runSearchQuery(query).then(function(response) {
      if (response.success) {
        $scope.results2 = response;
        displayResults(response.data.records);
      } else {
        // handle error
      }
    });
  }

  function displayResults(results) {
    for (var i = 0; i < results.length; i++) {
      if (results[i].description.length > 100) {
        results[i].description = results[i].description.substring(0, 100) + "...";
      }
    }
    $scope.results = results;
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
    update();
  }

  function goToPage(id) {
    if ($scope.type == "recipe") {
      $rootScope.currRecipe = id;
      $cookies.putObject('currRecipe', id);
      $location.path('/recipe');
    } else if ($scope.type == "restaurant") {
      $rootScope.currRestaurant = id;
      $cookies.putObject('currRestaurant', id);
      $location.path('/restaurant');
    }
}
}
