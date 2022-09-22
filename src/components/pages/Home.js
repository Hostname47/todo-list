import React from 'react'
import Body from '../Body'
import Credit from '../Credit'
import Messages from '../Messages'
import Todolist from '../Todolist'

function Home() {
  return (
    <Body>
      <Credit />
      <Messages />
      <Todolist />
    </Body>
  )
}

export default Home