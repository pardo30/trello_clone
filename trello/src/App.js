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
        setRefId(refId+1)
        return [...data, newColumn];
        
        case 'ADD_CARD':
        setRefCardId(refCardId+1)
          const newCard = {
            id: refCardId,
            text: action.payload.text
          };
          const newData = data.map (column =>
            column.id === action.payload.columnId
            ? {...column, cards: [...column.cards, newCard]}
            : column
            )
        console.log('ID:' + refCardId)
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
        console.log('delete')
        return newDeleteDataCard;

      case 'DRAG_HAPPEND':
        const { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, type} = action.payload;
        
        //Dragging columns around
        if (type === 'column') {
          const newDataDrag = [...data];
          const column = newDataDrag.splice(droppableIndexStart,1);
          newDataDrag.splice(droppableIndexEnd, 0, ...column);
          return newDataDrag;
        }

        //In the same column
        if(droppableIdStart === droppableIdEnd) {
          const column = data.find(column => String(column.id) === String(droppableIdStart));
          console.log(column)
          const draggingCards = column.cards;
          console.log(draggingCards);
          const card = draggingCards.splice(droppableIndexStart,1);
          console.log(card)
          const newDataDrag = draggingCards.splice(droppableIndexEnd, 0, card);
          console.log(newDataDrag)
          return newDataDrag; 
        }

        //Other column
        if(droppableIdStart !== droppableIdEnd) {
          const columnStart = data.find(column => String(column.id) === String(droppableIdStart));
          console.log(draggableId);
          const card = columnStart.cards.splice(droppableIndexStart,1);
          const columnEnd = data.find(column => String(column.id) === String(droppableIdEnd));
          const newDataDrag = columnEnd.cards.splice(droppableIndexEnd, 0, ...card);
          return newDataDrag;
        }
        break

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
    } else {
       dragHappend(
         source.droppableId,
         destination.droppableId,
         source.index,
         destination.index,
         draggableId,
         type
       )
    }
    // const sourceColumn = data.find(column => column.id === source.droppableId);
    // const destinationColumn = data.find(column => column.id === destination.droppableId);
    // const draggingCard = sourceColumn.cards.filter(card => card.id === draggableId);
    // const newDataDrag = {
    //   ...data,
    //   cards:
    // }

    // //In the same column
    // if (source.droppableId === destination.droppableId) {
    //   sourceColumn.cards.splice(source.index, 1)
    //   destinationColumn.cards.splice(destination.index, 0,  draggingCard)
    // }

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
