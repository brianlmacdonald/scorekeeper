import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import thunkMiddleWare from 'react-redux'

export default createStore(rootReducer, applyMiddleware(thunkMiddleWare))

export * from './reducers'