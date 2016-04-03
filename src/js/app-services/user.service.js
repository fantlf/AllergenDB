HCDietsApp.factory('UserService', UserService);

UserService.$inject = ['$http'];
function UserService($http) {
    var service = {};

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.GetByEmail = GetByEmail;
    service.getPassword = getPassword;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetAll() {
        return $http.get('/api.php/user').then(handleSuccess, handleError('Error getting all users'));
    }

    function GetById(id) {
        return $http.get('/api.php/user/' + id).then(handleSuccess, handleError('Error getting user by id'));
    }

    function GetByEmail(emailvalue) {
        return $http.get('/api.php/user/' + emailvalue).then(handleSuccess, handleError('Error getting user by email'));
    }

    function getPassword(id) {
      return $http.get('/api.php/pass?filter[]=userid,eq,' + id).then(handleSuccess, handleError('Error getting user by email'));
    }
    function Create(user) {
        if (validateUserInfo(user).success) {
          $http.post('/api.php/user', { email : user.email, fname : user.fname, sname : user.sname, uname : user.uname} )
            .then(function(response) {
              return GetByEmail(user.email).then(handleSuccess, handleError('Error Querying Id'));
            }, handleError('Error Creating User'));
        }
        else {
          return handleError("Error Creating User");
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
        return res.data;
    }

    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    }

    function validateUserInfo(user) {
      return { success : true };
    }
}
