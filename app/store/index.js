import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers/'
import thunkMiddleWare from 'redux-thunk'
import firebase from 'APP/fire'
const db = firebase.database()

const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))

export default store;
export * from './reducers'

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store.subscribe(function () {
      console.log(user)
      db.ref('users/' + user.uid).set({
        game: store.getState()
      })
    })
  } else {
    store.subscribe(function () {
      localStorage.setItem('game', JSON.stringify(store.getState()))
    })
  }
});
