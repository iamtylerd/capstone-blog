"use strict";

app.factory("StorageFactory", function(FirebaseURL, $q, $http, localStorageService, $rootScope, $mdToast, ngProgressFactory){
	let currentUser = localStorageService.get("currentUser");
	$rootScope.imageUrl = [];
	$rootScope.imageDone = true;
	$rootScope.allImages = [];
	$rootScope.imgObj = [];
	

	

	// Create a root reference
	var storageRef = firebase.storage().ref();

	// Image Ref
	var imagesRef = storageRef.child('img');
	

  // Create the file metadata
	let getMetadata = function() {
		let metadata = {
		  contentType: 'image/jpg'
		  // "uid": currentUser.uid
		};
		return metadata
	}

	// Upload file and metadata to the object 'images/mountains.jpg'
	let uploadTask = function(file, metadata) {
		
		storageRef.child('img/' + file.name).put(file, metadata)
		.on('state_changed', function(snapshot){
		  // Observe state change events such as progress, pause, and resume
		  // See below for more detail
		  	// var progress = Math.round(100 * (snapshot.bytesTransferred / snapshot.totalBytes));
		  	// console.log(progress)
		  	// progressToast(progress)
    		
		  }, function(error) {
		  // Handle unsuccessful uploads
		  }, function() {
		  	console.log(file.name)
		  	let imgRef = storageRef.child('img/' + file.name);
		  	$rootScope.ImgName = file.name;
		  	console.log($rootScope.ImgName)
			imgRef.getDownloadURL()
			.then(function(url) {
			$rootScope.imageUrl.push(url)
			$rootScope.imgObj.push({url: url, name: $rootScope.ImgName})
			$rootScope.imageDone = true;
			$mdToast.show($mdToast.simple().textContent('Upload is done').position("right"));
			console.log($rootScope.imgObj)
			$rootScope.$apply()
		  // Handle successful uploads on complete
		  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
		 	});
	  	});
	};

	let fetchDownloadLink = function (file) {
		let fileName = file.val().name
		console.log("fecth", file)
		let imgRef = storageRef.child('img/' + fileName);
		imgRef.getDownloadURL().then(function(url) {
			console.log(url);
		});
	}

	let getImageUrl = function () {
		return $rootScope.imageUrl;
	}

	let deleteImgStorage = function (name) {
		storageRef.child('img/' + name).delete()
		.then(function() {

		})
		.catch(function () {
		})
	}

	// let progressToast = function (progress) {
	// 	$mdToast.show($mdToast.simple().textContent('Upload is ' + progress + '% done').position("right"));
	// }



		return {uploadTask, getMetadata, fetchDownloadLink, getImageUrl, deleteImgStorage}

	}) 