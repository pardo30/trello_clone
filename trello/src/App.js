import React, {useState} from 'react';
import TrelloColumn from './components/TrelloColumn';
import TrelloForm from './components/TrelloForm';
import './App.css';
import base from './data.json';

const App = () => {
  

  const [data, setData] = useState(base);

  return (
    <div className='App'>
      <h1 className='AppTitle'>Trello Clone</h1>
      <div className='AppContent'>
      {data.map(list => <TrelloColumn title={list.title} cards={list.cards}/>)}
      <TrelloForm type='list' />
      </div>
    </div>
  )
}

export default App;
