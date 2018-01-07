//Module for card game.
const clone = require('ramda').clone
class Game {

  checkJokers(cardsArr) {
    return cardsArr.filter(card => card.name !== 'Joker')
  }

  checkPairs(cardIds) {
    if (cardIds.length < 2) return false;
    const cards = this.useCardObjs(cardIds)
    const cardsWithoutJokers = this.checkJokers(cards)
    const targetValue = cardsWithoutJokers[0].name
    const hasTargetValue = (card) => {
      return card.name === targetValue
    }
    return cardsWithoutJokers.every(hasTargetValue);
  }

  useCardObjs(cardIds) {
    return cardIds.map(cardId => clone(this.deck[cardId]))
  }

  isSameSuit(cards) {
    const targetSuit = cards[0].suit
    const isTargetSuit = (card) => {
      return card.suit === targetSuit;
    }
    return cards.every(isTargetSuit)
  }

  sortCards(cardIds) {
    return cardIds.sort((cardA, cardB) => {
      return cardA > cardB
    })
  }

  checkFlush(cardIds) {
    if (cardIds.length < 3) return
    const cards = this.useCardObjs(cardIds)
    if (cards.length < 3) return false
    const cardsWithoutJokers = this.checkJokers(cards)
    let jokers = cards.length - cardsWithoutJokers.length
    if (!this.isSameSuit(cardsWithoutJokers)) return false

    for (let i = cardsWithoutJokers.length - 1; i > 0; i--) {
      const gap = cardsWithoutJokers[i].id - cardsWithoutJokers[i - 1].id
      if (gap > 3) return false
      if (gap > 1) {
        if (jokers && gap === 2) {
          jokers--
        } else if (jokers && gap === 3) {
          jokers -= 2
        } else {
          return false
        }
      }
    }
    return true;
  }

  validateDiscard(discards) {
    if (!discards.length) return false;
    const sortedDiscards = this.sortCards(discards)
    if (sortedDiscards.length === 1 || this.checkPairs(sortedDiscards) || this.checkFlush(sortedDiscards)) {
      sortedDiscards.forEach(cardId => this.discardNode(cardId))
      return true;
    }
    return false;
  }


  makeDiscard(player, discards) {
    const cardIds = discards.map(card => card.id)
    player.hand = player.hand.filter(card => !cardIds.includes(card.id))
    return player
  }

  handTotal(hand) {
    return hand.reduce(function (total, card) {
      const val = card.number
      return total + val;
    }, 0)
  }

  lowestScore() {
    let min = null;
    let lowScore = []
    this.players.forEach(player => {
      if (player.handTotalVal < min || min === null) {
        lowScore = []
        min = player.handTotalVal
        lowScore.push(player)
      } else if (player.handTotalVal === min) {
        lowScore.push(player)
      }
    })
    return lowScore
  }

  calculatePlayerScores(rules) {
    const updatedPlayers = this.players.map(player => {
      if (player.sequentialWins) {
        if (!player.handTotalVal) {
          const subtract = (-15 * player.hand.length)
          player.score -= subtract
        }
        return player
      } else if (!rules.jokersZero) {
        player.handTotalVal += (player.hand - this.checkJokers(player.hand)) * 15;
      }
      player.score += player.handTotalVal
      return player;
    })
    return updatedPlayers
  }

  newGame() {
    //players with hands, shuffled deck, and a discard pile
  }

  deckEmpty() {
    let discard = this.discardPile.top.next
    this.discardPile.top.next = null
    this.round += this.round
    while (discard) {
      this.deck[discard.value].dealt = false
      discard = discard.next
    }
  }

  undealtCards() {
    return Object.keys(this.deck).filter(id => {
      return this.deck[id].dealt === false
    })
  }

  resetCards() {
    for (let i = 1; i <= 54; i++) {
      this.deck[i].dealt = false;
    }
  }

