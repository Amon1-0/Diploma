import React from 'react';
import {IPlayer} from "../interfaces/IPlayer";
import {PartOfFieldEnum} from "../interfaces/PartOfFieldEnum";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import Chart from "./Chart";

const PlayerContent = (props:{
    player: IPlayer|undefined
}) => {

    const chooseImagePartOfField = (partOfField: string) => {
        switch (partOfField) {
            case 'Forward':
                return 'https://png.monster/wp-content/uploads/2022/11/png.monster-308.png'
            case 'Midfielder':
                return 'https://cdn0.iconfinder.com/data/icons/soccer-10/500/soccer-football-sport_7-512.png'
            case 'Defender':
                return 'https://w7.pngwing.com/pngs/752/579/png-transparent-football-player-doxa-drama-f-c-computer-icons-football-game-team-sports.png'
            case 'Goalkeeper':
                return 'https://www.pngfind.com/pngs/m/455-4555854_goal-keeper-png-goalkeeper-icon-png-transparent-png.png'
            default:
                return 'https://i.ibb.co/7Xh3q8T/attack.png'
        }
    }

    const getDate = (date: string|undefined) => {
        if (date) {
            const newDate = new Date(date)
            return newDate.toLocaleDateString()
        }
    }

    return (
        <div>
            <div className='player-page-wrapper'>
                <div className='player-page-img-wrapper'>
                    <img className='player-page-img' src={props.player?.avatar} alt=""/>
                </div>
                <div className='player-names-wrapper'>
                    <div className='player-name'>
                        {props.player?.firstName}
                    </div>
                    <div className='player-name'>
                        {props.player?.lastName}
                    </div>
                    <div className='player-name'>
                        {getDate(props.player?.birthDate.toString())}
                    </div>
                </div>
                <div>
                    {props.player?.isInjured &&
                        <div className='player-injury'>
                                <FontAwesomeIcon icon={solid('user-injured')}/>
                        </div>}
                    <div className='player-edit'>
                        <FontAwesomeIcon icon={solid('edit')}/>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', marginBottom: '20px'}} className='player-name'>
                        {props.player?.position}
                    </div>

                    <img  className='player-page-img-position' src={chooseImagePartOfField(PartOfFieldEnum[props.player?.partOfField!])} alt=""/>
                </div>
            </div>
            {props.player?.trainings.length !== 0 ?
            <div className={'chart-wrapper'}>
                <Chart data={props.player?.trainings}/>
            </div> :
                <div className={'login-form-text'}>
                    No trainings
                </div>}
        </div>
    );
};

export default PlayerContent;