import React from 'react';
import {Link} from "react-router-dom";
import logo from '../assets/images/logo.jpg';
const NavMenu = () => {
    return (
        <nav>
            <div className="logo">
                <img src={logo} alt="Logo"/>
            </div>
            <ul>
                <li><Link to={'/home'}>Team</Link></li>
                <li><Link to={'/players'}>Players</Link></li>
                <li><Link to={'/profile'}>Profile</Link></li>
            </ul>
        </nav>
    );
};

export default NavMenu;