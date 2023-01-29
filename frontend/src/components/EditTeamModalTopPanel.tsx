import React from 'react';
import {ITeam} from "../interfaces/ITeam";
import {toast} from "react-toastify";
import {UpdateTeam} from "../data/FetchData";
import {useNavigate} from "react-router-dom";

const EditTeamModalTopPanel = (props:{
    setIsEditTeamModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    isEditTeamModalOpen: boolean,
    team: ITeam | undefined,
    toggleTeamChange: boolean,
    setToggleTeamChange: React.Dispatch<React.SetStateAction<boolean>>,
    setTeam: React.Dispatch<React.SetStateAction<ITeam | undefined>>
}) => {

    const nav = useNavigate();
    const handleUpdateTeam = async () => {
        const token = localStorage.getItem('access_token');
        if(token !== null) {
            const response = await UpdateTeam(props.team!, token)
            if(response.status === 200){
                const notify = () => toast.success("Team updated successfully.");
                notify();
                props.setIsEditTeamModalOpen(false)
                props.setToggleTeamChange!(!props.toggleTeamChange)
            }
            else{
                if (response.status === 401) {
                    setTimeout(() => nav('/'), 2000);
                    const notify = () => toast.error("Your session is expired. Please log in again.");
                    notify();
                    return
                }
                const notify = () => toast.error("Team not updated.");
                notify();
            }
        }
    }

    return (
        <div className='modal-add-team-top-panel-wrapper'>
            <div onClick={() => props.setIsEditTeamModalOpen(false)} className="modal-add-team-top-panel-text">
                Cancel
            </div>
            <div className="modal-add-team-top-panel-header">
                Edit Team
            </div>
            <div onClick={handleUpdateTeam} className="modal-add-team-top-panel-text">
                Edit
            </div>
        </div>
    );
};

export default EditTeamModalTopPanel;