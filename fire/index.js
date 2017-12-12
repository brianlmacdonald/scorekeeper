const firebase = require('firebase')

// -- // -- // -- // Firebase Config // -- // -- // -- //
const config = {
  apiKey: 'AIzaSyAb5daqsTMmwkSNd3vhnm2rF9Jss7Qs8Mk',
  authDomain: 'scorekeeper-4cdf0.firebaseapp.com',
  databaseURL: 'https://scorekeeper-4cdf0.firebaseio.com',
  projectId: 'scorekeeper-4cdf0',
  storageBucket: 'scorekeeper-4cdf0.appspot.com',
  messagingSenderId: '981631590102'
};
// -- // -- // -- // -- // -- // -- // -- // -- // -- //

// Initialize the app, but make sure to do it only once.
//   (We need this for the tests. The test runner busts the require
//   cache when in watch mode; this will cause us to evaluate this
//   file multiple times. Without this protection, we would try to
//   initialize the app again, which causes Firebase to throw.
//
//   This is why global state makes a sad panda.)
firebase.__bonesApp || (firebase.__bonesApp = firebase.initializeApp(config))

module.exports = firebase
