import React, { Component } from 'react';
import Board from './Board';


class Boards extends Component {
  state = {
    boards: [],
    key: 'ffe39d279ee0a46d632ff7b9e7ac02b5',
    token: '14edac06db12fc2ad32ab72d715ec5d841ee402c02a19e7dc162d6c265a1da6d'
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
  render() {
    var allBoards = this.state.boards.map(board => {
      return <Board key={board.id} board={board} />;
    });
    return (
      <div className="d-flex justfy-content-between">
        {allBoards}
      </div>
    );
  }
}

export default Boards;
