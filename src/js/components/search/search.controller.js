HCDietsApp.controller('SearchCtrl', SearchCtrl);

SearchCtrl.$inject = ['$scope', 'SearchService'];
function SearchCtrl($scope, SearchService) {
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

  $scope.search = search;
  $scope.update = update;
  $scope.dreqSelect = dreqSelect;
  $scope.searching = false;
  $scope.query = "";
  // get the dietaryreqs
  /* Dietary Requirement Attributes
    id    <- id in the database
    name  <- displayed on label
    class <- the css class that is applied to its button
    input <- is it checked, ng-model
  */
  SearchService.getDietaryreqs().then(function(response) {
    $scope.results = response.data;
  });
  $scope.dietaryreqs = [
    {id : 1, name : "Vegetarian", class : "notSelected", input : ""},
    {id : 2, name : "Gluten Free", class : "notSelected", input : ""}
  ];
  $scope.type = "recipe";
  function update() {
    if ($scope.searching) {
      buildQuery();
      runQuery();
      displayResults();
    }
  }

  function search() {
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
    var tempQuery = "SELECT name, description FROM " + $scope.type;
    var hasReq = false;
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
    tempQuery += ";";
    $scope.query = tempQuery;
  }

  function runQuery() {

  }

  function displayResults() {
    $scope.results = $scope.query;
  }

  function dreqSelect(index) {
    if ($scope.dietaryreqs[index].input)
      $scope.dietaryreqs[index].class = "notSelected";
    else
      $scope.dietaryreqs[index].class = "selected";
    update();
  }
}
