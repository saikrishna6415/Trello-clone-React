import React, { Component } from 'react';
import Board from './Board';
import FormT from './FormT';

import { connect } from 'react-redux';
import { fetchBoards, addNewBoard } from '../actions/boardActions';


class Boards extends Component {
  constructor() {
    super()
    this.state = {
      boardName: '',
      newBoardbutton: true,
      closeAddForm: false
    }
    this.addNewBoard = this.addNewBoard.bind(this);

  }
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
    this.props.fetchBoards();
  }
  addNewBoard() {
    const newBoard = {
      name: this.state.boardName
    };
    // console.log('boardname :', this.state.boardName)
    this.props.addNewBoard(newBoard);
    this.setState({
      boardName: ''
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('next ', nextProps)
    if (nextProps.board) {
      this.props.boards.unshift(nextProps.board);
    }
  }

  render() {

    console.log(this.props)
    var newBoardbutton = this.state.newBoardbutton ? 'block' : 'none';
    var closeAddForm = this.state.closeAddForm ? 'block' : 'none'
    const allboards = this.props.boards.map(board => (
      <Board key={board.id}
        board={board}
      />
    ));
    return (
      <div>
        <h1>Boards</h1>
        {allboards}
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

const mapStateToProps = state => ({
  boards: state.boards.boards,
  board: state.boards.board
});

export default connect(mapStateToProps, { fetchBoards, addNewBoard })(Boards);
