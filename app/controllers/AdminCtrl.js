app.controller('AdminCtrl', function($scope, $location, PostFactory, FirebaseURL, localStorageService, ViewPostsFactory){
	tinymce.init({ selector:'textarea' })
	let currentUser = localStorageService.get("currentUser");
	$scope.user = currentUser;
	// let date = new Date();
	// $scope.FromDate = date;
	// console.log($scope.FromDate)
	
	$scope.newBlogPost = {
		post: "",
		title: "",
		category: "",
		tags: "",
		uid: currentUser.uid,
		date: "$scope.FromDate"
	};

	

	ViewPostsFactory.getPosts()
	.then(function(postCollection) {
		$scope.posts = postCollection
		return postCollection
	})

	$scope.logout = function(){
	    firebase.auth().signOut();
	    $location.url("/");
	    console.log("signed out");
  	}


	$scope.AddPost = function () {
		console.log($scope.newBlogPost)
		PostFactory.postNewBlog($scope.newBlogPost)
		.then(function () {
			ViewPostsFactory.getPosts()
			.then(function(postCollection) {
			$scope.posts = postCollection
			return postCollection
			})
		})
	}

	$scope.EditPostLocation = function (id) {
		$location.url(`/edit/${id}`)
	}



})
