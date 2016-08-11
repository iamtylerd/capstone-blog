"use strict";

app.factory("ViewPostsFactory", function(FirebaseURL, $q, $http, localStorageService){
	let currentUser = localStorageService.get("currentUser")
	let getPosts = function() {
		let post = [];
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/post.json`)
			.success(function(postObject) {
				if (postObject) {
					let postCollection = postObject;
					Object.keys(postCollection).forEach(function(key) {
						postCollection[key].id=key;
						postCollection[key].date = new Date(postCollection[key].date)
						post.push(postCollection[key]);
					})
					post.sort(function (a,b) {
						a = a.date
						b = b.date
						return a>b ? -1 : a<b ? 1:0;
					})
					console.log(post)
					resolve(post);
				} else {
					resolve(postObject);
				}
			})
			.error(function(error) {
				reject(error);
			});
		})
	};

	let getEditPost = function(id) {
			let editObj = {};
			return $q(function(resolve, reject) {
				$http.get(`${FirebaseURL}/post/${id}.json`)
				.success(function(editObj) {
					console.log(editObj);
					resolve(editObj);
					})
				.error(function(error) {
					reject(error);
				})
		})
	};

	let sendEditPost = function(id, updatedObj) {
		let accessToken = currentUser.stsTokenManager.accessToken
		let patchObj = {};
		console.log(updatedObj)
		return $q(function(resolve, reject) {
			$http.put(`${FirebaseURL}post/${id}.json?auth=${accessToken}`, updatedObj)
			.success(function(response) {
				console.log("put", response)
				resolve(response);
			})
			.error(function (error) {
				reject(error);
			});
		});
	};

	let deletePost = function(removeId) {
          let postUrl = FirebaseURL + "/post/" + removeId + ".json";
          return $q(function(resolve, reject) {
              $http.delete(postUrl)
              .success(function() {
                  resolve();
          });
        });
      };

    let getImg = function() {
    	let img = [];
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/img.json`)
			.success(function(imgObject) {
					if (imgObject) {
					let imgCollection = imgObject;
					Object.keys(imgCollection).forEach(function(key) {
						imgCollection[key].id=key;
						// imgCollection[key].date = new Date(imgCollection[key].date)
						img.push(imgCollection[key]);
					})
					// img.sort(function (a,b) {
					// 	a = a.date
					// 	b = b.date
					// 	return a>b ? -1 : a<b ? 1:0;
					// })
					console.log(img)
					resolve(img);
				} else {
					resolve(imgObject);
				}
			})
			.error(function(error) {
				reject(error);
			});
		})
	};

	let removeImg = function(removeId) {
          let postUrl = FirebaseURL + "/img/" + removeId + ".json";
          return $q(function(resolve, reject) {
              $http.delete(postUrl)
              .success(function() {
                  resolve();
          });
        });
      };

	return {getPosts, getEditPost, sendEditPost, deletePost, getImg, removeImg}
})