import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers/'
import thunkMiddleWare from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))

export default store;
export * from './reducers'


store.subscribe(function(){
  console.log('grabbing something')
  localStorage.setItem('game', JSON.stringify(store.getState()))
})