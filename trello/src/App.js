import React, {useState} from 'react';
import TrelloColumn from './components/TrelloColumn';
import TrelloForm from './components/TrelloForm';
import './App.css';

const App = () => {
  const initialState = [
    {
      title: 'Column 1',
      id: 0,
      cards: [
        {
          id: 0,
          text: "card 1"
        },
        {
          id: 1,
          text: "card 2"
        }
      ]
    },
    {
      title: 'Column 2',
      id: 1,
      cards: [
        {
          id: 2,
          text: "card 3"
        },
        {
          id: 3,
          text: "card 4"
        }
      ]
    }
  ];

  const [data, setData] = useState(initialState);

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
