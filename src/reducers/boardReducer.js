import { GET_BOARDS, ADD_BOARD, GET_LISTS, ADD_LIST, DELETE_LIST } from '../actions/types';
const initialSatate = {
  boards: [],
  board: {},
  lists: [],
  list: {}
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
    default:
      return state;
  }
}

