import { clone } from 'ramda'
const ADD_PLAYERS = "ADD_PLAYERS"
const PLAYER_NAMES = "PLAYER_NAMES"

export const addPlayersAction = (payload) => ({
  type: ADD_PLAYERS,
  payload
})

export const playerNamesAction = (payload) => ({
  type: PLAYER_NAMES,
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
    default:
      return state

  }

}

export default players
