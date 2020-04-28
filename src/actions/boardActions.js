import {
    GET_BOARDS, ADD_BOARD,
    GET_LISTS, ADD_LIST, DELETE_LIST,
    GET_CARDS, ADD_CARD, DELETE_CARD,
    GET_CHECKLISTS, ADD_CHECKLIST, DELETE_CHECKLIST,
    GET_CHECKITEMS, ADD_CHECKITEM, DELETE_CHECKITEM, UPDATE_CHECKITEM, UPDATE_CHECKITEMSTATUS,
    CLEAR_CARDS, CLEAR_CHECKITEMS
} from './types';
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
            // console.log('fetchng lists')
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
            // console.log('list added')
            dispatch({
                type: ADD_LIST,
                list: list
            })
        })
        .catch(err => console.log(err));

}

export const deleteList = id => dispatch => {
    fetch(
        `https://api.trello.com/1/lists/${id}/closed?value=true&key=${key}&token=${token}`,
        {
            method: 'PUT'
        }
    ).then(response => response.json())
        .then(list => {
            // console.log('list deleted', list)
            dispatch({
                type: DELETE_LIST,
                list: list,
                listId: list.id
            })
        })
        .catch(err => console.log(err));

}


export const fetchCards = id => dispatch => {
    fetch(
        `https://api.trello.com/1/lists/${id}/cards?key=${key}&token=${token}`
    ).then(response => response.json())
        .then(cards => {
            console.log("cards ", cards)
            dispatch({
                type: GET_CARDS,
                cardsData: cards,
                listId: id
            })
        })
        .catch(err => console.log(err));
};


export const addNewCard = (newCard) => dispatch => {
    if (newCard.cardName !== '') {
        fetch(`https://api.trello.com/1/cards?idList=${newCard.listId}&name=${newCard.name}&keepFromSource=all&key=${key}&token=${token}`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(card => {
                // console.log('added card = ', card)
                dispatch({
                    type: ADD_CARD,
                    card: card,
                    listId: newCard.listId
                })
            })
            .catch(err => console.log(err));
    }
}

export const deleteCard = (id, idList) => dispatch => {
    fetch(`https://api.trello.com/1/cards/${id}?key=${key}&token=${token}`, {
        method: 'DELETE'
    }).then(response => response.json())
        .then(card => {
            // console.log('card deleted', card)
            dispatch({
                type: DELETE_CARD,
                listId: idList,
                cardId: id
            })
        })
        .catch(err => console.log(err));
}


export const fetchCheckList = id => dispatch => {
    fetch(
        `https://api.trello.com/1/cards/${id}/checklists?checkItems=all&checkItem_fields=name%2CnameData%2Cpos%2Cstate&filter=all&fields=all&key=${key}&token=${token}`
    )
        .then(response => response.json())
        .then(data => {
            // console.log('fetching CheckList :', data)
            dispatch({
                type: GET_CHECKLISTS,
                checklistData: data
            })
        })
        .catch(err => console.log(err));
};

export const addNewCheckList = (newCheckList) => dispatch => {
    if (newCheckList.name !== '') {
        fetch(`https://api.trello.com/1/cards/${newCheckList.cardId}/checkLists?name=${newCheckList.name}&key=${key}&token=${token}`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(checkList => {
                // console.log('added checklist = ', checkList)
                dispatch({
                    type: ADD_CHECKLIST,
                    checkList: checkList,
                    cardId: newCheckList.cardId
                })
            })
            .catch(err => console.log(err));
    }
}

export const deleteCheckList = id => dispatch => {
    fetch(
        `https://api.trello.com/1/checkLists/${id}?key=${key}&token=${token}`,
        {
            method: 'DELETE'
        }
    ).then(response => response.json())
        .then(checkList => {
            // console.log('checkList deleted', checkList)
            dispatch({
                type: DELETE_CHECKLIST,
                checkList: checkList,
                checkListId: id
            })
        }).catch(err => console.log(err))
}

export const fetchCheckListItems = id => dispatch => {
    fetch(
        `https://api.trello.com/1/checklists/${id}/checkItems?key=${key}&token=${token}`,
        {
            method: 'GET'
        })
        .then(response => response.json())
        .then(checkItems => {
            // console.log("checkItems ", checkItems)
            dispatch({
                type: GET_CHECKITEMS,
                checkItemsData: checkItems,
                checkListId: id
            })
        })
        .catch(err => console.log(err));
}

export const addCheckItem = checkItemsData => dispatch => {
    // console.log('sajsn', checkItemsData)
    if (checkItemsData.name !== '') {
        fetch(
            `https://api.trello.com/1/checklists/${checkItemsData.checkListId}/checkItems?name=${checkItemsData.name}&pos=bottom&checked=false&key=${key}&token=${token}`,
            {
                method: 'POST'
            })
            .then(response => response.json())
            .then(checkItem => {
                // console.log('added checkItem = ', checkItem)
                dispatch({
                    type: ADD_CHECKITEM,
                    checkItem: checkItem,
                    checkListId: checkItemsData.checkListId
                })
            })
            .catch(err => console.log(err));
    }
}

export const deleteCheckItem = (id, checkListId) => dispatch => {
    fetch(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems/${id}?key=${key}&token=${token}`,
        {
            method: 'DELETE'
        }
    ).then(response => response.json())
        .then(checkItem => {
            // console.log('checkItem deleted', checkItem)
            dispatch({
                type: DELETE_CHECKITEM,
                checkListId: checkListId,
                checkItemId: id
            })
        })
        .catch(err => console.log(err));
}

export const updateCheckItemName = checkItemData => dispatch => {
    fetch(`https://api.trello.com/1/cards/${checkItemData.card}/checkItem/${checkItemData.checkItemId}?key=${key}&token=${token}&name=${checkItemData.checkItemName}`, {
        method: "PUT",
    })
        .then(response => response.json())
        .then(checkItem => {
            // console.log('checkItem updated', checkItem)
            dispatch({
                type: UPDATE_CHECKITEM,
                cardId: checkItemData.card,
                // checkItemId: checkItemData.checkItemId
                itemName: checkItemData.checkItemName
            })
        })
        .catch(err => console.log(err));
}
export const updateCheckItemStatus = checkItemData => dispatch => {
    // console.log(checkItemData)
    // console.log('ss: ', checkItemData.state)
    fetch(
        `https://api.trello.com/1/cards/${checkItemData.cardId}/checkItem/${checkItemData.checkItemId}?state=${checkItemData.state}&key=${key}&token=${token}`,
        {
            method: 'PUT'
        }
    ).then(response => response.json())
        .then(checkItem => {
            // console.log('checkItem status updated', checkItem)
            dispatch({
                type: UPDATE_CHECKITEMSTATUS,
                cardId: checkItemData.cardId,
                checkListId: checkItemData.checkListId,
                checkItemId: checkItemData.checkItemId,
                status: checkItemData.state
            })
        })
        .catch(err => console.log(err));
}

export const clearCards = (id) => dispatch => {
    return dispatch({
        type: CLEAR_CARDS,
        listId: id
    })
}

export const clearCheckItems = (id) => dispatch => {
    return dispatch({
        type: CLEAR_CHECKITEMS,
        checkListId: id
    })
}