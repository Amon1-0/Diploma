import React, {useEffect} from 'react';
import Loader from "./Loader";
import NoTeam from "./NoTeam";
import {ITeam} from "../interfaces/ITeam";
import {toast} from "react-toastify";
import {GetPlayers, GetTeam} from "../data/FetchData";
import {useNavigate} from "react-router-dom";
import {PageEnum} from "../interfaces/PageEnum";
import {IPlayerShort} from "../interfaces/IPlayerShort";
import PlayerShortCard from "./PlayerShortCard";
import NoPlayers from "./NoPlayers";
import AddPlayerButton from "./AddPlayerButton";
import SortPlayersButton from "./SortPlayersButton";
import {PartOfFieldEnum} from "../interfaces/PartOfFieldEnum";

const PlayersContent = (props:{
    team: ITeam | undefined,
    setTeam: React.Dispatch<React.SetStateAction<ITeam | undefined>>,
    isAddTeamModalOpen: boolean,
    setIsAddTeamModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    players: IPlayerShort[],
    setPlayers: React.Dispatch<React.SetStateAction<IPlayerShort[]>>,
    togglePlayers: boolean,
    setTogglePlayers: React.Dispatch<React.SetStateAction<boolean>>,
    isSortByScore: boolean,
    setIsSortByScore: React.Dispatch<React.SetStateAction<boolean>>,
    setIsAddPlayerModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
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
                    let data = await response.json();
                    data = data.sort((a: IPlayerShort, b: IPlayerShort) => {
                        if (a.twoWeeksForm === null || b.twoWeeksForm === null)
                            return 0;
                        else if (a.twoWeeksForm < b.twoWeeksForm) {
                            return 1;
                        }
                        else if (a.twoWeeksForm < b.twoWeeksForm) {
                            return -1;
                        }
                        return 0;
                    })
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
    }, [props.togglePlayers])

    return (
        <div>
            {props.team === undefined ?
                <Loader/>
                : props.team.id === -1 ?
                <NoTeam page={PageEnum.Players} team={props.team} setTeam={props.setTeam} isAddTeamModalOpen={props.isAddTeamModalOpen} setIsAddTeamModalOpen={props.setIsAddTeamModalOpen}/>
                    :
                <div>
                    {props.players.length === 0 ? <NoPlayers/> :
                        props.isSortByScore ?
                        <div className='players-cards-wrapper'>
                            <div className='players-text'>
                                Players
                            </div>
                            <div className='players-buttons-wrapper'>
                                <AddPlayerButton setIsAddPlayerModalOpen={props.setIsAddPlayerModalOpen}/>
                                <SortPlayersButton setIsSortByScore={props.setIsSortByScore} isSortByScore={props.isSortByScore}/>
                            </div>
                            {props.players.map((player, index) => {
                                return (
                                    <PlayerShortCard player={player} key={index}/>
                                )
                            })}
                        </div> :
                            <div className='players-cards-wrapper'>
                                <div className='players-text'>
                                    Players
                                </div>
                                <div className='players-buttons-wrapper'>
                                    <AddPlayerButton setIsAddPlayerModalOpen={props.setIsAddPlayerModalOpen}/>
                                    <SortPlayersButton setIsSortByScore={props.setIsSortByScore} isSortByScore={props.isSortByScore}/>
                                </div>
                                <div className='players-text'>
                                    Goalkeepers
                                </div>
                                {props.players.filter(player => player.partOfField === PartOfFieldEnum.Goalkeeper).map((player, index) => {
                                    return (
                                        <PlayerShortCard player={player} key={index}/>
                                    )
                                })}
                                <div className='players-text'>
                                    Defenders
                                </div>
                                {props.players.filter(player => player.partOfField === PartOfFieldEnum.Defender).map((player, index) => {
                                    return (
                                        <PlayerShortCard player={player} key={index}/>
                                    )
                                })}
                                <div className='players-text'>
                                    Midfielders
                                </div>
                                {props.players.filter(player => player.partOfField === PartOfFieldEnum.Midfielder).map((player, index) => {
                                    return (
                                        <PlayerShortCard player={player} key={index}/>
                                    )
                                })}
                                <div className='players-text'>
                                    Forwards
                                </div>
                                {props.players.filter(player => player.partOfField === PartOfFieldEnum.Forward).map((player, index) => {
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