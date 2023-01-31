import React from 'react';
import {IPlayerShort} from "../interfaces/IPlayerShort";
import {ITeam} from "../interfaces/ITeam";
import CreateTeamModalTopPanel from "./CreateTeamModalTopPanel";
import CreateTeamModalContent from "./CreateTeamModalContent";
import AddPlayerModalTopPanel from "./AddPlayerModalTopPanel";
import AddPlayerModalContent from "./AddPlayerModalContent";
import {PartOfFieldEnum} from "../interfaces/PartOfFieldEnum";
import {IPlayerAdd} from "../interfaces/IPlayerAdd";

const AddPlayerModal = (props:{
    setIsAddPlayerModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    togglePlayers: boolean,
    setTogglePlayers: React.Dispatch<React.SetStateAction<boolean>>,
}) => {

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        props.setIsAddPlayerModalOpen(false)
    }

    const [player, setPlayer] = React.useState<IPlayerAdd>({
        lastName: '',
        firstName: '',
        avatar: '',
        birthDate: '',
        position: '',
        isInjured: false,
    })

    return (
        <div onClick={(e) => closeModal(e)} className={'modal-add-team-wrapper'}>
            <div onClick={(e) => e.stopPropagation()} className="modal-add-team-content-with-panel">
                <AddPlayerModalTopPanel player={player} togglePlayers={props.togglePlayers} setTogglePlayers={props.setTogglePlayers} setIsAddPlayerModalOpen={props.setIsAddPlayerModalOpen}/>
                <AddPlayerModalContent player={player} setPlayer={setPlayer}/>
            </div>
        </div>
    );
};

export default AddPlayerModal;