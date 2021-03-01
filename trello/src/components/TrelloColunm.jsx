import React from 'react'
import TrelloCard from './TrelloCard'
import './TrelloColunm.css';
import TrelloForm from './TrelloForm';

const TrelloColunm = (props) => {
    return (
        <div className='list'>
           <h3 className='listTitle'>{props.title}</h3>
           <TrelloCard />
           <TrelloCard />
           <TrelloCard />
           <TrelloForm type='task' />
        </div>
    )
}

export default TrelloColunm
