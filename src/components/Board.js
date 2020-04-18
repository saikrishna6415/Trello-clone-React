import React from 'react';
import { Link } from 'react-router-dom';

const Board = props => {
    // console.log(props)
  return (
    <div>
      <Link to={`/board/${props.board.id}`}>
        <button className='board btn btn-primary'>
          {props.board.name}
        </button>
      </Link>
    </div>
  );
};

export default Board;
