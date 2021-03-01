import React from 'react'
import TrelloCard from './TrelloCard'
import './TrelloColumn.css';
import TrelloForm from './TrelloForm';

const TrelloColunm = (props) => {
    return (
        <div className='list'>
           <h3 className='listTitle'>{props.title}</h3>
           {props.cards.map(card => <TrelloCard text={card.text}/>)}
           <TrelloForm type='task' />
        </div>
    )
}

export default TrelloColunm
