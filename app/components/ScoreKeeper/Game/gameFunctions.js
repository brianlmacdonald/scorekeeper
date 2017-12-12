import {clone} from 'ramda'

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