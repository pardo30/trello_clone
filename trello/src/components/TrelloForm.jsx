import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addColumn, addCard } from '../actions';
import './TrelloForm.css';

export class TrelloForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOpen: false,
            text: ''
        }
    };

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
        const { dispatch } = this.props;
        const { text } = this.state;

        if(text) {
            this.setState({
                text: ''
                })
            dispatch(addCard(text, this.props.id));
        }   
        return;     
    }

    buttonForm = () => {
        const buttonText = (this.props.type === 'column') ? 'New List' : 'New Task';

        return (
            <button onClick={this.openForm} className="formbutton" >
                {buttonText}
            </button> 
        )
    }

    addForm = () => {
        const placeholder = (this.props.type === 'column') ? 'Add a new List' : 'Add a new Task';

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
                    onMouseDown={(this.props.type === 'column') ? this.handleAddColumn : this.handleAddCard }
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
