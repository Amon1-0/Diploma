import React from 'react';

const AddPlayerModalTopPanel = (props:{
    togglePlayers: boolean,
    setTogglePlayers: React.Dispatch<React.SetStateAction<boolean>>,
    setIsAddPlayerModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) => {

    const handleAddPlayer = () => {

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