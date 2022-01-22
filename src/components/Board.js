import React from 'react';
import { Link } from 'react-router-dom';


const Board = props => {
  console.log(props)
  return (
    <div className="card" style={{ width: '22em' }}>
      <div className='d-flex justify-content-between'>
        <Link to={`/board/${props.board.id}`}>
          <button className='board btn btn-primary' style={{ width: '19em' }}>
            {props.board.name}
          </button>
        </Link>
        {/* 
        <button
          onClick={() => props.deleteBoard(props.board.id)}
          className='btn-default deleteButtonForBoard' style={{ height: "30px",margin:'10px'}}>
          X
            </button> */}
      </div>

    </div>
  );
};

export default Board;
