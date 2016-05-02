HCDietsApp.controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['UserService', 'AuthenticationService', '$location', '$rootScope', '$scope'];
function RegisterCtrl(UserService, AuthenticationService, $location, $rootScope, $scope) {
  localStorageService.set("returnLoc", "register");
  $scope.register = register;

  $scope.checkEmail = checkEmail;
  $scope.checkPass  = checkPass;
  $scope.checkUname = checkUname;
  $scope.checkFname = checkFname;
  $scope.checkSname = checkSname;

  $scope.email = { error : false, errorMessage : "", inputClass : "noInput"};
  $scope.pass1 = { error : false, errorMessage : "", inputClass : "noInput"};
  $scope.pass2 = { error : false, errorMessage : "", inputClass : "noInput"};
  $scope.uname = { error : false, errorMessage : "", inputClass : "noInput"};
  $scope.fname = { error : false, errorMessage : "", inputClass : "noInput"};
  $scope.sname = { error : false, errorMessage : "", inputClass : "noInput"};
  $scope.mainError = "";
  $scope.user = { email : "", pass : "", uname : "", fname : "", sname : "" };
  function register(user) {
    var res0 = AuthenticationService.simpleTestPass1($scope.user.pass1);
    var res1 = AuthenticationService.simpleTestPass2($scope.user.pass1, $scope.user.pass2);
    var res2 = AuthenticationService.simpleTestName($scope.user.fname);
    var res3 = AuthenticationService.simpleTestName($scope.user.sname);
    var res4 = AuthenticationService.simpleTestEmail($scope.user.email);
    var res5 = AuthenticationService.simpleTestUname($scope.user.uname);
    if (res0.error)
      $scope.mainError = res0.message;
    else if (res1.error)
      $scope.mainError = res1.message;
    else if (res2.error)
      $scope.mainError = res2.message;
    else if (res3.error)
      $scope.mainError = res3.message;
    else if (res4.error)
      $scope.mainError = res4.message;
    else if (res5.error)
      $scope.mainError = res5.message;
    else {
      AuthenticationService.complexTestEmail($scope.user.email).then(function(response) {
        if (response.error)
          $scope.mainError = response.message;
        else {
          AuthenticationService.complexTestUname($scope.user.uname).then(function(response) {
            if (response.error)
              $scope.mainError = response.message;
            else {
              UserService.Create(user).then(function(response) {
                $location.path('/login');
              });
            }
          });
        }
      });
    }
  }

  function checkEmail() {
    var result = AuthenticationService.simpleTestEmail($scope.user.email);
    $scope.email.errorMessage = result.message;
    $scope.email.inputClass = result.newClass;
    $scope.email.error = result.error;

    if (!result.error) {
      AuthenticationService.complexTestEmail($scope.user.email).then(function(response) {
        $scope.email.errorMessage = response.message;
        $scope.email.inputClass = response.newClass;
        $scope.email.error = response.error;
      });
    }
    if ($scope.mainError !== "") updateMainError();
  }

  function checkPass() {
    if (typeof $scope.user.pass1 == 'undefined' && typeof $scope.user.pass2 == 'undefined') { // neither has been entered
      return;
    }
    else if (typeof $scope.user.pass2 == 'undefined') { // the first password field has been entered, but not the second
      var resultOnly1 = AuthenticationService.simpleTestPass1($scope.user.pass1);
      $scope.pass1.errorMessage= resultOnly1.message;
      $scope.pass1.inputClass = resultOnly1.newClass;
      $scope.pass1.error = resultOnly1.error;
    }
    else if (typeof $scope.user.pass1 == 'undefined') { // the second password field has been entered, but not the first
      var resultOnly2 = AuthenticationService.simpleTestPass1($scope.user.pass2);
      $scope.pass2.errorMessage= resultOnly2.message;
      $scope.pass2.inputClass = resultOnly2.newClass;
      $scope.pass2.error = resultOnly2.error;
    }
    else { // both passwords have bee entered
      var result2 = AuthenticationService.simpleTestPass2($scope.user.pass1, $scope.user.pass2);
      $scope.pass1.errorMessage= result2.message;
      $scope.pass1.inputClass = result2.newClass;
      $scope.pass2.inputClass = result2.newClass;
      $scope.pass1.error = result2.error;
      if (!result2.error) { // the passwords match
        var result1 = AuthenticationService.simpleTestPass1($scope.user.pass1);
        $scope.pass1.errorMessage = result1.message;
        $scope.pass1.inputClass = result1.newClass;
        $scope.pass2.inputClass = result1.newClass;
        $scope.pass1.error = result1.error;
      }
    }
    if ($scope.mainError !== "") updateMainError();
  }

  function checkUname() {
    if (typeof $scope.user.uname !== 'undefined' && $scope.user.uname !== null && $scope.user.uname !== "") {
      var result = AuthenticationService.simpleTestUname($scope.user.uname);
      $scope.uname.errorMessage = result.message;
      $scope.uname.inputClass = result.newClass;
      $scope.uname.error = result.error;

      if (!result.error) {
        AuthenticationService.complexTestUname($scope.user.uname).then(function(response) {
          $scope.uname.errorMessage = response.message;
          $scope.uname.inputClass = response.newClass;
          $scope.uname.error = response.error;
        });
      }
      if ($scope.mainError !== "") updateMainError();
    }
  }

  function checkFname() {
    if (typeof $scope.user.fname !== 'undefined' && $scope.user.fname !== null && $scope.user.fname !== "") {
      var result = AuthenticationService.simpleTestName($scope.user.fname);
      $scope.fname.errorMessage = result.message;
      $scope.fname.inputClass = result.newClass;
      $scope.fname.error = result.error;
    }
    if ($scope.mainError !== "") updateMainError();
  }

  function checkSname() {
    if (typeof $scope.user.sname !== 'undefined' && $scope.user.sname !== null && $scope.user.sname !== "") {
      var result = AuthenticationService.simpleTestName($scope.user.sname);
      $scope.sname.errorMessage = result.message;
      $scope.sname.inputClass = result.newClass;
      $scope.sname.error = result.error;
    }
    if ($scope.mainError !== "") updateMainError();
  }

  function updateMainError() {
    if ($scope.email.error)
      $scope.mainError = $scope.email.errorMessage;
    else if($scope.pass1.error)
      $scope.mainError = $scope.pass1.errorMessage;
    else if($scope.pass2.error)
      $scope.mainError = $scope.pass2.errorMessage;
    else if ($scope.uname.error)
      $scope.mainError = $scope.uname.errorMessage;
    else if ($scope.fname.error)
      $scope.mainError = $scope.fname.errorMessage;
    else if ($scope.sname.error)
      $scope.mainError = $scope.sname.errorMessage;
    else {
      $scope.mainError = "";
    }
  }
}