  shuffle(bool = true) {
    if (bool) {
      this.shuffledCards = this.undealtCards(this.deck)
    }
    let m = this.shuffledCards.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      [this.shuffledCards[m], this.shuffledCards[i]] = [this.shuffledCards[i], this.shuffledCards[m]]
    }
  }

  deal() {
    this.resetHands(this.players)
    this.shuffle()
    this.shuffle(false)
    this.shuffle(false)
    for (let card = 0; card < 5; card++) {
      for (let playerNumber = 0; playerNumber < this.players.length; playerNumber++) {
        if (this.players[playerNumber].active) {
          const cardId = this.shuffledCards.pop()
          this.deck[cardId].dealt = true
          this.players[playerNumber].hand = [...this.players[playerNumber].hand, cardId]
        }
      }
    }
  }

  resetHands() {
    this.players.forEach(player => {
      player.hand = []
    })
  }

  createPlayerMaker() {
    let idNum = 1;
    return (playerName = `Player ${idNum}`) => {
      const player = {}
      player.name = playerName
      player.hand = []
      player.score = 0
      player.checked = false
      player.sequentialWins = 0
      player.active = true
      player.handTotalVal = 0
      player.id = idNum
      idNum++;
      this.players = [...this.players, player];
    }
  }

  discardNode(cardId) {
    const discardNode = {}
    discardNode.value = cardId
    discardNode.next = this.discardPile.top
    this.discardPile.top = discardNode
  }

  constructor() {
    this.shuffledCards = []
    this.players = []
    this.round = 'A'

    this.discardPile = {
      top: null
    }

    this.deck = {
      1: {
        name: 'A',
        number: 1,
        suit: `\u2660`,
        dealt: false,
        id: 1
      }, 2: {
        name: '2',
        number: 2,
        suit: `\u2660`,
        dealt: false,
        id: 2
      }, 3: {
        name: '3',
        number: 3,
        suit: `\u2660`,
        dealt: false,
        id: 3
      }, 4: {
        name: '4',
        number: 4,
        suit: `\u2660`,
        dealt: false,
        id: 4
      }, 5: {
        name: '5',
        number: 5,
        suit: `\u2660`,
        dealt: false,
        id: 5
      }, 6: {
        name: '6',
        number: 6,
        suit: `\u2660`,
        dealt: false,
        id: 6
      }, 7: {
        name: '7',
        number: 7,
        suit: `\u2660`,
        dealt: false,
        id: 7
      }, 8: {
        name: '8',
        number: 8,
        suit: `\u2660`,
        dealt: false,
        id: 8
      }, 9: {
        name: '9',
        number: 9,
        suit: `\u2660`,
        dealt: false,
        id: 9
      }, 10: {
        name: '10',
        number: 10,
        suit: `\u2660`,
        dealt: false,
        id: 10
      }, 11: {
        name: 'J',
        number: 10,
        suit: `\u2660`,
        dealt: false,
        id: 11
      }, 12: {
        name: 'Q',
        number: 10,
        suit: `\u2660`,
        dealt: false,
        id: 12
      }, 13: {
        name: 'K',
        number: 10,
        suit: `\u2660`,
        dealt: false,
        id: 13
      }, 14: {
        name: 'A',
        number: 1,
        suit: `\u2663`,
        dealt: false,
        id: 14
      }, 15: {
        name: '2',
        number: 2,
        suit: `\u2663`,
        dealt: false,
        id: 15
      }, 16: {
        name: '3',
        number: 3,
        suit: `\u2663`,
        dealt: false,
        id: 16
      }, 17: {
        name: '4',
        number: 4,
        suit: `\u2663`,
        dealt: false,
        id: 17
      }, 18: {
        name: '5',
        number: 5,
        suit: `\u2663`,
        dealt: false,
        id: 18
      }, 19: {
        name: '6',
        number: 6,
        suit: `\u2663`,
        dealt: false,
        id: 19
      }, 20: {
        name: '7',
        number: 7,
        suit: `\u2663`,
        dealt: false,
        id: 20
      }, 21: {
        name: '8',
        number: 8,
        suit: `\u2663`,
        dealt: false,
        id: 21
      }, 22: {
        name: '9',
        number: 9,
        suit: `\u2663`,
        dealt: false,
        id: 22
      }, 23: {
        name: '10',
        number: 10,
        suit: `\u2663`,
        dealt: false,
        id: 23
      }, 24: {
        name: 'J',
        number: 10,
        suit: `\u2663`,
        dealt: false,
        id: 24
      }, 25: {
        name: 'Q',
        number: 10,
        suit: `\u2663`,
        dealt: false,
        id: 25
      }, 26: {
        name: 'K',
        number: 10,
        suit: `\u2663`,
        dealt: false,
        id: 26
      }, 27: {
        name: 'A',
        number: 1,
        suit: `\u2764`,
        dealt: false,
        id: 27
      }, 28: {
        name: '2',
        number: 2,
        suit: `\u2764`,
        dealt: false,
        id: 28
      }, 29: {
        name: '3',
        number: 3,
        suit: `\u2764`,
        dealt: false,
        id: 29
      }, 30: {
        name: '4',
        number: 4,
        suit: `\u2764`,
        dealt: false,
        id: 30
      }, 31: {
        name: '5',
        number: 5,
        suit: `\u2764`,
        dealt: false,
        id: 31
      }, 32: {
        name: '6',
        number: 6,
        suit: `\u2764`,
        dealt: false,
        id: 32
      }, 33: {
        name: '7',
        number: 7,
        suit: `\u2764`,
        dealt: false,
        id: 33
      }, 34: {
        name: '8',
        number: 8,
        suit: `\u2764`,
        dealt: false,
        id: 34
      }, 35: {
        name: '9',
        number: 9,
        suit: `\u2764`,
        dealt: false,
        id: 35
      }, 36: {
        name: '10',
        number: 10,
        suit: `\u2764`,
        dealt: false,
        id: 36
      }, 37: {
        name: 'J',
        number: 10,
        suit: `\u2764`,
        dealt: false,
        id: 37
      }, 38: {
        name: 'Q',
        number: 10,
        suit: `\u2764`,
        dealt: false,
        id: 38
      }, 39: {
        name: 'K',
        number: 10,
        suit: `\u2764`,
        dealt: false,
        id: 39
      }, 40: {
        name: 'A',
        number: 1,
        suit: `\u2666`,
        dealt: false,
        id: 40
      }, 41: {
        name: '2',
        number: 2,
        suit: `\u2666`,
        dealt: false,
        id: 41
      }, 42: {
        name: '3',
        number: 3,
        suit: `\u2666`,
        dealt: false,
        id: 42
      }, 43: {
        name: '4',
        number: 4,
        suit: `\u2666`,
        dealt: false,
        id: 43
      }, 44: {
        name: '5',
        number: 5,
        suit: `\u2666`,
        dealt: false,
        id: 44
      }, 45: {
        name: '6',
        number: 6,
        suit: `\u2666`,
        dealt: false,
        id: 45
      }, 46: {
        name: '7',
        number: 7,
        suit: `\u2666`,
        dealt: false,
        id: 46
      }, 47: {
        name: '8',
        number: 8,
        suit: `\u2666`,
        dealt: false,
        id: 47
      }, 48: {
        name: '9',
        number: 9,
        suit: `\u2666`,
        dealt: false,
        id: 48
      }, 49: {
        name: '10',
        number: 10,
        suit: `\u2666`,
        dealt: false,
        id: 49
      }, 50: {
        name: 'J',
        number: 10,
        suit: `\u2666`,
        dealt: false,
        id: 50
      }, 51: {
        name: 'Q',
        number: 10,
        suit: `\u2666`,
        dealt: false,
        id: 51
      }, 52: {
        name: 'K',
        number: 10,
        suit: `\u2666`,
        dealt: false,
        id: 52
      }, 53: {
        name: 'Joker',
        number: 0,
        suit: `\uD83C\uDCCF`,
        dealt: false,
        id: 53
      }, 54: {
        name: 'Joker',
        number: 0,
        suit: `\uD83C\uDCCF`,
        dealt: false,
        id: 54
      }
    }
  }
}


module.exports = Game
