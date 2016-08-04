app.controller('AdminCtrl', function($rootScope, $timeout, $scope, $location, PostFactory, FirebaseURL, localStorageService, ViewPostsFactory, Upload, $mdDialog, StorageFactory){
	let currentUser = localStorageService.get("currentUser");
	$scope.LoggedIn = false;
	$scope.CreateNewPost = false;
	$scope.noSearch = true;
	console.log(currentUser)
	
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
			let date = new Date();
			$scope.newBlogPost.image = StorageFactory.getImageUrl()
			$scope.newBlogPost.date = date;
			$scope.newBlogPost.post = $scope.htmlVariable;
			PostFactory.postNewBlog($scope.newBlogPost)
			.then(function () {
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
				};
				$rootScope.imageUrl = [];
				return postCollection
				})
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
			$rootScope.imageDone = true;
	    	$mdDialog.hide();
	 	};
		

		 $scope.uploadImg = function (file) {
		  console.log(file.name);
		  StorageFactory.uploadTask(file, StorageFactory.getMetadata())
		  // $rootScope.$apply();
		  $scope.hideModal();
		};

		$scope.toggleCreateNewPost = function () {
			$scope.CreateNewPost = !$scope.CreateNewPost;
		}

		$scope.removeImg = function (array, index) {
			 array.splice(index, 1);
		}
	}
})
