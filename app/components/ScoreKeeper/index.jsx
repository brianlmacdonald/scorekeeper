import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import Styles from './styles.js'

import Rules from './Game/Rules'
import { AppBar, RaisedButton } from 'material-ui'

const Index = ({ children }) => (
  <div>
    <AppBar
      title='yaniv scorekeeper' />
    <div style={Styles.spacer} />
    <div style={Styles.container}>
      <RaisedButton
        primary={true}
        style={Styles.button}
        label='current game' />
      <RaisedButton
        primary={true}
        style={Styles.button}
        containerElement={<Link to='/new' />}
        label='new game' />
      <RaisedButton
        primary={true}
        style={Styles.button}
        label='rules' />
    </div>
  </div>)

export default <Route path="/game" component={({ children }) => children}>
  <IndexRoute component={Index} />
  <Route path="/new" component={Rules} style={Styles} />
</Route>
