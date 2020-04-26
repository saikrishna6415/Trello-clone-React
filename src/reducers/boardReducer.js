import {
  GET_BOARDS, ADD_BOARD,
  GET_LISTS, ADD_LIST, DELETE_LIST,
  GET_CARDS, ADD_CARD, DELETE_CARD,
  GET_CHECKLISTS
} from '../actions/types';
const initialSatate = {
  boards: [],
  board: {},
  lists: [],
  list: {},
  cards: [],
  card: {},
  checkLists: [],
  checkItems: []
};
export default function (state = initialSatate, action) {
  switch (action.type) {
    case GET_BOARDS:
      return {
        ...state,
        boards: action.boardsData
      };
    case ADD_BOARD:
      return {
        ...state,
        boards: state.boards.concat(action.board
        )
      };
    case GET_LISTS:
      return {
        ...state,
        lists: action.listsData
      };
    case ADD_LIST:
      return {
        ...state,
        lists: state.lists.concat(action.list
        )
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.listId
        )
      };
    case GET_CARDS:
      return {
        ...state,
        cards: state.cards.concat({
          [`card-${action.listId}`]: action.cardsData
        })

      }
    case ADD_CARD:
      console.log('adding card :', action.card)
      return {
        ...state,
        cards: state.cards.concat({
          [`card-${action.listId}`]: [action.card]
        })
      };

    case DELETE_CARD:
      console.log('deleting card ')
      console.log(action.cardId)
      return {
        ...state,
        cards: state.cards.filter(card => {
          if (card[`card-${action.listId}`]) {
            // console.log('s :', card[`card-${action.listId}`])
            card[`card-${action.listId}`] = card[`card-${action.listId}`].filter(c => c.id !== action.cardId)
            // console.log('upadted :', card[`card-${action.listId}`])
            return card[`card-${action.listId}`]
          }
          return card
        })
      }
    case GET_CHECKLISTS:
      return {
        ...state,
        checkLists: action.checklistData
      };
    default:
      return state;
  }
}

