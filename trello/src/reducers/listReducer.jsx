import { Actions } from '../actions';


let columnId = 2;
let cardId = 4;

const initialState = [
    {title: "TO DO",
      id: `column-${0}`,
      cards: [
        {id: `card-${0}`,
          text: "Blog and social post"},
        {id: `card-${1}`,
          text: "New landing page"},
      ]},
      {title: "DOING",
      id: `column-${1}`,
      cards: [
        {id: `card-${2}`,
          text: "Homepage design update"},
        {id: `card-${3}`,
          "text": "New user templates"}
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
          columnId +=1
          return [...state, newColumn];
      
          
        case Actions.ADD_CARD:
          const newCard = {
            id: `card-${cardId}`,
            text: action.payload.text
          };
          cardId +=1
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
            const newDragState = [...state];
        
            //Dragging columns around
            if (type === 'column') {
              //const newState = [...state];
              const column = newDragState.splice(droppableIndexStart,1);
              newDragState.splice(droppableIndexEnd, 0, ...column);
              return newDragState;
            }
        
            //In the same column
            if(droppableIdStart === droppableIdEnd) {
              const column = newDragState.find(column => String(column.id) === String(droppableIdStart));
              console.log(draggableId);
              const card = column.cards.splice(droppableIndexStart,1);
              column.cards.splice(droppableIndexEnd, 0, ...card);
              return newDragState;
            }
        
            //Other column
            if(droppableIdStart !== droppableIdEnd) {
              const columnStart = newDragState.find(column => String(column.id) === String(droppableIdStart));
              const card = columnStart.cards.splice(droppableIndexStart,1);
              console.log(draggableId);
              const columnEnd = state.find(column => String(column.id) === String(droppableIdEnd));
              columnEnd.cards.splice(droppableIndexEnd, 0, ...card);
              return newDragState;
            }
          break;

        default:
          return state;
        }
      }

export default listReducer;