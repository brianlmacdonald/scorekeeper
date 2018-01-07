const expect = require('chai').expect
const Game = require('./gameClass')
const R = require('ramda')
const game = new Game()

const straightFlushHand = [1, 2, 3]
const nonstraightFlushHand = [1, 3, 4]
const straightFlushInsideJokers = [1, 54, 3]
const straightFlushDoubleInsideJokers = [1, 53, 54, 4]
const straightFlushInAndOutJokers = [54, 2, 53, 4]
const straightFlushSandwichJokers = [54, 3, 4, 53]
const chronologicallyJokers = [1, 2, 54, 53]
const nonSuitedStraight = [1, 2, 16]
const chronologicalIds = [12, 13, 14]
const nonStraightBigJokerGap = [1, 2, 6, 54]
const simplePairs = [1, 14]
const nonPairs = [1, 2]
const threeOfAKind = [1, 14, 27]
const nonThreeOfAKind = [1, 14, 28]
const fourOfAKind = [1, 14, 27, 40]
const nonFourOfAKind = [1, 13, 27, 40]


beforeEach(function () {
  game.players = []
  const newPlayer = game.createPlayerMaker()
  Object.keys(game.deck).forEach(id => {
    game.deck[id].dealt = false
  })
  for (let i = 0; i < 5; i++) {
    newPlayer()
  }
})

describe('game logic', function () {
  describe('deck', function () {
    it('should be an object', function () {
      expect(game.deck).to.be.an('object')
    })
    it('should have 54 objects nested inside', function () {
      expect(Object.keys(game.deck).length).to.equal(54)
    })
    it('each object should be a card object', function () {
      expect(Object.keys(game.deck[Math.ceil(Math.random() * 54)])).to.deep.equal(['name', 'number', 'suit', 'dealt', 'id'])
    })
    it('contains the correct ids for each card', function () {
      const correctIds = Object.keys(game.deck).find(cardId => {
        return game.deck[cardId].id !== Number(cardId)
      })
      expect(correctIds).to.equal(undefined)
    })
  })

  describe('undealt cards function', function () {
    it('should return an array', function () {
      expect(game.undealtCards()).to.be.an('array')
    })
    it("should only return ids of cards that haven't been dealt", function () {
      game.deck[1].dealt = true
      game.deck[2].dealt = true
      expect(game.undealtCards()).to.have.length(52)
    })
  })

  describe('shuffling deck function', function () {
    beforeEach(function () {
      game.deck[1].dealt = true
      game.shuffle()
    })
    it('should return an array with a length equaling the number of undealt cards in the deck', function () {
      expect(game.shuffledCards).to.have.length(53)
    })
    it('should return array with random ordered numbers between 1 and 54', function () {
      expect(game.shuffledCards).to.not.deep.equal(Object.keys(game.deck))
    })
  })

  describe('dealing function', function () {
    beforeEach(function () {
      game.deal()
    })
    it('should reduce the number of undealt cards in the deck', function () {
      expect(game.undealtCards()).to.have.length(29)
    })
    it('players hands should reflect card ids that are dealt in the deck', function () {
      expect(game.deck[game.players[0].hand[0]].dealt).to.equal(true)
    })
    it("should reset player's hands when dealt", function () {
      const testHand = R.clone(game.players[1].hand)
      game.deal()
      expect(game.players[1].hand).to.not.deep.equal(testHand)
    })
  })

  describe('straight flush check', function () {
    it('should validate a straight flush of three or more', function () {
      expect(game.validateDiscard(straightFlushHand)).to.equal(true)
    })

    it('should not validate a non straight flush hand', function () {
      expect(game.validateDiscard(nonstraightFlushHand)).to.equal(false)
    })

    it('should validate a straight flush with inside jokers', function () {
      expect(game.validateDiscard(straightFlushInsideJokers)).to.equal(true)
    })

    it('should validate a straight flush with two inside jokers', function () {
      expect(game.validateDiscard(straightFlushDoubleInsideJokers)).to.equal(true)
    })

    it('should validate a straight flush jokers in and out of sequence', function () {
      expect(game.validateDiscard(straightFlushInAndOutJokers)).to.equal(true)
    })

    it('should validate a straight flush jokers on the outside', function () {
      expect(game.validateDiscard(straightFlushSandwichJokers)).to.equal(true)
    })

    it('should validate a straight flush of joker joker card card', function () {
      expect(game.validateDiscard(chronologicallyJokers)).to.equal(true)
    })

    it('should not validate a non suited straight', function () {
      expect(game.validateDiscard(nonSuitedStraight)).to.equal(false)
    })

    it('should not validate chronological card ids', function () {
      expect(game.validateDiscard(chronologicalIds)).to.equal(false)
    })

    it('should not validate unfillable number gaps with a joker', function () {
      expect(game.validateDiscard(nonStraightBigJokerGap)).to.equal(false)
    })
  })

  describe('discard node', function () {
    beforeEach(function () {
      game.discardPile.top = null
      game.deck[1].dealt = true
      game.deck[2].dealt = true
      game.deck[3].dealt = true
      game.deck[4].dealt = true
      game.validateDiscard(straightFlushHand)
    })
    it('should keep track of the top value discard on a turn', function () {
      expect(game.discardPile.top.value).to.equal(3)
    })
    it('should be a linked list keeping track of all the discards', function () {
      expect(game.discardPile.top.next.value).to.equal(2)
    })
    it('should keep track of which cards to reshuffle on deck empty', function () {
      game.deckEmpty()
      expect(game.deck[1].dealt).to.not.equal(game.deck[4].dealt)
    })
    it('should keep the last card played as the top of the pile on deck empty', function () {
      game.deckEmpty()
      expect(game.discardPile.top.value).to.equal(3)
    })
  })

  describe('check pairs', function () {
    it('should validate pairs', function () {
      expect(game.validateDiscard(simplePairs)).to.equal(true)
    })
    it('should not validate when not a pair', function () {
      expect(game.validateDiscard(nonPairs)).to.equal(false)
    })
    it('should validate three of a kind', function () {
      expect(game.validateDiscard(threeOfAKind)).to.equal(true)
    })
    it('should not validate when not three of a kind', function () {
      expect(game.validateDiscard(nonThreeOfAKind)).to.equal(false)
    })
    it('should validate four of a kind', function () {
      expect(game.validateDiscard(fourOfAKind)).to.equal(true)
    })
    it('should not validate when not four of a kind', function () {
      expect(game.validateDiscard(nonFourOfAKind)).to.equal(false)
    })
  })
})
