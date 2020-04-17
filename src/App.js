import React from 'react';
import List from './components/List'
import './App.css';
import trello from './trello.png'

function App() {
  return (
    <div>
      <div className ="d-flex justify-content-center" style ={{background:'white'}}>
        <img src={trello} style={{ height: '40px', alignItems: 'center' }} alt="logo" />
      </div>
      <List />
    </div>
  );
}

export default App;
