import React from 'react';
import CreateTeamModalTopPanel from "./CreateTeamModalTopPanel";
import CreateTeamModalContent from "./CreateTeamModalContent";
import EditTeamModalTopPanel from "./EditTeamModalTopPanel";
import EditTeamModalContent from "./EditTeamModalContent";
import {ITeam} from "../interfaces/ITeam";

const EditTeamModal = (props:{
    setIsOpenEditTeamModal: React.Dispatch<React.SetStateAction<boolean>>,
    isOpenEditTeamModal: boolean,
    team: ITeam | undefined,
    toggleTeamChange: boolean,
    setToggleTeamChange: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        props.setIsOpenEditTeamModal(false)
    }

    const [teamEdit, setTeamEdit] = React.useState<ITeam | undefined>(props.team);

    return (
        <div onClick={(e) => closeModal(e)} className={'modal-add-team-wrapper'}>
            <div onClick={(e) => e.stopPropagation()} className="modal-add-team-content-with-panel">
                <EditTeamModalTopPanel toggleTeamChange={props.toggleTeamChange} setToggleTeamChange={props.setToggleTeamChange} isEditTeamModalOpen={props.isOpenEditTeamModal} team={teamEdit} setTeam={setTeamEdit} setIsEditTeamModalOpen={props.setIsOpenEditTeamModal}/>
                <EditTeamModalContent setTeamEdit={setTeamEdit} teamEdit={teamEdit}/>
            </div>
        </div>
    );
};

export default EditTeamModal;