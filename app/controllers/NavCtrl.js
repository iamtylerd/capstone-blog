"use strict";

app.controller('NavCtrl', function($scope, $location, PostFactory, FirebaseURL, localStorageService, ViewPostsFactory, Upload, $mdDialog, StorageFactory, $rootScope){
	let currentUser = localStorageService.get("currentUser");
	$rootScope.searchText = {};
	$rootScope.searchText.search = ""
	$(".button-collapse").sideNav();


	$scope.User =localStorageService.get("currentUser");
	console.log($scope.User)
	//Code for toolbar on singlePost-view.html to open and scale
	  $scope.speedDial = {};
	  $scope.speedDial.isOpen = false;
	  $scope.speedDial.mode = 'md-scale';

	  if (currentUser.stsTokenManager == undefined || currentUser.stsTokenManager === null) {
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

	  $scope.goToImages = function () {
	  		$location.url("/images")
	  }

	  $scope.closeModal = function() {
	 		$mdDialog.hide();
	 	}

   	  $scope.openCustomCss = function (ev) {
		$mdDialog.show({
			targetEvent: ev,
      		clickOutsideToClose:true,
      		templateUrl: '/partials/picker.tmpl.html',
			// contentElement:
			// document.querySelector('#css-modal')
		});
	  };

	  $scope.updateCSS = function(color) {
	  	ViewPostsFactory.editBackground(color)
	  	.then(function (){
	  		ViewPostsFactory.getColor()
	  	})
	  	console.log(color)
	  	$mdDialog.hide();
	  }


});