"use strict";

app.controller('ViewPostsCtrl', function($scope, $location, ViewPostsFactory, FirebaseURL, localStorageService) {
	$scope.noSearch = true;
	ViewPostsFactory.getPosts()
	.then(function(postCollection) {
		$scope.posts = postCollection
		return postCollection
	})

	$scope.SinglePostLocation = function (id) {
		$location.url(`/posts/${id}`)
	}
})