"use strict";

app.controller('AdminCtrl', function($rootScope, $timeout, $scope, $location, PostFactory, FirebaseURL, localStorageService, ViewPostsFactory, Upload, $mdDialog, StorageFactory, ngProgressFactory){
	let currentUser = localStorageService.get("currentUser");
	$scope.LoggedIn = false;
	$scope.CreateNewPost = false;
	$scope.noSearch = true;

	// Checks to see if the current user is logged in and re routes
	if(currentUser == "null") {
		$location.url(`/posts`)
	}
	else {
		$scope.LoggedIn = true;
		$scope.user = currentUser;
		$scope.htmlVariable;
		$scope.addImage;
		
		$scope.newBlogPost = {
			post: "",
			title: "",
			category: "",
			tags: "",
			uid: currentUser.uid,
			date: "",
			image: $scope.addImage
		};
		

// Get posts
		ViewPostsFactory.getPosts()
		.then(function(postCollection) {
			$scope.posts = postCollection
			return postCollection
		})

// Post to Firebase
		$scope.AddPost = function () {
			console.log($scope.newBlogPost)
			let date = new Date();
			$scope.newBlogPost.image = StorageFactory.getImageUrl()
			$scope.newBlogPost.date = date;
			$scope.newBlogPost.post = $scope.htmlVariable;
			PostFactory.postNewBlog($scope.newBlogPost)
			.then(function (postKey) {
				console.log($rootScope.imgObj)
				$rootScope.imgObj.forEach(function (single) {
					PostFactory.postNewImage(single)
				})
				console.log("imgObj", $rootScope.imgObj)
				ViewPostsFactory.getPosts()
				.then(function(postCollection) {
				$scope.posts = postCollection
				$scope.htmlVariable = "";
				$scope.newBlogPost = {
					post: "",
					title: "",
					category: "",
					tags: "",
					uid: currentUser.uid,
					date: "",
					image: ""
				}
				$scope.toggleCreateNewPost()
				return postCollection
				})
			})
			.then(function () {
				$rootScope.imageUrl = [];
				$rootScope.imgObj = [];
			})
				
		}

		$scope.ViewPost = function (id) {
			console.log(id)
			$location.url(`/posts/${id}`)
		}

		$scope.EditPostLocation = function (id) {
			$location.url(`/edit/${id}`)
		}

		$scope.openModalPhoto = function () {
			$rootScope.imageDone = false;
			$mdDialog.show({
				contentElement:
				document.querySelector('#upload-modal')
			});
		};

		$scope.hideModal = function() {
			$rootScope.imageDone = false;
	    	$mdDialog.hide();
	 	};

	 	$scope.closeModal = function() {
	 		$rootScope.imageDone = true;
	 		$mdDialog.hide();
	 	}
		
// Upload to storage
		 $scope.uploadImg = function (file) {
		  $rootScope.imageDone = false;
		 	
		  StorageFactory.uploadTask(file, StorageFactory.getMetadata())
		  $scope.hideModal();
		  console.log($scope.uploadedImg)
		  $scope.uploadedImg = "";
		  // $scope.uploadedImg.name = "";
		};

		$scope.toggleCreateNewPost = function () {
			$scope.CreateNewPost = !$scope.CreateNewPost;
		}

		$scope.removeImg = function (array, index) {
			 array.splice(index, 1);
		}

	}
})
