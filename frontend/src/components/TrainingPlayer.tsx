import React, {SetStateAction, useState} from 'react';
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {toast} from "react-toastify";

const TrainingPlayer = (props:{
    player: IPlayerForTraining,
    players: IPlayerForTraining[],
    setPlayersForTraining: React.Dispatch<SetStateAction<IPlayerForTraining[]>>,
    index: number
}) => {
    const absentHandler = () => {
        props.setPlayersForTraining(prevState => {
            const newState = [...prevState]
            newState[props.index].isAbsent = !newState[props.index].isAbsent
            return newState
        })
    }

    const handleChangeGrade = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (+e.target.value < 0 || +e.target.value > 10){
            const notify = () => toast.error("Оценка должна быть от 0 до 10");
            notify();
            return
        }
        props.setPlayersForTraining(prevState => {
            const newState = [...prevState]
            newState[props.index].grade = +e.target.value
            return newState
        })
    }
    return (
        <div onClick={absentHandler} className={`training-modal-player-wrapper ${props.player.isAbsent? 'player-absent' :!props.player.isInjured ? 'player-training-injured' : 'player-training-ok'}`}>
            <div className='training-modal-player-data-wrapper'>
                <div className='training-modal-player-image-wrapper'>
                    <img className='training-modal-player-image' src={props.player.avatar} alt=""/>
                </div>
                <div>
                    <div className='training-modal-player-data'>
                        {props.player.lastName}
                    </div>
                    <div className='training-modal-player-data'>
                        {props.player.firstName}
                    </div>
                    <div className='training-modal-player-data'>
                        {props.player.position}
                    </div>
                </div>
            </div>
            <div onClick={(e) => e.stopPropagation()} className='training-modal-player-actions-wrapper'>
                {props.player.isAbsent ? 'Absent' :  <input
                    value={props.player.grade}
                    onChange={(e) => handleChangeGrade(e)}
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