"use strict";

app.controller('EditPostCtrl', function($routeParams, $scope, $location, PostFactory, FirebaseURL, localStorageService, ViewPostsFactory){
	let currentUser = localStorageService.get("currentUser");
	$scope.user = currentUser;
	$scope.toggleEditTitle = false;
	$scope.toggleEditPost = false;
	$scope.updatedPost = {
		"post": "",
		"title": "",
		"category": "",
		"tags": "",
		"uid": currentUser.uid,
		"date": ""
	};
	
	ViewPostsFactory.getEditPost($routeParams.id)
	.then(function(postCollection) {
		console.log(postCollection)
		$scope.updatedPost = postCollection
		$scope.htmlVariable = $scope.updatedPost.post;
		return postCollection
	})

	$scope.toggleEditTitleFn = function () {
		$scope.toggleEditTitle = !$scope.toggleEditTitle;
	}
	$scope.toggleEditPostFn = function () {
		$scope.toggleEditPost = !$scope.toggleEditPost;
	}

	$scope.patchEditPost = function () {
		console.log("edit send")
		$scope.updatedPost.post = $scope.htmlVariable;
		ViewPostsFactory.sendEditPost($routeParams.id, $scope.updatedPost)
		.then(function(editResponse) {
			console.log(editResponse)
			$location.url("/admin")
		})
	}

	$scope.Remove = function () {
		ViewPostsFactory.deletePost($routeParams.id)
		.then(function () {
			$location.url("/admin")
		});
	}

});