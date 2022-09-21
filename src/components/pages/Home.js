import React from 'react'
import Body from '../Body'
import Messages from '../Messages'
import Todolist from '../Todolist'

function Home() {
  return (
    <Body>
      <Messages />
      <Todolist />
    </Body>
  )
}

export default Home