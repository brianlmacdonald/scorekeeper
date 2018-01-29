import React from 'react'
import {Link} from 'react-router'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
chai.use(require('chai-enzyme')())

import index from 'APP/app/components/ScoreKeeper'

describe('<Index />', function(){
  let ready = true, root
  beforeEach('render the root', () => {
    root = shallow(<index />)
  })
  it('should render.', function(){
    expect(root).to.have.length(1)
  })
})
