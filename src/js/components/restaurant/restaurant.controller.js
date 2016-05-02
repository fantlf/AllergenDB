HCDietsApp.controller('RestaurantCtrl', RestaurantCtrl);

RestaurantCtrl.$inject = ['SearchService', '$rootScope', '$scope'];
function RestaurantCtrl(SearchService, $rootScope, $scope) {

  if (!$rootScope.currRestaurant) {
    $location.path('/');
  }
  localStorageService.set("returnLoc", "restaurant");

  $scope.addComment = addComment;
  $scope.loadComments = loadComments;
  $scope.restaurant = {
    id : "",
    name : "",
    type : "",
    description : "",
    address : "",
    website : "",
    phone : ""
  };
  $scope.menuitems = [];
  $scope.comments = [];
  $scope.newComment = "";
  $scope.finalComment = {userid : "", recipeid : "", commenttext : ""};
  $scope.ratings = [];

  loadComments();
  SearchService.getRestaurantById($rootScope.currRestaurant).then(function(response) {
    var results = response.data.restaurant.records[0];
    $scope.restaurant.id = results[0];
    $scope.restaurant.name = results[1];
    $scope.restaurant.type = results[2];
    $scope.restaurant.description = results[3];
    $scope.restaurant.address = results[4];
    $scope.restaurant.website = results[5];
    $scope.restaurant.phone = formatPhone(results[6]);
    var query = "SELECT id, name, description FROM menuitem WHERE id IN (SELECT menuitemid FROM restaurantmenuitem WHERE restaurantid=" + $scope.restaurant.id +")";
    SearchService.runSearchQuery(query).then(function(response) {
      $scope.result1 = response;
      $scope.result2 = query;
      var menuitems = response.data.records;
      for (var i = 0; i < menuitems.length; i++) {
        $scope.menuitems[i] = {id : menuitems[i].id, name : menuitems[i].name, description : menuitems[i].description};
      }
    });
    var query2 = "SELECT name, rating FROM dietaryrestaurant, dietaryreq WHERE dietaryreqid=id AND restaurantid=" + $scope.restaurant.id;
    SearchService.runSearchQuery(query2).then(function(response) {
      for(var i = 0; i < response.data.records.length; i++) {
        $scope.ratings.push({
          dietaryreqname : response.data.records[i].name,
          value : response.data.records[i].rating
        });
      }
    });
  });
// Loads Comments
  function loadComments() {
    $scope.comments = [];
    SearchService.getCommentsByRestaurantId($rootScope.currRestaurant).then(function(response) {
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

    var insertQuery = "INSERT INTO commentrestaurant(userid, restaurantid, commenttext) VALUES (" +
    $scope.finalComment.userid + "," +
    $scope.finalComment.restaurantid + ",'" +
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
    $location.path('/login');
  }
  function register() {
    $location.path('/register');
  }
  //Private Functions

  function compileInsertData() {
    $scope.finalComment.commenttext = scanString($scope.newComment);
    $scope.finalComment.userid = $rootScope.globals.currentUser.id;
    $scope.finalComment.restaurantid = $scope.restaurant.id;
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
  function formatPhone(phone) {
    var newPhone = phone.slice(0,3);
    newPhone += "-";
    newPhone += phone.slice(3,6);
    newPhone += "-";
    newPhone += phone.slice(6,9);
    return newPhone;
  }
}
