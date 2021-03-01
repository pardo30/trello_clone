import React from 'react';
import './TrelloCard.css';

const TrelloCard = (props) => {
    return (
        <div className='card'>
            <div className='cardText'>{props.text}</div>
            <button className='cardButton'>X</button>
        </div>
    )
}

export default TrelloCard
