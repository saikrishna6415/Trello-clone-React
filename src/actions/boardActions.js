import { GET_BOARDS, ADD_BOARD, GET_LISTS, ADD_LIST } from './types';
const key = 'ffe39d279ee0a46d632ff7b9e7ac02b5'
const token = '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d'


export const fetchBoards = () => dispatch => {
    fetch(
        `https://api.trello.com/1/members/kotagirisaikrishna1/boards?filter=all&fields=all&lists=none&memberships=none&organization=false&organization_fields=name%2CdisplayName&key=${key}&token=${token}`
    )
        .then(response => response.json())
        .then(boards => {
            // console.log('fetchingboards')
            dispatch({
                type: GET_BOARDS,
                boardsData: boards
            })
        })
        .catch(err => console.log(err));
};
export const addNewBoard = boardName => dispatch => {
    if (boardName.name !== '') {
        fetch(`https://api.trello.com/1/boards/?name=${boardName.name}&key=${key}&token=${token}`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(board => {
                // console.log('board added')
                dispatch({
                    type: ADD_BOARD,
                    board: board
                })
            })
            .catch(err => console.log(err));
    }
};
export const fetchLists = (id) => dispatch => {
    fetch(`https://api.trello.com/1/boards/${id}/lists?key=${key}&token=${token}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(lists => {
            console.log('fetchng lists')
            dispatch({
                type: GET_LISTS,
                listsData: lists
            })
        })
        .catch(err => console.log(err));
}

export const addNewList = list => dispatch => {
    fetch(`https://api.trello.com/1/lists?name=${list.name}&idBoard=${list.boardid}&pos=bottom&key=${key}&token=${token}`, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(list => {
            console.log('list added')
            dispatch({
                type: ADD_LIST,
                list: list
            })
        })
        .catch(err => console.log(err));

}


// export const fetchCards = id => dispatch => {
//     fetch(
//         `https://api.trello.com/1/lists/${id}/cards?key=${key}&token=${token}`
//     )
//         .then(response => response.json())
//         .then(cards => {
//             console.log("cards ", cards)
//             dispatch({
//                 type: GET_CARDS,
//                 cardsData: cards,
//                 listId: cards[0].idList
//             })
//         }
//         )
//         .catch(err => console.log(err));
// };

