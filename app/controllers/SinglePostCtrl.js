"use strict";

app.controller('SinglePostCtrl', function($scope, $location, $routeParams, ViewPostsFactory, FirebaseURL, localStorageService, $timeout) {
	$scope.noSearch = false;
	$scope.hasSlides = false;
	let slides = [];
	let INTERVAL = 3000;
	let buildSlideshow = function () {
		let setCurrentSlideIndex = function(index) {
			$scope.currentIndex = index;
			}
		let isCurrentSlideIndex = function(index) {
			    return $scope.currentIndex === index;
			}
		let nextSlide = function() {
			    $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
			    $timeout(nextSlide, INTERVAL);
			}
		let loadSlides = function() {
			    $timeout(nextSlide, INTERVAL);
			}
			$scope.slides = slides;
			$scope.currentIndex = 0;
			$scope.setCurrentSlideIndex = setCurrentSlideIndex;
			$scope.isCurrentSlideIndex = isCurrentSlideIndex;
			loadSlides();
	}

	ViewPostsFactory.getEditPost($routeParams.id)
	.then(function(postCollection) {
		console.log(postCollection)
		$scope.singlePost = postCollection
		angular.forEach(postCollection.image, function(i) {
			let singleImage = {}
			let counter = 0;
			singleImage.id = counter;
			singleImage.src = i;
			slides.push(singleImage);
			counter++
		})
		return postCollection
	}).then(function() {
		if (slides.length < 1) {
			$scope.hasSlides = false;
		} else {
			$scope.hasSlides = true;
		}
		});
		buildSlideshow();

		//Code for toolbar on singlePost-view.html to open and scale
	  $scope.speedDial = {};
	  $scope.speedDial.isOpen = false;
	  $scope.speedDial.mode = 'md-scale';



	  $scope.dynamicUrl = `posts/${$routeParams.id}`;

	})