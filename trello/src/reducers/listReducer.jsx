import { Actions } from '../actions';


let columnId = 2;
let cardId = 4;

const initialState = [
    {title: "List 1",
      id: `column-${0}`,
      cards: [
        {id: `card-${0}`,
          text: "card0"},
        {id: `card-${1}`,
          text: "card1"},
      ]},
      {title: "List 2",
      id: `column-${1}`,
      cards: [
        {id: `card-${2}`,
          text: "card2"},
        {id: `card-${3}`,
          "text": "card3"}
      ]},
    ];

const listReducer  = (state = initialState, action) => {
    switch (action.type) {
        case Action.ADD_COLUMN:
          const newColumn = {
            title: action.payload,
            id: `column-${columnId}`,
            cards: []
          };
          return [...state, newColumn];
          
        case 'ADD_CARD':
          const newCard = {
            id: `card-${cardId}`,
            text: action.payload.text
          };
          const newState = state.map (column =>
            column.id === action.payload.columnId
            ? {...column, cards: [...column.cards, newCard]}
            : column
            )
          return newState;
              
        case 'DELETE_COLUMN':
          const newDeleteStateColumn = state.filter (column => column.id !== action.payload)
          return newDeleteStateColumn;
                
        case 'DELETE_CARD':
          const newDeleteStateCard = state.map (column =>
            column.id === action.payload.columnId
            ? {...column, cards: column.cards.filter (card => card.id !== action.payload.cardId)}
            : column
            )
            console.log('delete')
          return newDeleteStateCard;
                    
        default:
          return data;
        }
      }

export default listReducer;