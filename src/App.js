import React from 'react';
// import List from './components/List'
import './App.css';
import Header from './components/Header';
import Boards from './components/Boards';
import Home from './components/Home';
import Lists from './components/Lists';
import { BrowserRouter, Route } from 'react-router-dom';
// import { Provider } from 'react-redux'
// import store from './components/store'
function App() {
  return (
    // <Provider store = {store}>
      <div>
        <BrowserRouter>
          <Header />
          <Route path='/' exact component={Home} />
          <Route path='/boards' exact component={Boards} />
          <Route path='/board/:id' exact component={Lists} />
        </BrowserRouter>
      </div>
    // </Provider>
  );
}

export default App;
