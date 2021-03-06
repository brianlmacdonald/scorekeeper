import React from 'react'
import {NavLink} from 'react-router-dom'

const Navigation = () => {
  return (<nav
    id="tutorialNav"
    >
    <NavLink
    className="tutorialLink"
    to={'/tutorial/start'}>start</NavLink>
    <NavLink
    className="tutorialLink"
    to={'/tutorial/deal'}>deal</NavLink>
    <NavLink
      className="tutorialLink"
      to={'/tutorial/turn'}>turn</NavLink>
    <NavLink
    className="tutorialLink"
    to={'/tutorial/discard'}>discard</NavLink>
    <NavLink
      className="tutorialLink"
      to={'/tutorial/draw'}>draw</NavLink>
    <NavLink
    className="tutorialLink"
    to={'/tutorial/yaniv'}>yaniv</NavLink>
    <NavLink
    className="tutorialLink"
    to={'/tutorial/scoring'}>scoring</NavLink>
  </nav>)
}

export default Navigation
