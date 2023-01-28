import React from 'react';
import {ITeam} from "../interfaces/ITeam";
import {CreateTeam} from "../data/FetchData";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import CreateTeamModalTopPanel from "./CreateTeamModalTopPanel";
import CreateTeamModalContent from "./CreateTeamModalContent";

const CreateTeamModal = (props:{
    team: ITeam | undefined,
    setTeam: React.Dispatch<React.SetStateAction<ITeam | undefined>>,
    setIsAddTeamModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    isAddTeamModalOpen: boolean,
    toggleTeamChange: boolean,
    setToggleTeamChange: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const nav = useNavigate();

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        props.setIsAddTeamModalOpen(false)
    }

    return (
        <div onClick={(e) => closeModal(e)} className={'modal-add-team-wrapper'}>
            <div onClick={(e) => e.stopPropagation()} className="modal-add-team-content-with-panel">
                <CreateTeamModalTopPanel toggleTeamChange={props.toggleTeamChange} setToggleTeamChange={props.setToggleTeamChange} team={props.team} setIsAddTeamModalOpen={props.setIsAddTeamModalOpen} isAddTeamModalOpen={props.isAddTeamModalOpen}/>
                <CreateTeamModalContent team={props.team} setTeam={props.setTeam}/>
            </div>
        </div>
    );
};

export default CreateTeamModal;