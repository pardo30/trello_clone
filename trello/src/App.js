import React, { useState, useReducer } from 'react';
import TrelloColumn from './components/TrelloColumn';
import TrelloForm from './components/TrelloForm';
import './App.css';
//import base from './data.json';

const App = () => {

  const initialState = [
      {title: "List 1",
        id: 0,
        cards: [
          {id: 0,
            text: "card0"},
          {id: 1,
            text: "card1"},
        ]},
        {title: "List 2",
        id: 1,
        cards: [
          {id: 2,
            text: "card2"},
          {id: 3,
            "text": "card3"}
        ]},
      ]
  const [refId, setRefId] = useState(1);
  const [refCardId, setRefCardId] = useState(3);
  
  const reducer = (data, action) => {
    switch (action.type) {
      case 'ADD_COLUMN':
        const newColumn = {
          title: action.payload,
          id: refId,
          cards: [],
        };
        setRefId(refId + 1)
        return [...data, newColumn];
      
      case 'ADD_CARD':
        const newCard = {
          id: refCardId,
          text: action.payload.text
          };
        setRefCardId(refCardId + 1)
        const newData = data.map (column =>
          column.id === action.payload.columnId
            ? {...column, cards: [...column.cards, newCard]}
            : column
        )
        return newData;
      
      case 'DELETE_COLUMN':
        const newDeleteDataColumn = data.filter (column => column.id !== action.payload.columnId)
        return newDeleteDataColumn;
      
      case 'DELETE_CARD':
        const newDeleteDataCard = data.map (column =>
          column.id === action.payload.columnId
            ? {...column, cards: column.cards.filter (card => card.id !== action.payload.cardId)}
            : column
        )
        return newDeleteDataCard;

      default:
        return data;
    }
  }

  const [data, dispatch] = useReducer(reducer, initialState)



  const addColumn = (title) => 
    dispatch({
      type: 'ADD_COLUMN', 
      payload: title
    });
    
  const addCard = (text, columnId) => 
    dispatch({
      type: 'ADD_CARD',
      payload: {text, columnId}
    })
  
  const deleteColumn = (columnId) => 
    dispatch({
      type: 'DELETE_COLUMN',
      payload: columnId
    }) 
  
  const deleteCard = (cardId, columnId) => 
    dispatch({
      type: 'DELETE_CARD',
      payload: {cardId, columnId}
    }) 
 
  return (
    <div className='App'>
      <h1 className='AppTitle'>Trello Clone</h1>
      <div className='AppContent'>
      {data.map(column => 
        <TrelloColumn 
          title={column.title} 
          cards={column.cards} 
          key={column.id} 
          id={column.id} 
          addCard={addCard} 
          deleteColumn={deleteColumn}
          deleteCard={deleteCard}
        />)}
      <TrelloForm 
        type='column' 
        addColumn={addColumn} />
      </div>
    </div>
  )
}

export default App;
