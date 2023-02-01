import React, {SetStateAction} from 'react';
import {CreateTeam, GetTeam} from "../data/FetchData";
import {ITeam} from "../interfaces/ITeam";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {PageEnum} from "../interfaces/PageEnum";

const NoTeam = (props: {
    team: ITeam | undefined,
    setTeam: React.Dispatch<SetStateAction<ITeam|undefined>>,
    isAddTeamModalOpen: boolean,
    setIsAddTeamModalOpen: React.Dispatch<SetStateAction<boolean>>,
    page: PageEnum,
}) => {

    const nav = useNavigate()

    return (
        <div className={'no-team-wrap'}>
            <div className='no-team-content'>
                <div className='no-team-text'>
                    You are not a member of any team yet.
                </div>
                {props.page === PageEnum.Team &&
                <div onClick={() => {
                    props.setIsAddTeamModalOpen(true)
                }} className='create-team-button'>
                    Create New Team
                </div>}
            </div>
        </div>
    );
};

export default NoTeam;