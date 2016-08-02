"use strict";

app.controller('SinglePostCtrl', function($scope, $location, $routeParams, ViewPostsFactory, FirebaseURL, localStorageService) {
	ViewPostsFactory.getEditPost($routeParams.id)
	.then(function(postCollection) {
		console.log(postCollection)
		$scope.singlePost = postCollection
		return postCollection
	})

})