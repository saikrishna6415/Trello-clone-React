import React, { Component } from 'react';
import Board from './Board';
import FormT from './FormT';


class Boards extends Component {
  constructor() {
    super()
    this.state = {
      boards: [],
      key: 'ffe39d279ee0a46d632ff7b9e7ac02b5',
      token: '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d',
      boardName: '',
      newBoardbutton: true,
      closeAddForm: false
    }
  }
  // state = {
  //   boards: [],
  //   key: 'ffe39d279ee0a46d632ff7b9e7ac02b5',
  //   token: '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d',
  //   boardName: '',
  //   newBoardbutton: true,
  //   closeAddForm: false
  // };

  newBoardbutton = () => {
    this.setState(prevState => ({
      newBoardbutton: !prevState.newBoardbutton,
      closeAddForm: !prevState.closeAddForm
    }));
  };
  closeAddForm = () => {
    this.setState(prevState => ({
      newBoardbutton: !prevState.newBoardbutton,
      closeAddForm: !prevState.closeAddForm
    }));
  }
  inputState = event => {
    this.setState({
      boardName: event.target.value
    });
  };
  componentDidMount() {
    fetch(`https://api.trello.com/1/members/kotagirisaikrishna1/boards?&key=${this.state.key}&token=${this.state.token}`, {
      method: 'GET'
    })
      .then(data => {
        data.json()
          .then(data => {
            // console.log(data);
            this.setState({
              boards: data
            });
          });
      }).catch(err => console.log(err))
  }
  addNewBoard = () => {
    fetch(`https://api.trello.com/1/boards/?name=${this.state.boardName}&key=${this.state.key}&token=${this.state.token}`, {
      method: 'POST'
    })
      .then(data => {
        data.json()
          .then(data => {
            console.log(data)
            this.setState({
              boards: this.state.boards.concat([data]),
              boardName: ''
            });
          });
      }).catch(err => console.log(err))
  };
  deleteBoard = id => {
    console.log(id)
    console.log(this.state.key)
    fetch(
      `https://api.trello.com/1/boards/${id}?key=${this.state.key}&token=${this.state.token}`,
      {
        method: 'DELETE'
      }
    ).then(() => {
      this.setState({ boards: this.state.boards.filter(board => board.id !== id) });
    }).catch(err => console.log(err))
  };
  render() {
    var newBoardbutton = this.state.newBoardbutton ? 'block' : 'none';
    var closeAddForm = this.state.closeAddForm ? 'block' : 'none'
    var allBoards = this.state.boards.map(board => {
      return <Board key={board.id}
        board={board}
        deleteBoard={this.deleteBoard} />;
    });
    return (
      <div className="boards d-flex flex-column">
        {allBoards}
        <div className="card addList">
          <button className="addListButton btn btn-primary"
            onClick={this.newBoardbutton}
            style={{ display: newBoardbutton }}>
            Add Board
                        </button>
          <FormT
            style={{ display: closeAddForm }}
            closeAddForm={this.closeAddForm}
            inputState={this.inputState}
            input={this.state.boardName}
            add={this.addNewBoard}
            placeholder="Enter Board Name"
            button="Add Board"
            width='22rem'
          />
        </div>
      </div>
    );
  }
}

export default Boards;
