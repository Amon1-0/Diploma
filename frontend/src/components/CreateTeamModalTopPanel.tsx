import React from 'react';
import {CreateTeam} from "../data/FetchData";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {ITeam} from "../interfaces/ITeam";

const CreateTeamModalTopPanel = (props:{
    setIsAddTeamModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    isAddTeamModalOpen: boolean,
    team: ITeam | undefined,
    toggleTeamChange: boolean,
    setToggleTeamChange: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const nav = useNavigate();
    const handleCreateTeam = async () => {
        const token = localStorage.getItem('access_token');
        if (token !== null && props.team !== undefined) {
            const response = await CreateTeam(props.team, token);
            if (response.status === 200){
                const notify = () => toast.success("Team created successfully.");
                notify();
                setTimeout(() => props.setIsAddTeamModalOpen(false), 1000);
                setTimeout(() => props.setToggleTeamChange(!props.toggleTeamChange), 1000);
            }
            if (response.status === 401){
                const notify = () => toast.error("Session is expired. Please, login again.");
                notify();
                setTimeout(() => nav('/'), 1000);
            }
            if (response.status === 409) {
                const notify = () => toast.error("You already have a team.");
                notify();
                return
            }
        }
        else {
            const notify = () => toast.error("Your session is expired. Please log in again.");
            notify();
        }
    }

    return (
        <div className='modal-add-team-top-panel-wrapper'>
            <div onClick={() => props.setIsAddTeamModalOpen(false)} className="modal-add-team-top-panel-text">
                Cancel
            </div>
            <div className="modal-add-team-top-panel-header">
                Create Team
            </div>
            <div onClick={handleCreateTeam} className="modal-add-team-top-panel-text">
                Create
            </div>
        </div>
    );
};

export default CreateTeamModalTopPanel;