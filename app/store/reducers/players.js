import { clone } from 'ramda'
const ADD_PLAYERS = "ADD_PLAYERS"
const PLAYER_NAMES = "PLAYER_NAMES"
const UPDATE_SCORE = 'UPDATE_SCORE'
const RESET_CHECKED = 'RESET_CHECKED'

export const addPlayersAction = (payload) => ({
  type: ADD_PLAYERS,
  payload
})

export const resetCheckedAction = () => ({
  type: RESET_CHECKED
})

export const playerNamesAction = (payload) => ({
  type: PLAYER_NAMES,
  payload
})

export const updateScoreAction = (payload) => ({
  type: UPDATE_SCORE,
  payload
})

const initialState = []


const players = (state = initialState, action) => {
  const newState = clone(state)
  switch (action.type) {
    
    case ADD_PLAYERS:
      return action.payload

    case PLAYER_NAMES:
      return newState.map(player => {
        return player.id === action.payload.id ? action.payload : player
      })

    case UPDATE_SCORE:
    return newState.map(player => {
      return player.id === action.payload.id ? action.payload : player
    })

    case RESET_CHECKED:
    return newState.map(player => {
      player.checked = false
      return player
    })
    
    default:
      return state
  }

}

export default players
