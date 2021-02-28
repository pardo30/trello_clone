import React from 'react'
import TrelloColunm from './components/TrelloColunm'
import TrelloForm from './components/TrelloForm'

const App = () => {
  return (
    <div className='App'>
      <h1>Initial State</h1>
      <TrelloColunm />
      <TrelloForm type='list'/>
    </div>
  )
}

export default App;
