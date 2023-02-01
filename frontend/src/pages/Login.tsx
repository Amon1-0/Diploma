import React from 'react';
import LoginMainLogo from "../components/LoginMainLogo";
import LoginForm from "../components/LoginForm";
import {ToastContainer} from "react-toastify";

const Login = () => {
    return (
        <div className='login-wrapper'>
            <div className='login-main-content-wrapper'>
                <LoginMainLogo/>
                <LoginForm/>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme={'dark'}
            />
        </div>
    );
};

export default Login;