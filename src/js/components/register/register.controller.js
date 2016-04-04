HCDietsApp.controller('RegisterCtrl', RegisterCtrl);

function RegisterCtrl(UserService, $location, $rootScope, $scope) {
  $scope.email = { error : false, errorMessage : "", inputClass : "noInput"};
  $scope.pass1 = { error : false, errorMessage : "", inputClass : "noInput"};
  $scope.pass2 = { error : false, errorMessage : "", inputClass : "noInput"};
  $scope.uname = { error : false, errorMessage : "", inputClass : "noInput"};
  $scope.fname = { error : false, errorMessage : "", inputClass : "noInput"};
  $scope.sname = { error : false, errorMessage : "", inputClass : "noInput"};
  $scope.mainError = "";

  $scope.register = function(user) {
    var res0 = testPass1($scope.user.pass1);
    var res1 = testPass2($scope.user.pass1, $scope.user.pass2);
    var res2 = testName($scope.user.fname);
    var res3 = testName($scope.user.sname);
    var res4 = testEmail($scope.user.email);
    var res5 = testUname($scope.user.uname);
    if (res0.error) {
      $scope.mainError = res0.message;
      return;
    }
    if (res1.error) {
      $scope.mainError = res1.message;
      return;
    }
    else if (res2.error) {
      $scope.mainError = res2.message;
      return;
    }
    else if (res3.error) {
      $scope.mainError = res3.message;
      return;
    }
    else if (res4.error) {
      $scope.mainError = res4.message;
      return;
    }
    else if (res5.error) {
      $scope.mainError = res5.message;
      return;
    }
    UserService.GetByEmail($scope.user.email).then(function (response) {
      if (response.success && response.data.user) {
        if (response.data.user.records.length > 0) {
          $scope.mainError = "A user with this email already exists";
        }
        else {
          UserService.GetByUname($scope.user.uname).then(function (response) {
            if (response.success && response.data.user) {
              if (response.data.user.records.length > 0) {
                $scope.mainError = "A user with this username already exists";
              }
              else {
                UserService.Create(user).then(function(response) {
                  $location.path('/login');
                });
              }
            } else { $scope.mainError = "A user with this username already exists"; }
          });
        }
      } else { $scope.mainError = "A user with this email already exists"; }
    }
  );
};

  $scope.checkEmail = function() {
    var result = testEmail($scope.user.email);
    $scope.email.errorMessage = result.message;
    $scope.email.inputClass = result.newClass;
    $scope.email.error = result.error;

    UserService.GetByEmail($scope.user.email).then(function (response) {
      if (response.success && response.data.user) {
        if (response.data.user.records.length > 0) {
          $scope.email.errorMessage = "A user with this email already exists";
          $scope.email.inputClass = 'invalidInput';
          $scope.email.error = true;
        }
      }
    });
  };

  $scope.checkPass = function() {
    if (typeof $scope.user.pass1 == 'undefined' && $scope.user.pass2 == 'undefined') { // neither has been entered
      return;
    }
    else if (typeof $scope.user.pass2 == 'undefined') { // the first password field has been entered, but not the second
      var resultOnly1 = testPass1($scope.user.pass1);
      $scope.pass1.errorMessage= resultOnly1.message;
      $scope.pass1.inputClass = resultOnly1.newClass;
      $scope.pass1.error = resultOnly1.error;
    }
    else if (typeof $scope.user.pass1 == 'undefined') { // the second password field has been entered, but not the first
      var resultOnly2 = testPass1($scope.user.pass2);
      $scope.pass2.errorMessage= resultOnly2.message;
      $scope.pass2.inputClass = resultOnly2.newClass;
      $scope.pass2.error = resultOnly2.error;
    }
    else { // both passwords have bee entered
      var result2 = testPass2($scope.user.pass1, $scope.user.pass2);
      $scope.pass1.errorMessage= result2.message;
      $scope.pass1.inputClass = result2.newClass;
      $scope.pass2.inputClass = result2.newClass;
      $scope.pass1.error = result2.error;
      if (!result2.error) { // the passwords match
        var result1 = testPass1($scope.user.pass1);
        $scope.pass1.errorMessage = result1.message;
        $scope.pass1.inputClass = result1.newClass;
        $scope.pass2.inputClass = result1.newClass;
        $scope.pass1.error = result1.error;
      }
    }
  };
  $scope.checkUname = function() {
    if (typeof $scope.user.uname == 'undefined') {
      return;
    }
    var result = testUname($scope.user.uname);
    $scope.uname.errorMessage = result.message;
    $scope.uname.inputClass = result.newClass;
    $scope.uname.error = result.error;

    UserService.GetByUname($scope.user.uname).then(function (response) {
      if (response.success && response.data.user) {
        if (response.data.user.records.length > 0) {
          $scope.uname.errorMessage = "A user with this username already exists";
          $scope.uname.inputClass = 'invalidInput';
          $scope.uname.error = true;
        }
      }
    });
  };

  $scope.checkFname = function() {
    if (typeof $scope.user.fname == 'undefined') {
      return;
    }
    var result = testName($scope.user.fname);
    $scope.fname.errorMessage = result.message;
    $scope.fname.inputClass = result.newClass;
    $scope.fname.error = result.error;
  };

  $scope.checkSname = function() {
    if (typeof $scope.user.sname == 'undefined') {
      return;
    }
    var result = testName($scope.user.sname);
    $scope.sname.errorMessage = result.message;
    $scope.sname.inputClass = result.newClass;
    $scope.sname.error = result.error;
  };

  function testEmail(email) {
    var result = {error : false, message : "", newClass : "validInput"};
    if ($scope.registerForm.email.$invalid) {
      result.message = "Please enter a valid email address";
      result.newClass = 'invalidInput';
      result.error = true;
    }
    return result;
  }

  function testPass1(password) {
    var result = {error : false, message : "", newClass : "validInput"};
    if (password.length < 6) {
      result.message = "Password must be at least 6 characters long";
      result.error = true;
      result.newClass = "invalidInput";
    }
    return result;
  }
  function testPass2(pass1, pass2) {
    var result = {error : false, message : "", newClass : "validInput"};
    if (pass1 != pass2) {
      result.message = "Passwords must match";
      result.error = true;
      result.newClass = "invalidInput";
    }
    return result;
  }

  function testUname(uname) {
    var result = {error : false, message : "", newClass : "validInput"};
    var patt = /^[a-z0-9]+$/i;
    if (!patt.test(uname)) {
      result.message = "Usernames may only contain letters and numbers";
      result.newClass = 'invalidInput';
      result.error = true;
    }
    else if (uname.length > 22){
      result.message = "Usernames must have no more than 22 characters";
      result.newClass = 'invalidInput';
      result.error = true;
    }
    return result;
  }
  function testName(name) {
    var patt = /^[a-z]+$/i;
    var result = {error : false, message : "", newClass : "validInput"};
    if (!patt.test(name)) {
      result.message = "Names may only contain letters";
      result.error = true;
      result.newClass = "invalidInput";
    }
    return result;
  }
}
