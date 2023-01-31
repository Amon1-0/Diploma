import React from 'react';
import {IPlayer} from "../interfaces/IPlayer";

const EditPlayerModalTopPanel = (props:{
    player: IPlayer|undefined,
    togglePlayer: boolean,
    setTogglePlayer: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEditPlayerModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) => {

    const handleEditPlayer = () => {
        props.setTogglePlayer(!props.togglePlayer)
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