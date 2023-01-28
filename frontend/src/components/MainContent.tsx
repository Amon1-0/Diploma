import React, {useEffect} from 'react';
import {toast} from "react-toastify";
import {ITeam} from "../interfaces/ITeam";
import {GetTeam} from "../data/FetchData";
import {useNavigate} from "react-router-dom";
import Loader from "./Loader";
import NoTeam from "./NoTeam";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const MainContent = (props:{
    team: ITeam | undefined,
    setTeam: React.Dispatch<React.SetStateAction<ITeam | undefined>>,
    isAddTeamModalOpen: boolean,
    setIsAddTeamModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    toggleTeamChange: boolean,
    setToggleTeamChange: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const nav = useNavigate();

    useEffect(() => {
        const getTeam = async () => {
            const token = localStorage.getItem('access_token');
            if (token !== null) {
                const response = await GetTeam(token);
                if (response.status === 401){
                    const notify = () => toast.error("Session is expired. Please, login again.");
                    notify();
                    nav('/')
                }
                if (response.status === 404) {
                    // const notify = () => toast.error("Team not found.");
                    // notify();
                    props.setTeam({
                        name: '',
                        description: '',
                        id: -1,
                        image: '',
                    });
                    return
                }
                const data = await response.json();
                props.setTeam(data);
            }
            else {
                const notify = () => toast.error("Your session is expired. Please log in again.");
                notify();
            }
        }
        getTeam();
    }, [props.toggleTeamChange])

    return (
        <div>
            {props.team === undefined ?
                    <Loader/>
                    :
                props.team.id === -1 ?
                    <NoTeam team={props.team} setTeam={props.setTeam} isAddTeamModalOpen={props.isAddTeamModalOpen} setIsAddTeamModalOpen={props.setIsAddTeamModalOpen}/>
                    :

            <div className='team-wrapper'>
                <div className='your-team'>
                    <div className='flex-button yellow'>
                        <FontAwesomeIcon icon={solid('edit')} size={'2x'}/>
                        <div>Edit</div>
                    </div>
                    <div>
                        Your Team
                    </div>
                    <div className='flex-button red'>
                        <FontAwesomeIcon icon={solid('bucket')} size={'2x'}/>
                        <div>Delete</div>
                    </div>
                </div>

                <div className='team-info-wrapper'>

                    <div className='team-logo-wrapper'>
                        <img className='team-logo' src={props.team?.image} alt=""/>
                    </div>

                    <div>
                        <div className='team-name'>
                            {props.team?.name}
                        </div>

                        <div className='team-description'>
                            {props.team?.description}
                        </div>
                    </div>

                </div>
            </div>}
        </div>
    );
};

export default MainContent;