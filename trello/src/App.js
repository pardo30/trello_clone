import React, { Component } from 'react';
import TrelloColumn from './components/TrelloColumn';
import TrelloForm from './components/TrelloForm';
import { sort } from './actions';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './App.css';


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
            <div className='backgroundApp'>
            <DragDropContext onDragEnd={this.onDragEnd}>
            <div className='App'>
            <h1 className='AppTitle'>KANBAN APP</h1>
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
        </div>
        )
    }
}

const mapStateToProps = state => ({
    lists: state.lists
})

export default connect (mapStateToProps) (App);
