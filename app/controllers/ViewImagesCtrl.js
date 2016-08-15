"use strict";

app.controller('ViewImagesCtrl', function($rootScope, $window, $scope, $location, ViewPostsFactory, FirebaseURL, localStorageService, StorageFactory) {
	$scope.imgs = [];


	ViewPostsFactory.getImg()
	.then(function(postCollection) {
		$scope.imgs = postCollection
		
		return postCollection
	})

	$scope.DeleteImg = function(img) {
		console.log(img)
		ViewPostsFactory.removeImg(img)
		.then(function () {
			ViewPostsFactory.getImg()
				.then(function(postCollection) {
				$scope.imgs = postCollection
				return postCollection 
			})
		})
		// StorageFactory.deleteImgStorage(img.name)
		
	}

	$scope.GetName = function(name) {
		console.log(name)
	}

	$scope.DownloadImg = function(url) {
		console.log(`${url}`)
		$window.location.href = url;
	}
});