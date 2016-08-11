"use strict";

app.controller('ViewImagesCtrl', function($scope, $location, ViewPostsFactory, FirebaseURL, localStorageService) {

	ViewPostsFactory.getImg()
	.then(function(postCollection) {
		$scope.imgs = postCollection
		console.log($scope.imgs[0])
		return postCollection
	})

	$scope.DeleteImg = function(img) {
		console.log(img)
		let imgId = img.id
		let imgName = img.name
		console.log(img)
		ViewPostsFactory.removeImg(imgId)
		.then(function(imgName) {
			// StorageFactory.deleteImgStorage(imgName)
		})
	}
});