"use strict";

app.controller('ViewPostsCtrl', function($scope, $location, ViewPostsFactory, FirebaseURL, localStorageService) {
	ViewPostsFactory.getPosts()
	.then(function(postCollection) {
		$scope.posts = postCollection
		return postCollection
	})
})