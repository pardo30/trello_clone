import React, { useState, useReducer } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TrelloColumn from './components/TrelloColumn';
import TrelloForm from './components/TrelloForm';
import './App.css';
//import base from './data.json';

const App = () => {
  
  
  

  

  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className='App'>
      <h1 className='AppTitle'>Trello Clone</h1>
        <div className='AppContent'>
          <Droppable droppableId='all-column' direction='horizontal' type='column'>
          {provided => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='AppContent'
              >
              {data.map( (column,index) => 
                <TrelloColumn
                  type='column' 
                  index={index}
                  key={column.id} 
                  title={column.title} 
                  cards={column.cards} 
                  id={column.id}
                  addCard={addCard} 
                  deleteColumn={deleteColumn}
                  deleteCard={deleteCard}
                />)}
          {provided.placeholder}
          </div>)}
        </Droppable>
        <TrelloForm 
          type='column' 
          addColumn={addColumn} />
      </div>
    </div>
  </ DragDropContext>
  )
}

export default App;
