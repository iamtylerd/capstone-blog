app.controller('AdminCtrl', function($scope, $location, PostFactory, FirebaseURL, localStorageService, ViewPostsFactory, Upload, $mdDialog, StorageFactory){
	let currentUser = localStorageService.get("currentUser");
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
			return postCollection
			})
		})
	}

	$scope.EditPostLocation = function (id) {
		$location.url(`/edit/${id}`)
	}

	$scope.openModalPhoto = function () {
		$mdDialog.show({
			contentElement:
			document.querySelector('#upload-modal')
		});
	};

	$scope.hideModal = function() {
    	$mdDialog.hide();
 	};
	

	 $scope.uploadImg = function (file) {
	  console.log(file.name);
	  StorageFactory.uploadTask(file, StorageFactory.getMetadata())
	  $scope.hideModal();
	};


})
