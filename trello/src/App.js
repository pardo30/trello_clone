import React, { useState, useReducer } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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

      case 'DRAG_HAPPEND':
        const { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, type} = action.payload;
        const newDataDrag = [...data];
        // There is not destination
        //if(!destination) {  
        //  return;
        //}
        // Dragging columns around
        if (type === 'column') {
          const column = newDataDrag.splice(droppableIndexStart,1);
          newDataDrag.splice(droppableIndexEnd, 0, ...column);
        }

        //In the same column
        if(droppableIdStart === droppableIdEnd) {
          const column = data.find(column => droppableIdStart === column.id);
          console.log(column);
          const card = column.cards.splice(droppableIndexStart,1);
          console.log(card);
          column.cards.splice(droppableIndexEnd, 0, ...card) 
        }

        //Other column
        if(droppableIdStart !== droppableIdEnd) {
          const columnStart = data.find(column => droppableIdStart === column.id);
          const card = columnStart.cards.splice(droppableIndexStart,1);
          const columnEnd = data.find(column => droppableIdEnd === column.id);
          columnEnd.cards.splice(droppableIndexEnd, 0, ...card);
        }

        return newDataDrag;

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
  
  const dragHappend = (droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, type) => 
    dispatch({
      type: 'DRAG_HAPPEND',
      payload: { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, type }
    })  
    
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    dispatch(
      dragHappend(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      ))
  }

  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className='App'>
      <h1 className='AppTitle'>Trello Clone</h1>
        <Droppable droppableId='all-column' direction='horizontal' type='column'>
          {provided => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='AppContent'>
              {data.map( (column,index) => 
                <TrelloColumn
                  type='column' 
                  title={column.title} 
                  cards={column.cards} 
                  key={column.id} 
                  id={column.id}
                  index={index}
                  addCard={addCard} 
                  deleteColumn={deleteColumn}
                  deleteCard={deleteCard}
                />)}
              {provided.placeholder}
              <TrelloForm 
                type='column' 
                addColumn={addColumn} />
          </div>)}
        </Droppable>
    </div>
  </ DragDropContext>
  )
}

export default App;
