import {clone} from 'ramda'
import store from '../../../store/'

const player = {
  name: null,
  wins: 0,
  score: 0,
  id: null,
  checked: false,
  active: true
}

export const makePlayers = (num) => {
  const playerArray = []
  for (let i = 1; i <= num; i++) {
    const newPlayer = clone(player)
    newPlayer.id = i
    newPlayer.name = `Player ${i}`
    playerArray.push(newPlayer)
  }
  return playerArray
}

export const calculateScore = (localState) => {
  console.log(localState)
  const storeState = store.getState()
  console.log(storeState.rules)
  let score = localState.total
  if (localState.assaf) score += 30
  if (localState.yaniv) {
    if (!localState.total) {
      score += localState.jokers * -15
    } else {
      score = 0
    }
  }
  if (!localState.yaniv && localState.jokers) score += localState.jokers * storeState.rules.jokers
  return score
}
