import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TrelloCard from './TrelloCard'
import './TrelloColumn.css';
import TrelloForm from './TrelloForm';

const TrelloColunm = (props) => {
    
    
    const handleDeleteColumn = () => {
        props.deleteColumn(props.id)
    }

    return (
        <Draggable draggableId={String(props.id)} index={props.index}>
         {provided => (
           <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <div className='list' id={props.id}>
            <div className='listHeader'>
                    <h3 className='listTitle'>{props.title}</h3>
                    <button 
                        className='deleteButton'
                        onMouseDown={handleDeleteColumn}
                    > X </button> 
            </div>
            <Droppable droppableId={String(props.id)}>
                {provided => (     
                    <div 
                        ref={provided.innerRef} 
                        {...provided.droppableProps}>
                     {props.cards.map((card, index) => 
                        <TrelloCard 
                            text={card.text} 
                            key={card.id} 
                            id={card.id}
                            index={index}
                            columnId={props.id}
                            deleteCard={props.deleteCard}/>)}
                     {provided.placeholder}
                    </div>
                    )}
                </ Droppable>
                <TrelloForm 
                    type='task' 
                    id={props.id} 
                    addCard={props.addCard}/>
            </div>
          </div>
         )}
        </Draggable>
    )
}

export default TrelloColunm
