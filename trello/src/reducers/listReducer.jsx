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
        case Actions.ADD_COLUMN:
          const newColumn = {
            title: action.payload,
            id: `column-${columnId}`,
            cards: []
          };
          return [...state, newColumn];
          
        case Actions.ADD_CARD:
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
              
        case Actions.DELETE_COLUMN:
          const newDeleteStateColumn = state.filter (column => column.id !== action.payload)
          return newDeleteStateColumn;
                
        case Actions.DELETE_CARD:
          const newDeleteStateCard = state.map (column =>
            column.id === action.payload.columnId
            ? {...column, cards: column.cards.filter (card => card.id !== action.payload.cardId)}
            : column
            )
            console.log('delete')
          return newDeleteStateCard;
        
        case Actions.DRAG_HAPPEND:
            const{
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload;
            const newState = [...state];
        
            //Dragging columns around
            if (type === 'column') { 
              const column = newState.splice(droppableIndexStart,1);
              newState.splice(droppableIndexEnd, 0, ...column);
              return newState;
            }
        
            //In the same column
            if(droppableIdStart === droppableIdEnd) {
              const column = state.find(column => String(column.id) === String(droppableIdStart));
              const card = column.cards.splice(droppableIndexStart,1);
              column.cards.splice(droppableIndexEnd, 0, ...card);
            }
        
            //Other column
            if(droppableIdStart !== droppableIdEnd) {
              const columnStart = state.find(column => String(column.id) === String(droppableIdStart));
              const card = columnStart.cards.splice(droppableIndexStart,1);
              const columnEnd = state.find(column => String(column.id) === String(droppableIdEnd));
              columnEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }
            return newState;

          }
                    
        default:
          return state;
        }
      }

export default listReducer;