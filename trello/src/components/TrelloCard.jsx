import React, { useState, useRef } from 'react';
import './TrelloCard.css';

const TrelloCard = (props) => {

    const [dragging, setDragging] = useState(false)

    const handleDeleteCard = () =>{
        const cardId = props.id
        const columnId = props.columnId
        props.deleteCard(cardId,columnId)
    }

    const handleDragStart = e => {
        console.log('drag ' + props.id + ' ' + props.columnId)
        setDragging(true)
    }

    return (
            <div 
                draggable
                onDragStart={handleDragStart}>
                <div className='card' id={props.id}>
                    <div className='cardText'>{props.text}</div>
                    <button className='cardButton' onClick={handleDeleteCard}>X</button>
                </div>
            </div>
    )
}

export default TrelloCard
