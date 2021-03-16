import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './TrelloCard.css';

const TrelloCard = (props) => {

    const handleDeleteCard = () =>{
        const cardId = props.id
        const columnId = props.columnId
        props.deleteCard(cardId,columnId)
    }

    return (
        <Draggable draggableId={String(props.id)} index={props.index}>
        {provided => (
            <div 
                ref={provided.innerRef} 
                    {...provided.dragHandleProps} 
                    {...provided.draggableProps}>
                <div className='card' id={props.id}>
                    <div className='cardText'>{props.text}</div>
                    <button className='cardButton' onClick={handleDeleteCard}>X</button>
                </div>
            </div>
        )}
        </Draggable>
    )
}

export default TrelloCard
