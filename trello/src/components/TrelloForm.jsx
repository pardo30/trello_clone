import React, { useState } from 'react';
import './TrelloForm.css';
import base from '../data.json';



const TrelloForm = (props) => {
    const [openState, setOpenState] = useState(false);
    const [textForm, setTextForm] = useState('');
    
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
    let columnId = props.columnId
    const addFunction = (textForm, columnId) => {
        console.log(columnId)
        // if (props.type === 'list') {
        //     base.push({
        //         "title": {textForm},
        //         "id": Date(),
        //         "cards":{}
        //     })
        //     console.log(columnId)
        // }
        // if (props.type === 'list') {
        //     base["id"][columnId].push({
        //         "cards":{
        //             "text":{textForm},
        //             "id": Date()
        //         }
        //     })
        // }
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
                    onChange={e => setTextForm(e.target.value)}
                    value={textForm}
                    />
                {/* <button onClick={() => console.log(props.columnId)}>Add</button> */}
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
