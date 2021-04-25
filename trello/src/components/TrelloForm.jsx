import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addColumn, addCard, deleteColumn, deleteCard } from '../actions';
import './TrelloForm.css';



const TrelloForm = (props) => {
    const [openState, setOpenState] = useState(false);
    const [textForm, setTextForm] = useState('');
    
    const buttonText = (props.type === 'column') ? 'New List' : 'New Task' 

    const openForm = () => {setOpenState(true)};
    const closeForm = () => {setOpenState(false); setTextForm("")};

    const buttonForm = () => {
        return(
            <button onClick={openForm} className="formbutton" >
                {buttonText}
            </button> 
        )
    }
    
    const handleChangeInput = e => {
        const base = e.target;
        e.preventDefault();
        setTextForm(base.value)
        }

    const handleAddColumn = () => {
        const title = textForm
        props.addColumn (title)
        }

    const handleAddCard =  (e) => {
        e.stopPropagation();  
        const columnId = props.id
        const text = textForm
        props.addCard (text,columnId)
        }
    

    const placeholder = (props.type === 'column') ? 'Add a new List' : 'Add a new Task' 

    const addForm = () => {
        return (
            <div className='form'>
                <textarea 
                    className='formInput'
                    type='text'
                    autoFocus
                    placeholder={placeholder}
                    onBlur={closeForm}
                    onChange={handleChangeInput}
                    value={textForm}
                    />
                <button
                    onMouseDown={(props.type === 'column') ? handleAddColumn : handleAddCard }
                    className='addButton'
                    >
                        +
                    </button>
                <button 
                    className='closeButton'
                    onClick={closeForm}
                    >
                        X
                    </button>
            </div>
        )
    }

    return (
        openState ? addForm() : buttonForm()

    )
}

export default TrelloForm
