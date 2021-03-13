import React from 'react';
import './TrelloCard.css';

const TrelloCard = (props) => {

    const handleDeleteCard = () =>{
        const cardId = props.id
        const columnId = props.columnId
        props.deleteCard(cardId,columnId)
    }

    return (
        <div className='card' id={props.id}>
            <div className='cardText'>{props.text}</div>
            <button 
                className='cardButton'
                onClick={handleDeleteCard}>X</button>
        </div>
    )
}

export default TrelloCard
