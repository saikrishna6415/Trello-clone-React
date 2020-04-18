import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../trello.png'

function Header() {
    return (
        <header className="header d-flex justify-content-between" >
                <Link to='/boards'>
                    <button className='btn btn-primary boardButton'>Boards</button>
                </Link>
                <Link to='/'>
                <img className ="logo"src={logo}  alt="logo" />
                </Link>
                <div></div>
        </header>
    );
}

export default Header;
