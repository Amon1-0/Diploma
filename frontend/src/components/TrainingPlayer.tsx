import React, {useState} from 'react';
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const TrainingPlayer = (props:{
    player: IPlayerForTraining,
}) => {
    const [player, setPlayer] = useState(props.player)
    return (
        <div onClick={() => setPlayer({...player, isAbsent: !player.isAbsent})} className={`training-modal-player-wrapper ${player.isAbsent? 'player-absent' :player.isInjured ? 'player-training-injured' : 'player-training-ok'}`}>
            <div className='training-modal-player-data-wrapper'>
                <div className='training-modal-player-image-wrapper'>
                    <img className='training-modal-player-image' src={player.avatar} alt=""/>
                </div>
                <div>
                    <div className='training-modal-player-data'>
                        {player.lastName}
                    </div>
                    <div className='training-modal-player-data'>
                        {player.firstName}
                    </div>
                    <div className='training-modal-player-data'>
                        {player.position}
                    </div>
                </div>
            </div>
            <div onClick={(e) => e.stopPropagation()} className='training-modal-player-actions-wrapper'>
                {player.isAbsent ? 'Absent' :  <input
                    value={player.grade}
                    onChange={(e) => setPlayer({...player, grade: +e.target.value})}
                    type="number"
                    className={'training-modal-player-grade-input'}
                    min={0}
                    max={10}
                    step={0.1}
                />}
            </div>
        </div>
    );
};

export default TrainingPlayer;