import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers/'
import thunkMiddleWare from 'redux-thunk'
import firebase from 'APP/fire'
const db = firebase.database()
const user = firebase.auth().currentUser

const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))

export default store;
export * from './reducers'


store.subscribe(function(){
  localStorage.setItem('game', JSON.stringify(store.getState()))
})

store.subscribe(function(){
  console.log(user, 'user in store')
  db.ref('users/' + user.uid).set({
    game: store.getState()
  })
})