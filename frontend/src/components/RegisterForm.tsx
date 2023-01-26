import React, {ChangeEvent, FormEvent, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import {IRegisterCoach} from "./IRegisterCoach";
import login from "../pages/Login";
import {Login, Register} from "../data/FetchData";
import {IRegisterRequest} from "../interfaces/IRegisterRequest";

const RegisterForm = () => {
    const [user, setUser] = useState<IRegisterCoach>({
        password: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        avatar: '',
        login: ''
    });

    const nav = useNavigate();
    const fileInput = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (fileInput.current && fileInput.current.files) {
            const file = fileInput.current.files[0];
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);

            // Implement image to base64
            convertAvatarImageToBase64(reader, file);
            console.log(user?.avatar)
        }
    };

    const convertAvatarImageToBase64 = (reader: FileReader, file: File) => {
        reader.onload = (event) => {
            setUser({...user, avatar: event.target?.result as string});
        };
        reader.readAsDataURL(file);
    }

    const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(user)
        const res = await Register(user as IRegisterRequest);

        if (res instanceof Error) {
            const notify = () => toast.error("Server error. Try again later.");
            notify();
            return;
        }
        console.log(res)

        if (res.status === 200) {
            const notify = () => toast.success("You have successfully registered!");
            notify();

            const res = await Login({login: user.login, password: user.password});
            localStorage.setItem('access_token', res.token);
            setInterval(() => nav("/home"), 2000)
        }
        else if(res.status === 400) {
            const notify = () => toast.error("Error. Try again later.");
            notify();
        }
        else if (res.status === 409) {
            const notify = () => toast.warning("User with this login already exists!");
            notify();
        }
    }

    const submitCheckForDisabled = () => {
        return user.login.length < 1 || user?.password.length < 1 || user.firstName.length < 1 || user.lastName.length < 1
    }


    return (
        <div className={'register-form'}>
            <h1 className={'register-header'}>
                {"Create an account"}
            </h1>
            <form onSubmit={(e) => handleRegisterSubmit(e)}>
                <div className={'register-form-grid-wrapper'}>
                    <input
                        className={'login-form-input register-input-additional register-email-grid'}
                        type="text"
                        placeholder={"Login"}
                        value={user?.login}
                        onChange={(e) => setUser({...user, login: e.target.value} as IRegisterCoach)}
                    />
                    <input
                        className={'login-form-input register-input-additional register-password-grid'}
                        type="password"
                        placeholder={"Password"}
                        value={user?.password}
                        onChange={(e) => setUser({...user, password: e.target.value} as IRegisterCoach)}
                    />

                    <input
                        className={'login-form-input register-input-additional register-last-name-grid'}
                        type="text"
                        placeholder={"Last name"}
                        value={user?.lastName}
                        onChange={(e) => setUser({...user, lastName: e.target.value} as IRegisterCoach)}
                    />
                    <input
                        className={'login-form-input register-input-additional register-first-name-grid'}
                        type="text"
                        placeholder={"First name"}
                        value={user?.firstName}
                        onChange={(e) => setUser({...user, firstName: e.target.value} as IRegisterCoach)}
                    />


                    <input
                        className={'login-form-input register-input-additional register-birth-date-grid'}
                        type="date"
                        placeholder={"Birth date"}
                        value={user?.birthDate}
                        onChange={(e) => setUser({...user, birthDate: e.target.value} as IRegisterCoach)}
                    />

                    <div className={"register-avatar"}>
                        <input
                            type="file"
                            ref={fileInput}
                            accept="image/*"
                            onChange={(e) => handleChange(e)}
                        />
                        <br />
                        <img className="register-form-avatar-image" src={preview?.toString()} alt="Preview" />
                    </div>

                </div>
                <div className={ user.login.length > 0 && user?.password.length >= 8 && user.firstName.length > 0 && user.lastName.length > 0 && user.birthDate.length > 0 ? 'login-form-button-div active-button-div' : 'login-form-button-div'}>
                    <button type={'submit'} disabled={submitCheckForDisabled()} className={ submitCheckForDisabled() ? 'login-form-button active-button' : 'login-form-button'}>
                        Register
                    </button>
                </div>

                <div className={"button-already-have-acc"}>
                    <Link className={'link'} to={'/'}>
                        Already have an account?
                    </Link>
                </div>
            </form>
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
                theme='dark'
            />
        </div>
    );
};

export default RegisterForm;