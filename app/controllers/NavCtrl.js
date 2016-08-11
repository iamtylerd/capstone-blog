"use strict";

app.controller('NavCtrl', function($scope, $location, PostFactory, FirebaseURL, localStorageService, ViewPostsFactory, Upload, $mdDialog, StorageFactory, $rootScope){
	let currentUser = localStorageService.get("currentUser");
	$rootScope.searchText = {};
	$rootScope.searchText.search = ""
	// console.log("tokens", currentUser.stsTokenManager)

	//Code for toolbar on singlePost-view.html to open and scale
	  $scope.speedDial = {};
	  $scope.speedDial.isOpen = false;
	  $scope.speedDial.mode = 'md-scale';

	  if (currentUser.stsTokenManager == undefined) {
	  	$scope.loggedIn = false;
	  	console.log("not logged in")
	  } else {
	  	$scope.loggedIn = true;
	  	console.log("logged in")
	  }

	  $scope.logout = function(){
		    firebase.auth().signOut();
		    $location.url("/");
		    console.log("signed out");
	  	}

	  $scope.goToAdmin = function () {
	  		$location.url("/admin")
	  }
});