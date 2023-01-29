import React from 'react';
import NavMenu from "../components/NavMenu";
import Loader from "../components/Loader";
import NoTeam from "../components/NoTeam";
import {ITeam} from "../interfaces/ITeam";
import PlayersContent from "../components/PlayersContent";
import {ToastContainer} from "react-toastify";

const Players = () => {

    const [team, setTeam] = React.useState<ITeam|undefined>(undefined);
    const [isAddTeamModalOpen, setIsAddTeamModalOpen] = React.useState(false);
    return (
        <div>
            <NavMenu/>
            <PlayersContent team={team} setTeam={setTeam} isAddTeamModalOpen={isAddTeamModalOpen} setIsAddTeamModalOpen={setIsAddTeamModalOpen}/>
            <ToastContainer
                className={`toast-container`}
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover/>
        </div>
    );
};

export default Players;