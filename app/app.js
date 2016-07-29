"use strict";

const app = angular.module('app', ['ngRoute', 'LocalStorageModule'])
.constant('FirebaseURL', "https://capstone-blog.firebaseio.com/");

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
        otherwise('/');
});