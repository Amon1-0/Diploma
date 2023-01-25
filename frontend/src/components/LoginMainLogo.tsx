import React from 'react';
import logo from '../assets/images/logo.jpg';

const LoginMainLogo = () => {
    return (
        <div className="login-main-logo-wrapper">
            <img className="login-main-logo-img" src={logo} alt=""/>

            <div className='login-main-logo-text'>
                &copy; 2023 Pure Connect. All rights reserved.
            </div>
        </div>
    );
};

export default LoginMainLogo;