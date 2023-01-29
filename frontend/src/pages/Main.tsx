import React from 'react';
import NavMenu from "../components/NavMenu";
import MainContent from "../components/MainContent";
import {ITeam} from "../interfaces/ITeam";
import CreateTeamModal from "../components/CreateTeamModal";
import {ToastContainer} from "react-toastify";
import EditTeamModal from "../components/EditTeamModal";

const Main = () => {
    const [team, setTeam] = React.useState<ITeam|undefined>(undefined);
    const [toggleTeamChange, setToggleTeamChange] = React.useState<boolean>(false);
    const [isAddTeamModalOpen, setIsAddTeamModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    return (
        <div>
            <NavMenu/>
            <MainContent isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} toggleTeamChange={toggleTeamChange} setToggleTeamChange={setToggleTeamChange} setTeam={setTeam} team={team} isAddTeamModalOpen={isAddTeamModalOpen} setIsAddTeamModalOpen={setIsAddTeamModalOpen}/>
            {isAddTeamModalOpen &&
                <CreateTeamModal toggleTeamChange={toggleTeamChange} setToggleTeamChange={setToggleTeamChange} team={team} setTeam={setTeam} isAddTeamModalOpen={isAddTeamModalOpen} setIsAddTeamModalOpen={setIsAddTeamModalOpen}/>}
            {isEditModalOpen &&
                <EditTeamModal team={team} toggleTeamChange={toggleTeamChange} setToggleTeamChange={setToggleTeamChange} isOpenEditTeamModal={isEditModalOpen} setIsOpenEditTeamModal={setIsEditModalOpen}/>}
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
                pauseOnHover
                theme={'light'}
            />
        </div>
    );
};

export default Main;