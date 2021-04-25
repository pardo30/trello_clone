import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TrelloCard from './TrelloCard'
import TrelloForm from './TrelloForm';
import { deleteColumn } from '../actions';
import './TrelloColumn.css';


export class TrelloColumn extends Component {
    
    handleDeleteColumn = () =>{
        const { dispatch } = this.props
        const columnId = this.props.id
        dispatch(deleteColumn(columnId));
     }

    render() {
        return (
        <Draggable draggableId={String(this.props.id)} index={this.props.index}>
         {provided => (
            <div 
                ref={provided.innerRef} 
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
            <Droppable droppableId={String(this.props.id)}>
                {provided => (     
                    <div 
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                        className='column' 
                        id={this.props.id}>
                            <div className='columnHeader'>
                                    <h3 className='columnTitle'>{this.props.title}</h3>
                                    <button 
                                        className='deleteButton'
                                        onMouseDown={this.handleDeleteColumn}
                                    > X </button> 
                            </div>
                        {this.props.cards.map((card, index) => 
                        <TrelloCard 
                            text={card.text} 
                            key={card.id} 
                            id={card.id}
                            index={index}
                            columnId={this.props.id}
                            deleteCard={this.props.deleteCard}/>)}
                        <TrelloForm 
                            type='task' 
                            id={this.props.id} 
                            addCard={this.props.addCard}/>
                        {provided.placeholder}
                    </div>)}
            </ Droppable>
            </div>
         )}
        </Draggable>
        )
    }
}

export default connect () (TrelloColumn);