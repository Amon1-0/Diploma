import React from 'react';
import AddPlayerModalTopPanel from "./AddPlayerModalTopPanel";
import AddPlayerModalContent from "./AddPlayerModalContent";
import {IPlayer} from "../interfaces/IPlayer";
import EditPlayerModalTopPanel from "./EditPlayerModalTopPanel";
import EditPlayerModalContent from "./EditPlayerModalContent";

const EditPlayerModal = (props:{
    setIsEditPlayerModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    player: IPlayer|undefined,
    togglePlayer: boolean,
    setTogglePlayer: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        props.setIsEditPlayerModalOpen(false)
    }
    const [playerEdit, setPlayerEdit] = React.useState<IPlayer|undefined>(props.player)
    return (
        <div onClick={(e) => closeModal(e)} className={'modal-add-team-wrapper'}>
            <div onClick={(e) => e.stopPropagation()} className="modal-add-team-content-with-panel">
                <EditPlayerModalTopPanel player={props.player} togglePlayer={props.togglePlayer} setTogglePlayer={props.setTogglePlayer} setIsEditPlayerModalOpen={props.setIsEditPlayerModalOpen}/>
                <EditPlayerModalContent setPlayerEdit={setPlayerEdit} playerEdit={playerEdit} togglePlayer={props.togglePlayer} setTogglePlayer={props.setTogglePlayer}/>
            </div>
        </div>
    );
};

export default EditPlayerModal;