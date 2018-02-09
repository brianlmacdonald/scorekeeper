import React from 'react'

import firebase from 'APP/fire'

import store, {loadContinueAction} from '../store'

const google = new firebase.auth.GoogleAuthProvider()

const db = firebase.database()

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    db.ref('users/' + user.uid)
      .child('game')
      .on('value', snapshot => {
          store.dispatch(loadContinueAction(snapshot.val()))
      })
  } else {
    const localGame = window.localStorage.getItem('game')
    localGame ? store.dispatch(loadContinueAction(JSON.parse(localGame))) : console.log('no local game')
  }
});

export default ({ auth }) =>
  // signInWithPopup will try to open a login popup, and if it's blocked, it'll
  // redirect. If you prefer, you can signInWithRedirect, which always
  // redirects.
  (<button
    className={'googleLogin'}
    onClick={() => auth.signInWithPopup(google)}>google login</button>)
