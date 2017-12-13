import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import Styles from './styles.js'

import Rules from './Game/Rules'
import PlayerScreen from './Game/PlayerScreen'
import ScoreScreen from './Game/ScoreScreen'
import { RaisedButton } from 'material-ui'

const Index = ({ children }) => (
  <div>
    <div style={Styles.spacer} />
    <div style={Styles.container}>
      <RaisedButton
        primary={true}
        style={Styles.button}
        label='create game' />
      <RaisedButton
        primary={true}
        style={Styles.button}
        label='all time' />
      <RaisedButton
        primary={true}
        style={Styles.button}
        containerElement={<Link to='/new' />}
        label='scorekeeper' />
    </div>
  </div>)

export default <Route path="/game" component={({ children }) => children}>
  <IndexRoute component={Index} />
  <Route path="/new" component={Rules} style={Styles} />
  <Route path='/players' component={PlayerScreen} />
  <Route path='/scores' component={ScoreScreen} />
</Route>
