import React from 'react';
import {IPlayer} from "../interfaces/IPlayer";
import {UpdatePlayer} from "../data/FetchData";
import {IPlayerShort} from "../interfaces/IPlayerShort";
import {toast} from "react-toastify";

const EditPlayerModalTopPanel = (props:{
    player: IPlayer|undefined,
    togglePlayer: boolean,
    setTogglePlayer: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEditPlayerModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) => {

    const handleEditPlayer = async () => {
        const accessToken = localStorage.getItem('access_token')
        if (accessToken) {
            const res = await UpdatePlayer(accessToken, props.player! as unknown as IPlayerShort)
            if (res.status === 200) {
                props.setTogglePlayer(!props.togglePlayer)
                const notify = () => toast.success('Player updated successfully');
                notify();
                setTimeout(() => props.setIsEditPlayerModalOpen(false), 1000)
            }
            else if (res.status === 401) {
                const notify = () => toast.error('Session is expired. Please, login again.');
                notify();
                setTimeout(() => window.location.href = '/', 1000);
            }
            else {
                const notify = () => toast.error('An error occurred. Please try again later.');
                notify();
            }
        }
    }

    return (
        <div className='modal-add-team-top-panel-wrapper'>
            <div onClick={() => props.setIsEditPlayerModalOpen(false)} className="modal-add-team-top-panel-text">
                Cancel
            </div>
            <div className="modal-add-team-top-panel-header">
                Edit Player
            </div>
            <div onClick={handleEditPlayer} className="modal-add-team-top-panel-text">
                Edit
            </div>
        </div>
    );
};

export default EditPlayerModalTopPanel;