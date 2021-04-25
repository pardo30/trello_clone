import React, { Component } from 'react';
import TrelloColumn from './components/TrelloColumn';
import TrelloForm from './components/TrelloForm';
import { sort } from './actions';
import { connect, Provider } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


export class App extends Component {

    onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;
        
        if (!destination) {
          return;
        }
        
        this.props.dispatch (
            sort(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index,
                draggableId,
                type
            )
        )
    };

    render() {
        const { lists } = this.props;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
            <div className='App'>
            <h1 className='AppTitle'>Trello Clone</h1>
                <div className='AppContent'>
                <Droppable droppableId='all-column' direction='horizontal' type='column'>
                {provided => (
                    <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className='AppContent'
                    >
                    {lists.map( (column,index) => 
                        <TrelloColumn
                        type='column' 
                        index={index}
                        key={column.id} 
                        title={column.title} 
                        cards={column.cards} 
                        id={column.id}
                    />)}
                {provided.placeholder}
                </div>)}
                </Droppable>
                <TrelloForm 
                type='column' 
                />
            </div>
            </div>
        </ DragDropContext>
        )
    }
}

const mapStateToProps = state => ({
    lists: state.lists
})

export default connect (mapStateToProps) (App);
