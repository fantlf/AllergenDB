HCDietsApp.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['localStorageService','$rootScope', '$scope'];
function HomeCtrl(localStorageService,$rootScope, $scope) {
	localStorageService.set("returnLoc", "home");
}
