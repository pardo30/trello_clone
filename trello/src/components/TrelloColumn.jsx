import React from 'react'
import TrelloCard from './TrelloCard'
import TrelloForm from './TrelloForm';
import './TrelloColumn.css';

const TrelloColunm = (props) => {
    
    
    const handleDeleteColumn = () => {
        props.deleteColumn(props.id)
    }

    return (
        <div className='list' id={props.id} 
            //onDragOver={e => {e.stopPropagation(); e.preventDefault()}}
            >
            <div className='listHeader'>
                    <h3 className='listTitle'>{props.title}</h3>
                    <button 
                        className='deleteButton'
                        onMouseDown={handleDeleteColumn}
                    > X </button> 
            </div>
            {props.cards.map((card, index) => 
            <TrelloCard 
                text={card.text} 
                key={index} 
                id={card.id}
                index={index}
                columnId={props.id}
                deleteCard={props.deleteCard}/>)}
            <TrelloForm 
                type='task' 
                id={props.id} 
                addCard={props.addCard}/>
        </div>
    )
}

export default TrelloColunm
