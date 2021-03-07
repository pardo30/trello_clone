import React from 'react'
import TrelloCard from './TrelloCard'
import './TrelloColumn.css';
import TrelloForm from './TrelloForm';

const TrelloColunm = (props) => {
    return (
        <div className='list'>
           <div className='listHeader'>
                <h3 className='listTitle'>{props.title}</h3>
                <button 
                    className='deleteButton'
                > X </button> 
           </div>     
           {props.cards.map(card => <TrelloCard text={card.text} key={card.cardId} id={card.cardId}/>)}
           <TrelloForm type='task' />
        </div>
    )
}

export default TrelloColunm
