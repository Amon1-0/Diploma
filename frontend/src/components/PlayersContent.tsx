import React, {useEffect} from 'react';
import Loader from "./Loader";
import NoTeam from "./NoTeam";
import {ITeam} from "../interfaces/ITeam";
import {toast} from "react-toastify";
import {GetTeam} from "../data/FetchData";
import {useNavigate} from "react-router-dom";
import {PageEnum} from "../interfaces/PageEnum";

const PlayersContent = (props:{
    team: ITeam | undefined,
    setTeam: React.Dispatch<React.SetStateAction<ITeam | undefined>>,
    isAddTeamModalOpen: boolean,
    setIsAddTeamModalOpen: React.Dispatch<React.SetStateAction<boolean>>
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
    }, [])

    return (
        <div>
            {props.team === undefined ?
                <Loader/>
                : props.team.id === -1 ?
                <NoTeam page={PageEnum.Players} team={props.team} setTeam={props.setTeam} isAddTeamModalOpen={props.isAddTeamModalOpen} setIsAddTeamModalOpen={props.setIsAddTeamModalOpen}/>
                    :
                <div>
                    <h1>Players</h1>
                </div>
            }
        </div>
    );
};

export default PlayersContent;