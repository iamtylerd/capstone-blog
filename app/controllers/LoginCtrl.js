"use strict";

app.controller('LoginCtrl', function($rootScope, $scope, $location, UserFactory, localStorageService, StorageFactory){
  let userExists = false
  let currentUser = null
  

  $scope.login = function(){
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(user){
      UserFactory.getUserList()
      .then(function(userList){
        currentUser = firebase.auth().currentUser;
        let currentUid = firebase.auth().currentUser.uid;
        console.log(firebase.auth().currentUser)
        console.log("currentUser", currentUid)
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
            uid: currentUser.uid
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
        $scope.loggedin = false;
      })
      localStorageService.set("currentUser", "null")
    }
  });

  







})
