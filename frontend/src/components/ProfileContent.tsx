import React, {ChangeEvent, SetStateAction, useRef, useState} from 'react';
import {ICoach} from "../interfaces/ICoach";
import defaultUser from "../assets/images/defaultUser.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const ProfileContent = (props: {
    coach: ICoach|undefined,
    setCoach: React.Dispatch<SetStateAction<ICoach|undefined>>
}) => {
    const [isValidAvatar, setIsValidAvatar] = React.useState(false);

    React.useEffect(() => {
        if (props.coach?.avatar) {
            const image = new Image();
            image.src = props.coach.avatar;
            image.onload = () => setIsValidAvatar(true);
            image.onerror = () => setIsValidAvatar(false);
        }
    }, [props.coach]);

    const getDate = (date: Date) => {
        const localizedDateString = new Date(date)
        let res: string;
        if (localizedDateString.getFullYear() === new Date().getFullYear())
            res = localizedDateString.toLocaleDateString("en-Us", { month: 'long', day: 'numeric' });
        else
            res = localizedDateString.toLocaleDateString("en-Us", { year: 'numeric', month: 'long', day: 'numeric' });

        return `${res}`
    }


    return (
        <div className='profile-content-wrapper'>
            <div className='profile-content'>
                <div className='profile-content-image-wrapper'>
                    <img className={'profile-content-image'} src={isValidAvatar ? props.coach?.avatar : defaultUser} alt=""/>
                </div>
                <div className='profile-content-data-wrapper'>
                    <div className='login-form-text'>
                    <div style={{fontSize:'44px', fontWeight:'900'}}>
                        Welcome Back,
                    </div>
                        {props.coach?.firstName} {props.coach?.lastName}
                    </div>
                    <div className='profile-date'>
                        <FontAwesomeIcon icon={solid('birthday-cake')}/>
                        {props.coach && getDate(new Date(props.coach!.birthDate))}
                    </div>
                </div>
                <div style={{position:'absolute', fontSize:'40px', top:'15px', right:'15px'}}>
                    <FontAwesomeIcon icon={solid('edit')}/>
                </div>
            </div>

        </div>
    );
};

export default ProfileContent;