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
  const storeState = store.getState()
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

const checkForBonus = (playerObj, bonus) => {
  if (playerObj.score === 100 || playerObj.score === 150 || playerObj.score === 200) {
    playerObj.score += bonus
  }
}

export const checkForLosers = (playersArray) => {
  const bonus = store.getState().rules.bonus
  playersArray.forEach(maybeLoser => {
    checkForBonus(maybeLoser, bonus)
    if (maybeLoser.score > 200) {
      maybeLoser.active = false
    }
  })
}

const matchWinner = (playersArray) => {
  const storeState = store.getState()
  const winner = playersArray.find(maybeWinner => maybeWinner.wins === storeState.rules.matchWins)
  return winner ? winner : false
}

const attritionWinner = (playersArray) => {
  const activePlayers = playersArray.filter(maybeWinner => maybeWinner.active === true)
  return activePlayers
}

export const checkForWinner = (playersArray) => {
  const winnerByWins = matchWinner(playersArray)
  const winnerByAttrition = attritionWinner(playersArray)
  if (winnerByWins) return winnerByWins
  if (winnerByAttrition.length === 1) return winnerByAttrition[0]
  return false
}

