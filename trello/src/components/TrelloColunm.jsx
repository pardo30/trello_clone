import React from 'react'
import TrelloCard from './TrelloCard'
import './TrelloColunm.css';
import TrelloForm from './TrelloForm';

const TrelloColunm = () => {
    return (
        <div className='list'>
           <h3 className='listTitle'>title</h3>
           <TrelloCard />
           <TrelloCard />
           <TrelloCard />
           <TrelloForm type='task' />
        </div>
    )
}

export default TrelloColunm
