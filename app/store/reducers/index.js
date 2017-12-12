import {combineReducers} from 'redux'

import game from './game'
import rules from './rules'
import players from './players'

const RootReducer = combineReducers({game, rules, players})

export default RootReducer
export * from './game'
export * from './rules'
export * from './players'

