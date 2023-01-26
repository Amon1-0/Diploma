import React, {useEffect} from 'react';
import {toast} from "react-toastify";
import {ITeam} from "../interfaces/ITeam";
import {GetTeam} from "../data/FetchData";
import {useNavigate} from "react-router-dom";
import Loader from "./Loader";
import NoTeam from "./NoTeam";

const MainContent = () => {

    const nav = useNavigate();
    const [team, setTeam] = React.useState<ITeam|undefined|null>(undefined);
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
                    const notify = () => toast.error("Team not found.");
                    notify();
                    setTeam(null);
                    return
                }
                const data = await response.json();
                setTeam(data);
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
            {team === undefined ?
                    <Loader/>
                    :
                team === null ?
                    <NoTeam/>
                    :

            <div>
                <div>
                    <img src={team?.image} alt=""/>
                </div>

                <div>
                    {team?.name}
                </div>

                <div>
                    {team?.description}
                </div>
            </div>}
        </div>
    );
};

export default MainContent;