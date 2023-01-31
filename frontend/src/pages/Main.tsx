import React from 'react';
import NavMenu from "../components/NavMenu";
import MainContent from "../components/MainContent";
import {ITeam} from "../interfaces/ITeam";
import CreateTeamModal from "../components/CreateTeamModal";
import {ToastContainer} from "react-toastify";
import EditTeamModal from "../components/EditTeamModal";
import AddTrainingModal from "../components/AddTrainingModal";
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";

const Main = () => {
    const [team, setTeam] = React.useState<ITeam|undefined>(undefined);
    const [toggleTeamChange, setToggleTeamChange] = React.useState<boolean>(false);
    const [isAddTeamModalOpen, setIsAddTeamModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isOpenAddTrainingModal, setIsOpenAddTrainingModal] = React.useState(false);
    const [playersForTraining, setPlayersForTraining] = React.useState<IPlayerForTraining[]>([]);

    return (
        <div>
            <NavMenu/>
            <MainContent setIsOpenAddTrainingModal={setIsOpenAddTrainingModal} isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} toggleTeamChange={toggleTeamChange} setToggleTeamChange={setToggleTeamChange} setTeam={setTeam} team={team} isAddTeamModalOpen={isAddTeamModalOpen} setIsAddTeamModalOpen={setIsAddTeamModalOpen}/>
            {isAddTeamModalOpen &&
                <CreateTeamModal toggleTeamChange={toggleTeamChange} setToggleTeamChange={setToggleTeamChange} team={team} setTeam={setTeam} isAddTeamModalOpen={isAddTeamModalOpen} setIsAddTeamModalOpen={setIsAddTeamModalOpen}/>}
            {isEditModalOpen &&
                <EditTeamModal team={team} toggleTeamChange={toggleTeamChange} setToggleTeamChange={setToggleTeamChange} isOpenEditTeamModal={isEditModalOpen} setIsOpenEditTeamModal={setIsEditModalOpen}/>}
            {isOpenAddTrainingModal &&
                <AddTrainingModal setPlayersForTraining={setPlayersForTraining} playersForTraining={playersForTraining} setIsAddTrainingModalOpen={setIsOpenAddTrainingModal}/>}

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