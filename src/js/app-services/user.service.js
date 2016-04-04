HCDietsApp.factory('UserService', UserService);

function UserService($http) {
    var service = {};

    service.GetById = GetById;
    service.GetByEmail = GetByEmail;
    service.GetByUname = GetByUname;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetById(id) {
      return $http.get('/api.php/user?filter[]=id,eq,' + id).then(handleSuccess, handleError('Error getting user by id'));
    }

    function GetByEmail(emailvalue) {
      return $http.get('/api.php/user?filter[]=email,eq,' + emailvalue).then(handleSuccess, handleError('Error getting user by email'));
    }

    function GetByUname(unamevalue) {
      return $http.get('/api.php/user?filter[]=uname,eq,' + unamevalue).then(handleSuccess, handleError('Error getting user by email'));
    }

    function Create(user) {
      if (validateUserInfo(user)) {
        // Create user to generate id
        return $http.post('/api.php/user', { email : user.email, fname : user.fname, sname : user.sname, uname : user.uname} ).then(function() {
          $http.get('/api.php/user?filter[]=email,eq,' + user.email).then(function(response) {
            var id = response.data.user.records[0][0];
            var code = CryptoJS.SHA256(user.pass).toString();
            $http.post('/api.php/pass', { userid : id, pass: code } ).then(handleSuccess, handleError('Failed to create password'));
          }, handleError("Failed to query user id"));
        }, handleError("Failed to create user"));
      }
      else {
        return handleError("Invalid Input"); // should never happen. input should be validated on the client side before submission
      }
    }

    function Update(user) {
      return $http.put('/api.php/user/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
    }

    function Delete(id) {
      return $http.delete('/api.php/user/' + id).then(handleSuccess, handleError('Error deleting user'));
    }

    // private functions

    function handleSuccess(res) {
      return { success: true, data: res.data };
    }

    function handleError(error) {
      return function () {
          return { success: false, message: error };
      };
    }

    function validateUserInfo(user) {
      return true;
    }
}
