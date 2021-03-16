import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import TrelloCard from './TrelloCard'
import './TrelloColumn.css';
import TrelloForm from './TrelloForm';

const TrelloColunm = (props) => {
    
    
    const handleDeleteColumn = () => {
        const columnId = props.id
        props.deleteColumn(columnId)
    }

    return (
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
    )
}

export default TrelloColunm
