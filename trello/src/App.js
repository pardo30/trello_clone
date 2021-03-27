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
        const newDeleteDataColumn = data.filter (column => column.id !== action.payload)
        return newDeleteDataColumn;
      
      case 'DELETE_CARD':
        const newDeleteDataCard = data.map (column =>
          column.id === action.payload.columnId
            ? {...column, cards: column.cards.filter (card => card.id !== action.payload.cardId)}
            : column
        )
        console.log('delete')
        return newDeleteDataCard;

      // case 'DRAG_HAPPEND':
      //   const { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, type} = action.payload;
      //   const newDataDrag = [...data];

      //   //Dragging columns around
      //   if (type === 'column') {
      //     const newDataDrag = [...data];
      //     const column = newDataDrag.splice(droppableIndexStart,1);
      //     newDataDrag.splice(droppableIndexEnd, 0, ...column);
      //     return newDataDrag;
      //   }

      //   //In the same column
      //   if(droppableIdStart === droppableIdEnd) {
      //     const column = data.find(column => String(column.id) === String(droppableIdStart));
      //     const card = column.cards.splice(droppableIndexStart,1);
      //     column.cards.splice(droppableIndexEnd, 0, card);

      //   }

      //   //Other column
      //   if(droppableIdStart !== droppableIdEnd) {
      //     const columnStart = data.find(column => String(column.id) === String(droppableIdStart));
      //     console.log(draggableId);
      //     const card = columnStart.cards.splice(droppableIndexStart,1);
      //     const columnEnd = data.find(column => String(column.id) === String(droppableIdEnd));
      //     columnEnd.cards.splice(droppableIndexEnd, 0, ...card);
      //   }
      //   return newDataDrag;

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
  
  // const dragHappend = (droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, type) => 
  //   dispatch({
  //     type: 'DRAG_HAPPEND',
  //     payload: { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, type }
  //   })  
    
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') { //Dragging columns around
      const newDataDrag = [...data];
      const column = newDataDrag.splice(source.index,1);
      newDataDrag.splice(destination.index, 0, ...column);
      return newDataDrag;
    }

    //In the same column
    if(source.droppableId === destination.droppableId) {
      const newDataDrag = [...data];
      const column = newDataDrag.find(column => String(column.id) === String(source.droppableId));
      console.log(draggableId);
      const card = column.cards.splice(source.index,1);
      console.log(Array.from(card))
      column.cards.splice(destination.index, 0, card[0]);
      console.log(newDataDrag);
      return newDataDrag;
    }

    //Other column
    if(source.droppableId !== destination.droppableId) {
      const columnStart = data.find(column => String(column.id) === String(source.droppableId));
      console.log(draggableId);
      const card = columnStart.cards.splice(source.index,1);
      const columnEnd = data.find(column => String(column.id) === String(destination.droppableId));
      columnEnd.cards.splice(destination.index, 0, ...card);
    }
    
    // else {
    //    dragHappend(
    //      source.droppableId,
    //      destination.droppableId,
    //      source.index,
    //      destination.index,
    //      draggableId,
    //      type
    //    )
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
                  index={index}
                  key={index} 
                  title={column.title} 
                  cards={column.cards} 
                  id={column.id}
                  addCard={addCard} 
                  deleteColumn={deleteColumn}
                  deleteCard={deleteCard}
                />)}
              <TrelloForm 
                type='column' 
                addColumn={addColumn} />
          {provided.placeholder}
          </div>)}
        </Droppable>
    </div>
  </ DragDropContext>
  )
}

export default App;
