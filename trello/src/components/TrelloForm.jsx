import React, { useState } from 'react';
import './TrelloForm.css';



const TrelloForm = (props) => {
    const [openState, setOpenState] = useState(false);
    const [text, setText] = useState('');
    
    const buttonText = (props.type === 'list') ? 'New List' : 'New Task' 

    const openForm = () => {setOpenState(true)};
    const closeForm = () => {setOpenState(false)};

    const buttonForm = () => {
        return(
            <button onClick={openForm} className="formbutton" >
                {buttonText}
            </button> 
        )
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
                    onChange={e => setText(e.target.value)}
                    value={text}
                    />
                {/* <button>Add</button> */}
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
