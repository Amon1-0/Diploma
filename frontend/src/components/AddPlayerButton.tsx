import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const AddPlayerButton = (props:{
    setIsAddPlayerModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <div className='add-player-button-2-wrapper' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div onClick={() => props.setIsAddPlayerModalOpen(true)} className='add-player-button-2'>
                <FontAwesomeIcon icon={solid('plus')} style={{marginRight: '15px'}}/>
                <div>
                    Add Player
                </div>
            </div>
        </div>
    );
};

export default AddPlayerButton;