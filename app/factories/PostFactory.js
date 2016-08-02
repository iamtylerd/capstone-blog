"use strict";

app.factory("PostFactory", function($rootScope, FirebaseURL, $q, $http, localStorageService){
let currentUser = localStorageService.get("currentUser")
console.log("tokens", currentUser.stsTokenManager)


	let postNewBlog = function(newPost) {
		let accessToken = currentUser.stsTokenManager.accessToken
		console.log(newPost)
	        return $q(function(resolve, reject) {
	            $http.post(`${FirebaseURL}post.json?auth=${accessToken}`,
	                newPost)
	                .success(function(ObjFromFirebase) {
	                    resolve(ObjFromFirebase)
	                })
	                .error(function (error) {
	                    reject (error);
	                });
	        });
	    };


   let saveId = function(post) {
		console.log(post.name)
		return $q(function(resolve, reject) {
            $http.patch(`${FirebaseURL}/post/${post[0].name}.json`, JSON.stringify({"id": `${post[0].name}`}))
                .success(function(ObjFromFirebase) {
                    console.log(ObjFromFirebase)
                    resolve(ObjFromFirebase)
                })
                .error(function (error) {
                    reject (error);
                });
        });
	};

	let keys = function (post) {
		return $q(function(resolve, reject) {})
	}
    return {postNewBlog, saveId}
});