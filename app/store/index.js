import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers/'
import thunkMiddleWare from 'redux-thunk'

export default createStore(rootReducer, applyMiddleware(thunkMiddleWare))

export * from './reducers'
