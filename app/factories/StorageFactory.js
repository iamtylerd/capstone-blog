"use strict";

app.factory("StorageFactory", function(FirebaseURL, $q, $http, localStorageService, $rootScope){
	let currentUser = localStorageService.get("currentUser");
	$rootScope.imageUrl = [];
	$rootScope.imageDone = true;
	$rootScope.allImages = [];
	// $rootScope.ImgName;	
	

	// Create a root reference
	var storageRef = firebase.storage().ref();

	// Image Ref
	var imagesRef = storageRef.child('img');
	console.log(imagesRef);

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
		  }, function(error) {
		  // Handle unsuccessful uploads
		  }, function() {
		  	console.log(file.name)
		  	let imgRef = storageRef.child('img/' + file.name);
		  	$rootScope.ImgName = file.name;
		  	console.log($rootScope.ImgName)
			imgRef.getDownloadURL().then(function(url) {
			$rootScope.imageUrl.push(url)
			$rootScope.$apply()
			// $rootScope.imageDone = true;
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


		return {uploadTask, getMetadata, fetchDownloadLink, getImageUrl, deleteImgStorage}

	}) 