import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {IPlayer} from "../interfaces/IPlayer";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {GetPlayer} from "../data/FetchData";
import PlayerContent from "../components/PlayerContent";
import NavMenu from "../components/NavMenu";
import EditPlayerModal from "../components/EditPlayerModal";

const Player = () => {

    const [player, setPlayer] = useState<IPlayer>();
    const [togglePlayer, setTogglePlayer] = useState<boolean>(false);
    const [isEditPlayerModalOpen, setIsEditPlayerModalOpen] = useState<boolean>(false);
    const {id} = useParams();

    const nav = useNavigate();

    useEffect(() => {
        const getPlayer = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                const res = await GetPlayer(accessToken, +id!);
                if (res.status === 200) {
                    const body = await res.json();
                    setPlayer(body);
                }
                else if (res.status === 401) {
                    const notify = () => toast.error('Your session is expired. Please log in again.');
                    notify();
                    setTimeout(() => nav('/'), 2000);
                }
                else {
                    const notify = () => toast.error('Error getting player');
                    notify();
                }
            }
        }
        getPlayer()
    }, [togglePlayer])

    return (
        <div>
            <NavMenu/>
            <PlayerContent setTogglePlayer={setTogglePlayer} togglePlayer={togglePlayer} player={player} setIsEditPlayerModalOpen={setIsEditPlayerModalOpen}/>
            {isEditPlayerModalOpen &&
                <EditPlayerModal togglePlayer={togglePlayer} setTogglePlayer={setTogglePlayer} player={player} setIsEditPlayerModalOpen={setIsEditPlayerModalOpen}/>}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Player;