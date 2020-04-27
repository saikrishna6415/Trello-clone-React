import {
  GET_BOARDS, ADD_BOARD,
  GET_LISTS, ADD_LIST, DELETE_LIST,
  GET_CARDS, ADD_CARD, DELETE_CARD,
  GET_CHECKLISTS, ADD_CHECKLIST, DELETE_CHECKLIST,
  GET_CHECKITEMS, ADD_CHECKITEM, DELETE_CHECKITEM, UPDATE_CHECKITEM, UPDATE_CHECKITEMSTATUS
} from '../actions/types';
const initialSatate = {
  boards: [],
  lists: [],
  cards: [],
  checkLists: [],
  checkItems: [],
  checkItemSt: {}
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
    case ADD_CHECKLIST:
      console.log('adding checklist :', action.checkList)
      return {
        ...state,
        checkLists: state.checkLists.concat(action.checkList
        )
      };
    case DELETE_CHECKLIST:
      console.log('deleting : ', action.checkListId)
      return {
        ...state,
        checkLists: state.checkLists.filter(checkList => checkList.id !== action.checkListId
        )
      };
    case GET_CHECKITEMS:
      return {
        ...state,
        checkItems: state.checkItems.concat({
          [`checkList-${action.checkListId}`]: action.checkItemsData
        })
      };
    case ADD_CHECKITEM:
      console.log('adding Checktem :', action.checkListId)
      return {
        ...state,
        checkItems: state.checkItems.concat({
          [`checkList-${action.checkListId}`]: [action.checkItem]
        })
      };
    case DELETE_CHECKITEM:
      console.log('deleting checkItem ')
      console.log(action.checkItemId)
      return {
        ...state,
        checkItems: state.checkItems.filter(checkItem => {
          if (checkItem[`checkList-${action.checkListId}`]) {
            checkItem[`checkList-${action.checkListId}`] = checkItem[`checkList-${action.checkListId}`].filter(chktem => chktem.id !== action.checkItemId)
            // console.log('to delete :', checkItem[`checkList-${action.checkListId}`])
            return checkItem[`checkList-${action.checkListId}`]
          }
          return checkItem
        })
      };
    case UPDATE_CHECKITEM:
      console.log('updating checkItem ', action)
      console.log('checikitemid:', action.cardId)
      return {
        ...state,
        checkItems: state.checkItems.map(checkItem => {
          console.log(checkItem)
          if (checkItem[`checkList-${action.cardId}`]) {
            checkItem[`checkList-${action.cardId}`] = checkItem[`checkList-${action.cardId}`].map(chktem => chktem.name = action.itemName)
            // console.log('to update :', checkItem[`checkList-${action.cardId}`])
            return checkItem[`checkList-${action.cardId}`]
          }
          return checkItem
        })
      };
    case UPDATE_CHECKITEMSTATUS:
      console.log('updating checkItem status ', action)
      console.log('checikitemid:', action.checkListId)
      return {
        ...state,
        checkItems: state.checkItems.map(checkItem => {
          console.log(checkItem)
          checkItem[`checkList-${action.checkListId}`] = checkItem[`checkList-${action.checkListId}`].map(chktem => {
            if (chktem.id === action.checkItemId) {
              chktem.state = action.state
            }
            return chktem
          })
          return checkItem
        }),
      };
    default:
      return state;
  }
}

