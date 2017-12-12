import {clone} from 'ramda'

const initialState = {}

const game = (state = initialState, action) => {
  const newState = clone(state)
  switch (action.type) {
  
    default:
    return state

  }

}

export default game
