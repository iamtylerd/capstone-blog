# Blogular

Blogular is a lightweight CMS written in Angular and uses Firebase for the server

  - Admin area
  - Google Sign in
  - Store posts and images

You can also:
  - Create dynamic slideshows
  - Update and delete posts
  - Change the color of your posts background and format your posts

### BEFORE YOU BEGIN
You will need to create a Firebase account and setup a database.
I use a fireinit.html inside my partials directory to init Firebase.  The file looks like this
~~~
 var config = {
    apiKey: "SecretAPIKey",
    authDomain: "WhateverYourAuthDomain.firebaseapp.com",
    databaseURL: "https://YourDatabase.firebaseio.com",
    storageBucket: "WhereToStorePhotos.appspot.com",
  };
  firebase.initializeApp(config);
~~~

### Tech

Blogular uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Firebase] - awesome database in JSON format
* [Google Materialize] - great UI boilerplate for modern web apps
* [Gulp] - the streaming build system
* [textangular] - WYSIWYG editor
* [jQuery] - duh
*  [sass] - Quickly write CSS


### Installation


Install the dependencies and start the server.

```sh
$ cd capstone-blog
$ npm install
$ http-server
```


License
----

MIT


**Free Software, Hell Yeah!**

