import React from 'react'
import TrelloCard from './TrelloCard'
import TrelloForm from './TrelloForm';
import './TrelloColunm.css';

const TrelloColunm = () => {
    return (
        <div className='list'>
           <h3 className='listTitle'>title</h3>
           <TrelloCard />
           <TrelloCard />
           <TrelloCard />
           <TrelloForm />
        </div>
    )
}

export default TrelloColunm
