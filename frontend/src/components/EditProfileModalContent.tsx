import React, {ChangeEvent, useRef, useState} from 'react';
import {ICoach} from "../interfaces/ICoach";
import {IRegisterCoach} from "../interfaces/IRegisterCoach";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";

const EditProfileModalContent = (props:{
    profile: ICoach|undefined,
    setProfile: React.Dispatch<React.SetStateAction<ICoach|undefined>>,
    coachEdit: ICoach|undefined,
    setCoachEdit: React.Dispatch<React.SetStateAction<ICoach|undefined>>
}) => {


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
            console.log(props.coachEdit?.avatar)
        }
    };

    const convertAvatarImageToBase64 = (reader: FileReader, file: File) => {
        reader.onload = (event) => {
            props.setCoachEdit({...props.coachEdit, avatar: event.target?.result as string} as ICoach);
        };
        reader.readAsDataURL(file);
    }

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div className={'edit-profile-form'}>
            <form onSubmit={(e) => handleEditSubmit(e)}>
                <div className={'register-form-grid-wrapper'}>
                    <input
                        className={'login-form-input register-input-additional register-last-name-grid'}
                        type="text"
                        placeholder={"Last name"}
                        value={props.coachEdit?.lastName}
                        onChange={(e) => props.setCoachEdit({...props.coachEdit, lastName: e.target.value} as ICoach)}
                    />
                    <input
                        className={'login-form-input register-input-additional register-first-name-grid'}
                        type="text"
                        placeholder={"First name"}
                        value={props.coachEdit?.firstName}
                        onChange={(e) => props.setCoachEdit({...props.coachEdit, firstName: e.target.value} as ICoach)}
                    />


                    <input
                        className={'login-form-input register-input-additional register-birth-date-grid'}
                        type="date"
                        value={new Date(props.coachEdit?.birthDate!).toISOString().split('T')[0]}
                        onChange={(e) => props.setCoachEdit({...props.coachEdit, birthDate: e.target.value} as ICoach)}
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

export default EditProfileModalContent;