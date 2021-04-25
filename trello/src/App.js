import React, { Component } from 'react';
import TrelloColumn from './components/TrelloColumn';
import TrelloFrom from './components/TrelloForm';
import { connect, Provider } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


export class App extends Component {
    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;
        
        if (!destination) {
          return;
        }
        
        if (type === 'column') { //Dragging columns around
          const newDataDrag = data;
          const column = newDataDrag.splice(source.index,1);
          console.log(source.index)
          newDataDrag.splice(destination.index, 0, column[0]);
          console.log(destination.index);
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
          const newDataDrag = [...data];
          const columnStart = newDataDrag.find(column => String(column.id) === String(source.droppableId));
          console.log(draggableId);
          const card = columnStart.cards.splice(source.index,1);
          const columnEnd = newDataDrag.find(column => String(column.id) === String(destination.droppableId));
          columnEnd.cards.splice(destination.index, 0, ...card);
          return newDataDrag;
        }

      }
    render() {
        const { lists } = this.props;
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
                    {lists.map( (column,index) => 
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
}

export default App;
