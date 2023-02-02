import React from 'react';
import {AddPlayer} from "../data/FetchData";
import {IPlayerAdd} from "../interfaces/IPlayerAdd";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const AddPlayerModalTopPanel = (props:{
    togglePlayers: boolean,
    setTogglePlayers: React.Dispatch<React.SetStateAction<boolean>>,
    setIsAddPlayerModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    player: IPlayerAdd,
}) => {

    const nav = useNavigate();

    const handleAddPlayer = async () => {
        console.log(props.player);
        const token = localStorage.getItem('access_token')
        if (token !== null) {
            const response = await AddPlayer(token,props.player);
            if (response.status === 200){
                const notify = () => toast.success("Player added successfully.");
                notify();
                setTimeout(() => props.setIsAddPlayerModalOpen(false), 1000);
                setTimeout(() => props.setTogglePlayers(!props.togglePlayers), 1000);
            }
            if (response.status === 401){
                const notify = () => toast.error("Session is expired. Please, login again.");
                notify();
                setTimeout(() => nav('/'), 1000);
            }
        }
    }

    return (
        <div className='modal-add-team-top-panel-wrapper'>
            <div onClick={() => props.setIsAddPlayerModalOpen(false)} className="modal-add-team-top-panel-text">
                Cancel
            </div>
            <div className="modal-add-team-top-panel-header">
                Add Player
            </div>
            <div onClick={handleAddPlayer} className="modal-add-team-top-panel-text">
                Add
            </div>
        </div>
    );
};

export default AddPlayerModalTopPanel;