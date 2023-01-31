import React from 'react';
import {IPlayerShort} from "../interfaces/IPlayerShort";
import {PartOfFieldEnum} from "../interfaces/PartOfFieldEnum";

const PlayerShortCard = (props:{
    player: IPlayerShort
}) => {

    const getGradeStyle = (grade: number|null) => {
        if (grade === null) {
            return 'grade-null'
        }
        if (grade >= 9) {
            return 'grade-perfect'
        }
        if (grade >= 7 && grade < 9) {
            return 'grade-good'
        }
        if (grade >= 5 && grade < 7) {
            return 'grade-ok'
        }
        if (grade < 5) {
            return 'grade-bad'
        }

        return ''
    }
    return (
        <div className={`player-wrapper ${props.player.isInjured ? 'player-injured' : 'player-ok'}`}>
            <div className='player-name-image-wrapper'>
                <div className='player-image-wrapper'>
                    <img className='player-image' src={props.player.avatar} alt=""/>
                </div>
                <div className={'player-names-wrapper'}>
                    <div className='player-name'>
                        {props.player.firstName}
                    </div>
                    <div className='player-name'>
                        {props.player.lastName}
                    </div>
                </div>
            </div>
            <div className='player-data-wrapper'>
                <div className='player-data'>
                    {PartOfFieldEnum[props.player.partOfField]}
                </div>
                <div className='player-data'>
                    {props.player.position}
                </div>
                <div className={`player-grade ${getGradeStyle(props.player.twoWeeksForm)}`}>
                    {props.player.twoWeeksForm ? props.player.twoWeeksForm : 'N/A'}
                </div>
            </div>
        </div>
    );
};

export default PlayerShortCard;