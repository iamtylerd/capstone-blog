"use strict";

app.controller('ViewPostsCtrl', function($window, $scope, $location, ViewPostsFactory, FirebaseURL, localStorageService) {
	$scope.noSearch = true;
	ViewPostsFactory.getPosts()
	.then(function(postCollection) {
		$scope.posts = postCollection
		return postCollection
	})

	$scope.SinglePostLocation = function (id) {
		$location.url(`/posts/${id}`)
	}

	ViewPostsFactory.getColor()
	.then(function(bgColor) {
		console.log(bgColor)
		let color = bgColor.color
		$scope.customBG = bgColor;
	})

})