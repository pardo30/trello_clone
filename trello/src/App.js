import React from 'react'
import TrelloColunm from './components/TrelloColunm'
import TrelloForm from './components/TrelloForm'
import './App.css'

const App = () => {
  return (
    <div className='App'>
      <h1 className='AppTitle'>Trello Clone</h1>
      <div className='AppContent'>
      <TrelloColunm colunmtitle="title 1"/>
      <TrelloColunm colunmtitle="title 2"/>
      <TrelloForm type='list'/>
      </div>
    </div>
  )
}

export default App;
