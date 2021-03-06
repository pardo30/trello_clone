import React, { useState } from 'react';
import './TrelloForm.css';
import base from '../data.json';



const TrelloForm = (props) => {
    const [openState, setOpenState] = useState(false);
    const [textForm, setTextForm] = useState('');
    
    const buttonText = (props.type === 'list') ? 'New List' : 'New Task' 

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

    const handleAddColumn = e => {
        const title = textForm
        props.addColumn (title)

        }
    const handleAddCard = () => {

    }
    

    const placeholder = (props.type === 'list') ? 'Add a new List' : 'Add a new Task' 

    const addForm = () => {
        return (
            <div className="form">
                <input 
                    className="formInput"
                    type="text"
                    autoFocus
                    placeholder={placeholder}
                    onBlur={closeForm}
                    onChange={handleChangeInput}
                    value={textForm}
                    />
                <button onMouseDown={(props.type === 'list') ? handleAddColumn : handleAddCard }>Add</button>
                <button 
                    className="closeButton"
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
