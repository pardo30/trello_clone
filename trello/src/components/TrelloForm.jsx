import React, { useState } from 'react'



const TrelloForm = (props) => {
    const [openState, setOpenState] = useState(false);
    
    const buttonText = (props.type === 'list') ? 'New List' : 'New Task' 

    const openForm = () => {setOpenState(true)};
    const closeForm = () => {setOpenState(false)};

    const buttonForm = () => {
        return(
            <button onClick={openForm} >
                {buttonText}
            </button> 
        )
    }

    const placeholder = (props.type === 'list') ? 'Add a new List' : 'Add a new Task' 

    const addForm = () => {
        return (
            <form>
                <input type="text" placeholder={placeholder}/>
                <button>Add</button>
            </form>
        )
    }

    return (
        openState ? addForm() : buttonForm()

    )
}

export default TrelloForm
