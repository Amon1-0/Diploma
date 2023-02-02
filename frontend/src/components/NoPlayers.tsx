import React, {SetStateAction} from 'react';

const NoPlayers = (props:{
    setIsAddPlayerModalOpen: React.Dispatch<SetStateAction<boolean>>

}) => {
    return (
        <div className='no-players-wrapper'>
            <div className='no-players-text'>
                No Players
            </div>
            <div onClick={() => props.setIsAddPlayerModalOpen(true)} className='add-player-button'>
                Add Player
            </div>
        </div>
    );
};

export default NoPlayers;