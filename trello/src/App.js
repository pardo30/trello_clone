import React from 'react'
import TrelloColunm from './components/TrelloColunm'
import TrelloForm from './components/TrelloForm'
import './App.css'

const App = () => {
  return (
    <div className='App'>
      <h1>Initial State</h1>
      <div className='AppContent'>
      <TrelloColunm />
      <TrelloColunm />
      <TrelloForm type='list'/>
      </div>
    </div>
  )
}

export default App;
