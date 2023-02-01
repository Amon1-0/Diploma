import React, {FormEvent, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Login} from "../data/FetchData";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const nav = useNavigate();

    const handleNav = (token: string|null) => {
        if (token === null){
            const notify = () => toast.error('Server error. Try again later.');
            notify();
            return;
        }

        localStorage.setItem('access_token', token);
        nav("/home")
    }


    const loginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await Login({login: login, password: password});
        if (res.status === 404) {
            const notify = () => toast.error('Wrong login or password');
            notify();
        }
        else if (res instanceof Error){
            const notify = () => toast.error("Server error. Try again later.");
            notify();
        }
        else if ((res).token?.length > 0){
            handleNav(res!.token);
        }
        else{
            const notify = () => toast.error("Server error. Try again later.");
            notify();
        }
    }

    return (
        <div className="login-form-wrapper">

            <form onSubmit={(e) => loginUser(e)}>
                <div className="login-form-text">
                    {'Login to Football Coach'}
                </div>

                <div>
                    <input
                        onChange={(e) => setLogin(e.target.value)}
                        value={login}
                        className='login-form-input'
                        placeholder={'Login'}
                        type="text"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className='login-form-input'
                        placeholder={'Password'}
                        type="password"
                    />
                </div>

                <div className='login-form-additional-func'>
                    <Link className='login-form-links' to={'soon'}>
                        Forgot password?
                    </Link>
                    <Link className='login-form-links' to={'register'}>
                        Don`t have an account?
                    </Link>
                </div>

                <div className='login-form-buttons-wrapper'>
                    <div className={login.length > 0 && password.length >= 8 ? 'login-form-button-div active-button-div' : 'login-form-button-div'}>
                        <button type={'submit'} disabled={login.length === 0 || password.length < 8} className={login.length > 0 && password.length >= 8 ? 'login-form-button active-button' : 'login-form-button'}>
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;