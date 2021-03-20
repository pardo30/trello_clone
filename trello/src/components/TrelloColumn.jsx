import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TrelloCard from './TrelloCard'
import TrelloForm from './TrelloForm';
import './TrelloColumn.css';

const TrelloColunm = (props) => {
    
    
    const handleDeleteColumn = () => {
        props.deleteColumn(props.id)
    }

    return (
        <Draggable draggableId={String(props.id)} index={props.index}>
         {provided => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Droppable droppableId={String(props.id)}>
                {provided => (     
                    <div 
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                        className='list' 
                        id={props.id}>
                            <div className='listHeader'>
                                    <h3 className='listTitle'>{props.title}</h3>
                                    <button 
                                        className='deleteButton'
                                        onMouseDown={handleDeleteColumn}
                                    > X </button> 
                            </div>
                        {props.cards.map((card, index) => 
                        <TrelloCard 
                            text={card.text} 
                            key={index} 
                            id={card.id}
                            index={index}
                            columnId={props.id}
                            deleteCard={props.deleteCard}/>)}
                        <TrelloForm 
                            type='task' 
                            id={props.id} 
                            addCard={props.addCard}/>
                      {provided.placeholder}
                    </div>)}
            </ Droppable>
            </div>
         )}
        </Draggable>
    )
}

export default TrelloColunm
