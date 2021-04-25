import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { deleteCard } from '../actions';
import './TrelloCard.css';


export class TrelloCard extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    };
    
    handleDeleteCard = () =>{
        const { dispatch } = this.props
        const cardId = this.props.id
        const columnId = this.props.columnId
        dispatch(deleteCard(cardId,columnId));
     }


    render() {
        return (
            <Draggable draggableId={String(this.props.id)} index={this.props.index}>
            {provided => (
                <div 
                    ref={provided.innerRef} 
                        {...provided.dragHandleProps} 
                        {...provided.draggableProps}>
                    <div className='card' id={this.props.id}>
                        <div className='cardText'>{this.props.text}</div>
                        <button className='cardButton' onClick={this.handleDeleteCard}>X</button>
                    </div>
                </div>
            )}
            </Draggable>
        )
    }
}

export default connect () (TrelloCard);