import React, {useState} from 'react';
import TrelloColumn from './components/TrelloColumn';
import TrelloForm from './components/TrelloForm';
import './App.css';
import base from './data.json';

const App = () => {
  
  const initialState = [
      {"title": "List 1",
        "columnId": 0,
        "cards": [
          {"cardId": 0,
            "text": "card0"},
          {"cardId": 1,
            "text": "card1"},
        ]},
        {"title": "List 2",
        "columnId": 1,
        "cards": [
          {"cardId": 2,
            "text": "card2"},
          {"cardId": 3,
            "text": "card3"}
        ]},
      ]

  const [data, setData] = useState(initialState);

  let columnId = 2
  let cardId = 4

  const addColumn = (title) => {
    if (!title) return;

    const newColumn = {
      "id": ++columnId,
      "title": title,
      "cards": [],
    };

    setData([...data, newColumn]);
  };

  const addCard =({columnInId, text}) => {
    if (!text) return;

    const newCard = {
        "cardId": ++cardId,
        "text": text
      };
  
    setData(data.columnId.map(column => column.id === columnInId 
          ? column.cards.push (newCard)
          : column ))
       
    }

 
  return (
    <div className='App'>
      <h1 className='AppTitle'>Trello Clone</h1>
      <div className='AppContent'>
      {data.map(list => <TrelloColumn title={list.title} cards={list.cards}/>)}
      <TrelloForm type='list' columnId={data.columnId} addCard={addCard} addColumn={addColumn}/>
      </div>
    </div>
  )
}

export default App;
