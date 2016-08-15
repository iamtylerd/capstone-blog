"use strict";

app.controller('LoginCtrl', function($rootScope, $scope, $location, UserFactory, localStorageService, StorageFactory){
  let userExists = false
  let currentUser = null
  
// Check for a user logged in / Create new user
  $scope.login = function(){
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(user){
      UserFactory.getUserList()
      .then(function(userList){
        currentUser = firebase.auth().currentUser;
        let currentUid = firebase.auth().currentUser.uid;
        console.log(firebase.auth().currentUser)
        console.log("currentUser", currentUser)
        let userArray = [];
        for (user in userList){
          let index = userList[user];
          console.log("uid", index.uid)
          if(currentUid === index.uid){
              userExists = true;
          }
        }
      })
      .then(function(){
        if(userExists === false){
          let userObject = {
            name: currentUser.displayName,
            email: currentUser.email,
            uid: currentUser.uid,
            photoUrl: currentUser.photoURL
          }
          UserFactory.createUser(userObject)
        }
      })
      .then(function () {
        $location.url('/admin')
      })
    })
  }

  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      localStorageService.set("currentUser", user)
      $scope.$apply(function(){
        $scope.loggedin = true;
      })
    }
    else {
      $scope.$apply(function(){
        console.log("not logged", currentUser)
        $scope.loggedin = false;
      })
      localStorageService.set("currentUser", "null")
    }
  });

  







})
