import React from 'react'
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
                    //onClick={handleDeleteColumn()}
                > X </button> 
           </div>     
           {props.cards.map(card => <TrelloCard text={card.text} key={card.id} id={card.id}/>)}
           <TrelloForm type='task' columnId={props.id} addCard={props.addCard}/>
        </div>
    )
}

export default TrelloColunm
