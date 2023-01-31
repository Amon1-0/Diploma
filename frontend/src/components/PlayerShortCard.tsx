import React from 'react';
import {IPlayerShort} from "../interfaces/IPlayerShort";
import {PartOfFieldEnum} from "../interfaces/PartOfFieldEnum";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {confirmAlert} from "react-confirm-alert";
import {toast} from "react-toastify";
import {UpdatePlayer} from "../data/FetchData";
import {useNavigate} from "react-router-dom";

const PlayerShortCard = (props:{
    player: IPlayerShort,
    togglePlayers: boolean,
    setTogglePlayers: React.Dispatch<React.SetStateAction<boolean>>,
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

    const handleRecoverOrInjury = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        confirmAlert({
            message: 'Are you sure ?',
            title: `Confirm To ${props.player.isInjured ? 'Recover' : 'Injury'} Player`,
            buttons:[
                {
                    label: 'Yes',
                    onClick: handlePlayerRecoversOrInjury

                },
                {
                    label: 'No',
                }
            ]
        })
    }
    const nav = useNavigate();
    const handlePlayerRecoversOrInjury = async () => {
        const token = localStorage.getItem('access_token');

        if(token !== null) {
            const response = await UpdatePlayer(token, {...props.player, isInjured: !props.player.isInjured})
            if(response.status === 200){
                const notify = () => toast.success(`Player is ${props.player.isInjured ? 'Recovered' : 'Injured'}`);
                notify();
                props.setTogglePlayers(!props.togglePlayers)
            }
            else{
                if (response.status === 401) {
                    setTimeout(() => nav('/'), 2000);
                    const notify = () => toast.error('Your session has expired. Please log in again.');
                    notify();
                    return
                }
                const notify = () => toast.error('An error occurred. Please try again later.');
                notify();
            }
        }
    }

    return (
        <div onClick={() => nav(`/player/${props.player.id}`)} className={`player-wrapper ${props.player.isInjured ? 'player-injured' : 'player-ok'}`}>
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
                    {props.player.twoWeeksForm ? props.player.twoWeeksForm.toFixed(2) : 'N/A'}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation()
                    handleRecoverOrInjury(e)
                }} className={`${props.player.isInjured? 'player-recover' : 'player-injury'}`}>
                    {props.player.isInjured ?
                        <FontAwesomeIcon icon={solid('briefcase-medical')}/>
                        :
                        <FontAwesomeIcon icon={solid('user-injured')}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default PlayerShortCard;