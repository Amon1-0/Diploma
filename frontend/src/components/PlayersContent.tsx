import React, {useEffect} from 'react';
import Loader from "./Loader";
import NoTeam from "./NoTeam";
import {ITeam} from "../interfaces/ITeam";
import {toast} from "react-toastify";
import {GetPlayers, GetTeam} from "../data/FetchData";
import {useNavigate} from "react-router-dom";
import {PageEnum} from "../interfaces/PageEnum";
import players from "../pages/Players";
import {IPlayerShort} from "../interfaces/IPlayerShort";
import PlayerShortCard from "./PlayerShortCard";
import NoPlayers from "./NoPlayers";

const PlayersContent = (props:{
    team: ITeam | undefined,
    setTeam: React.Dispatch<React.SetStateAction<ITeam | undefined>>,
    isAddTeamModalOpen: boolean,
    setIsAddTeamModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    players: IPlayerShort[],
    setPlayers: React.Dispatch<React.SetStateAction<IPlayerShort[]>>,
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
        const getPlayers = async () => {
            const token = localStorage.getItem('access_token');
            if (token !== null) {
                const response = await GetPlayers(token);
                if (response.status === 401){
                    const notify = () => toast.error("Session is expired. Please, login again.");
                    notify();
                    nav('/')
                }
                if (response.status === 404) {
                    const notify = () => toast.error("Team not found.");
                    notify();
                    return
                }
                else{
                    const data = await response.json();
                    props.setPlayers(data);
                }

            }
            else {
                const notify = () => toast.error("Your session is expired. Please log in again.");
                notify();
            }
        }

        getTeam();
        getPlayers();
    }, [])

    return (
        <div>
            {props.team === undefined ?
                <Loader/>
                : props.team.id === -1 ?
                <NoTeam page={PageEnum.Players} team={props.team} setTeam={props.setTeam} isAddTeamModalOpen={props.isAddTeamModalOpen} setIsAddTeamModalOpen={props.setIsAddTeamModalOpen}/>
                    :
                <div>
                    {props.players.length === 0 ? <NoPlayers/> :
                        <div>
                            {props.players.map((player, index) => {
                                return (
                                    <PlayerShortCard player={player} key={index}/>
                                )
                            })}
                        </div>
                    }

                </div>
            }
        </div>
    );
};

export default PlayersContent;