import { Actions } from '../actions';

export const addCard = (text, columnId) => {
    return {
        type: Actions.ADD_CARD,
        payload: {text, columnId}
    };
}

export const deleteCard = (cardId, columnId) => {
    return {
        type: Actions.DELETE_CARD,
        payload: {cardId, columnId}
    };
}