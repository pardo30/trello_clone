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

