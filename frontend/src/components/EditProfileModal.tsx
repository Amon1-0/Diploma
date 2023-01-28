import React from 'react';
import {ICoach} from "../interfaces/ICoach";
import CreateTeamModalTopPanel from "./CreateTeamModalTopPanel";
import CreateTeamModalContent from "./CreateTeamModalContent";
import EditProfileModalTopPanel from "./EditProfileModalTopPanel";
import EditProfileModalContent from "./EditProfileModalContent";

const EditProfileModal = (props:{
    isOpenEditProfileModal: boolean,
    setIsOpenEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>,
    profile: ICoach|undefined,
    setProfile: React.Dispatch<React.SetStateAction<ICoach|undefined>>,
    setToggleProfile: React.Dispatch<React.SetStateAction<boolean>>
    toggleProfile: boolean
}) => {

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        props.setIsOpenEditProfileModal(false)
    }

    return (
        <div onClick={(e) => closeModal(e)} className={'modal-add-team-wrapper'}>
            <div onClick={(e) => e.stopPropagation()} className="modal-add-team-content-with-panel">
                <EditProfileModalTopPanel/>
                <EditProfileModalContent setProfile={props.setProfile} profile={props.profile}/>
            </div>
        </div>
    );
};

export default EditProfileModal;