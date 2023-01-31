import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const SortPlayersButton = (props:{
    isSortByScore: boolean,
    setIsSortByScore: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <div className='add-player-button-2-wrapper' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div onClick={() => props.setIsSortByScore(!props.isSortByScore)} className='add-player-button-2'>
                <FontAwesomeIcon icon={solid('sort')} style={{marginRight: '15px'}}/>
                <div>
                    Sort By {props.isSortByScore ? 'Position': 'Score'}
                </div>
            </div>
        </div>
    );
};

export default SortPlayersButton;