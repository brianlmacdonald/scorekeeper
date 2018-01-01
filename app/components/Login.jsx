import React from 'react'

import firebase from 'APP/fire'

import store, {loadContinueAction} from '../store'

const google = new firebase.auth.GoogleAuthProvider()

const db = firebase.database()

// Firebase has several built in auth providers:
// const facebook = new firebase.auth.FacebookAuthProvider()
// const twitter = new firebase.auth.TwitterAuthProvider()
// const github = new firebase.auth.GithubAuthProvider()
// // This last one is the email and password login we all know and
// // vaguely tolerate:
// const email = new firebase.auth.EmailAuthProvider()

// If you want to request additional permissions, you'd do it
// like so:
//
// google.addScope('https://www.googleapis.com/auth/plus.login')
//
// What kind of permissions can you ask for? There's a lot:
//   https://developers.google.com/identity/protocols/googlescopes
//
// For instance, this line will request the ability to read, send,
// and generally manage a user's email:
//
// google.addScope('https://mail.google.com/')

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    db.ref('users/' + user.uid)
      .child('game')
      .on('value', snapshot => {
          store.dispatch(loadContinueAction(snapshot.val()))
      })
  } else {
    const localGame = localStorage.getItem('game')
    localGame ? store.dispatch(loadContinueAction(JSON.parse(localGame))) : console.log('no local game')
  }
});

export default ({ auth }) =>
  // signInWithPopup will try to open a login popup, and if it's blocked, it'll
  // redirect. If you prefer, you can signInWithRedirect, which always
  // redirects.
  (<button
    className="googleLogin"
    onClick={() => auth.signInWithPopup(google)}>google login</button>)
