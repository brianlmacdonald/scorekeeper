import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))

// global.window = {}
// import localStorage from 'mock-local-storage'
// window.localStorage = global.localStorage

import Login from './Login'

/* global describe it beforeEach */
describe('<Login />', () => {
  let root, fakeAuth
  beforeEach('render the root', () => {
    fakeAuth = {
      signInWithPopup: spy(),
      signInWithRedirect: spy(),
    }
    root = shallow(<Login auth={fakeAuth} />)
  })

  it('logs in with google', () => {
    const button = root.find('button.googleLogin')
    expect(button).to.have.length(1)
    button.simulate('click')
    expect(fakeAuth.signInWithPopup).to.have.been.calledWithMatch({providerId: 'google.com'})
  })
})

// global.window = undefined
