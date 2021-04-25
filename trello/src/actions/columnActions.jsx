import { Actions } from '../actions';

export const addColumn = (title) => {
    return {
        type: Actions.ADD_COLUMN,
        payload: title
    };
}

export const deleteColumn = (columnId) => {
    return {
        type: Actions.DELETE_COLUMN,
        payload: columnId
    };
}

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => {
    return {
        type: Actions.DRAG_HAPPEND,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
        }
    }
}