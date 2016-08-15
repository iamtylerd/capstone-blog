"use strict";

const app = angular.module('app', ['ngRoute', 'LocalStorageModule', 'textAngular', 'ngFileUpload', 'ngMaterial', 'ngAnimate', 'td.easySocialShare', 'ngDisqus', 'ngMdIcons', 'ngProgress', 'angular.filter', 'color.picker' ])
.constant('FirebaseURL', "https://capstone-blog.firebaseio.com/");

app.config(function($locationProvider) {
		// $locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	});

app.config(function($disqusProvider){
      $disqusProvider.setShortname("nsstest");
   });

app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src !== attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  };
});



app.config(function($routeProvider) {

    $routeProvider.
        when('/admin', {
        	templateUrl: 'partials/admin.html',
        	controller: 'AdminCtrl'
        }).
        when('/', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        }).
        when('/posts', {
        	templateUrl: 'partials/posts.html',
        	controller: 'ViewPostsCtrl'
        }).
        when('/edit/:id', {
        	templateUrl: 'partials/edit.html',
        	controller: 'EditPostCtrl'
        }).
        when('/posts/:id', {
        	templateUrl: 'partials/singlePost.html',
        	controller: 'SinglePostCtrl'
        }).	
        when('/images', {
        	templateUrl: 'partials/viewImg.html',
        	controller: 'ViewImagesCtrl'
        }).
        otherwise('/#!');
});