import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addColumn, addCard, deleteColumn, deleteCard } from '../actions';
import './TrelloForm.css';

export class TrelloForm extends Component {

    state = {
        formOpen: false,
        text: ''
    }

    openForm = () => { 
        this.setState ({
            formOpen: true
        });
    };

    closeForm = () => { 
        this.setState ({
            formOpen: false
        });
    };

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        });
    };

    handleAddColumn = () => {
        const { dispatch } = this.props;
        const { text } = this.state;

        if(text) {
            this.setState({
                text: ''
                })
            dispatch(addColumn(text));
        }

        return;
    };

    handleAddCard = () => {
        const { dispatch, columnId } = this.props;
        const { text } = this.state;

        if(text) {
            this.setState({
                text: ''
                })
            dispatch(addCard(text, columnId));
        }        
    }

    buttonForm = () => {
        const { column } = this.props;
        const buttonText = column ? 'New List' : 'New Task' 

        return (
            <button onClick={this.openForm} className="formbutton" >
                {buttonText}
            </button> 
        )
    }

    addForm = () => {
        const { column } = this.props;
        const placeholder = column ? 'Add a new List' : 'Add a new Task'

        return (
            <div className='form'>
                <textarea 
                    className='formInput'
                    type='text'
                    autoFocus
                    placeholder={placeholder}
                    onBlur={this.closeForm}
                    onChange={this.handleInputChange}
                    value={this.state.text}
                    />
                <button
                    onMouseDown={column ? this.handleAddColumn : this.handleAddCard }
                    className='addButton'
                    >
                        +
                    </button>
                <button 
                    className='closeButton'
                    onClick={this.closeForm}
                    >
                        X
                    </button>
            </div>
        )
    }

    render() {
        return this.state.formOpen ? this.addForm() : this.buttonForm();
    }
}

export default connect () (TrelloForm);
