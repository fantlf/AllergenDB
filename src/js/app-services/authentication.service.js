HCDietsApp.factory('AuthenticationService', AuthenticationService);

UserService.$inject = ['UserService', '$rootScope', '$cookies', '$http'];
function AuthenticationService(UserService, $rootScope, $cookies, $http) {

    var service = {};

    service.setCredentials = setCredentials;
    service.clearCredentials = clearCredentials;
    service.simpleTestEmail = simpleTestEmail;
    service.simpleTestPass1 = simpleTestPass1;
    service.simpleTestPass2 = simpleTestPass2;
    service.simpleTestUname = simpleTestUname;
    service.simpleTestName  = simpleTestName;
    service.complexTestEmail = complexTestEmail;
    service.complexTestUname = complexTestUname;

    return service;

    function setCredentials(email, password) {
        var authdata = Base64.encode(email + ':' + password);
        $rootScope.globals = {
            currentUser: {
                email: email,
                authdata: authdata
            }
        };
        $cookies.putObject('globals', $rootScope.globals);
    }
    function clearCredentials() {
        $rootScope.globals = {};
        $cookies.remove('globals');
        $http.defaults.headers.common['Authorization'] = 'Basic '// jshint ignore:line
    }

    function simpleTestEmail(email) {
      var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if (!re.test(email))
        return { error : true, message : "Please enter a valid email address", newClass : "invalidInput"};
      else
        return {error : false, message : "", newClass : "validInput"};
    }

    function simpleTestPass1(pass) {
      if (pass.length < 6)
        return {error : true, message : "Passwords must be at least six characters", newClass : "invalidInput"};
      else
        return {error : false, message : "", newClass : "validInput"};
    }

    function simpleTestPass2(pass1, pass2) {
      if (pass1 !== pass2)
        return {error : true, message : "Passwords must match", newClass : "invalidInput"};
      else
        return {error : false, message : "", newClass : "validInput"};
    }

    function simpleTestUname(uname) {
      var patt = /^[a-z0-9]+$/i;
      if (!patt.test(uname))
        return {error : true, message : "Usernames may only contain letters and numbers", newClass : "invalidInput"};
      else if (uname.length > 22)
        return {error : true, message : "Usernames must have no more than 22 characters", newClass : "invalidInput"};
      else
        return {error : false, message : "", newClass : "validInput"};
    }

    function simpleTestName(name) {
      var patt = /^[a-z]+$/i;
      if (!patt.test(name))
        return {error : true, message : "Names may only contain letters", newClass : "invalidInput"};
      else
      return {error : false, message : "", newClass : "validInput"};
    }

    function complexTestEmail(email) {
      return UserService.GetByEmail(email).then(function (response) {
        if (response.success && response.data.user && response.data.user.records.length > 0)
          return {error : true, message : "A user with this email already exists", newClass : "invalidInput"};
        else
          return {error : false, message : "", newClass : "validInput"};

      });
    }

    function complexTestUname(uname) {
      return UserService.GetByUname(uname).then(function (response) {
        if (response.success && response.data.user && response.data.user.records.length > 0)
          return {error : true, message : "A user with this username already exists", newClass : "invalidInput"};
        else
        return {error : false, message : "", newClass : "validInput"};
      });
    }
}
var Base64 = {
  keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    encode: function (input) {
      var output = "";
      var chr1, chr2, chr3 = "";
      var enc1, enc2, enc3, enc4 = "";
      var i = 0;

      do {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
              enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
              enc4 = 64;
          }

          output = output +
              this.keyStr.charAt(enc1) +
              this.keyStr.charAt(enc2) +
              this.keyStr.charAt(enc3) +
              this.keyStr.charAt(enc4);
          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";
      } while (i < input.length);

      return output;
  },

  decode: function (input) {
      var output = "";
      var chr1, chr2, chr3 = "";
      var enc1, enc2, enc3, enc4 = "";
      var i = 0;

      // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
      var base64test = /[^A-Za-z0-9\+\/\=]/g;
      if (base64test.exec(input)) {
          window.alert("There were invalid base64 characters in the input text.\n" +
              "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
              "Expect errors in decoding.");
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      do {
          enc1 = this.keyStr.indexOf(input.charAt(i++));
          enc2 = this.keyStr.indexOf(input.charAt(i++));
          enc3 = this.keyStr.indexOf(input.charAt(i++));
          enc4 = this.keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
          }

          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";

      } while (i < input.length);

      return output;
  }
};
