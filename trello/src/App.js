import React, {useState} from 'react';
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

  const [data, setData] = useState(initialState);
  const [refId, setRefId] = useState(2);
  const [refCardId, setRefCardId] = useState(4);


  const addColumn = (title) => {
    
    if (!title) return;
    

    const newColumn = {
      title: title,
      id: refId + 1,
      cards: [],
    };

      setData([...data, newColumn]);
      setRefId(refId + 1)
  }

  const addCard = ({ columnId, text }) => {
    
    const newCard = {
        id: refCardId + 1,
        text: text
      };

    data.map(column => column.id == columnId)
      setData(
      if (data.id === columnId)
        data.cards.push(newCard)
      // data.map(column => 
      //   column.id === columnId
      //     ? column.cards.push(newCard)
      //     : column
      // ))
    
    setRefCardId(refCardId + 1)
  }

  const deleteColumn = ()=> {
    const index = data.id
    const newData = data.splice(index,1)
    console.log(newData)
    //setData(newData)

  }

 
  return (
    <div className='App'>
      <h1 className='AppTitle'>Trello Clone</h1>
      <div className='AppContent'>
      {data.map(column => <TrelloColumn title={column.title} cards={column.cards} key={column.id} id={column.id} addCard={addCard} deleteColumn={deleteColumn}/>)}
      <TrelloForm type='list' addColumn={addColumn} />
      </div>
    </div>
  )
}

export default App;
