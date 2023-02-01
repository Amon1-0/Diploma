import React, {useEffect} from 'react';
import AddTrainingModalTopPanel from "./AddTrainingModalTopPanel";
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";
import TrainingPlayer from "./TrainingPlayer";
import {AddTraining, GetPlayers} from "../data/FetchData";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const AddTrainingModal = (props:{
    setIsAddTrainingModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    playersForTraining: IPlayerForTraining[],
    setPlayersForTraining: React.Dispatch<React.SetStateAction<IPlayerForTraining[]>>,
}) => {
    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        props.setIsAddTrainingModalOpen(false)
    }
     useEffect(() => {
         const getPlayers = async () => {
            const token = localStorage.getItem('access_token')
            if (token){
                const response = await GetPlayers(token)
                if (response.status === 200){
                    const body = await response.json()
                    props.setPlayersForTraining(body)
                }
            }
         }
         getPlayers()
     },[])

    const handleAddTraining = async () => {
        const token = localStorage.getItem('access_token')
        if (token){
            const response = await AddTraining(token, props.playersForTraining)
            if (response.status === 200){
                const notify = () => toast.success("Training added successfully.");
                notify();
                setTimeout(() => {
                    props.setIsAddTrainingModalOpen(false)
                }, 2000)
            }
            else {
                const notify = () => toast.error("Something went wrong.");
                notify();
            }
        }
    }

    return (
        <div onClick={closeModal} className={'modal-add-training-wrapper'}>
            <div onClick={(e) => e.stopPropagation()} className="modal-add-training-content">
                <AddTrainingModalTopPanel/>
                {props.playersForTraining?.map((player, index) => (
                    <TrainingPlayer players={props.playersForTraining} index={index} key={index} player={player} setPlayersForTraining={props.setPlayersForTraining}/>
                ))}
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div onClick={handleAddTraining} style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'10px'}} className='add-player-button-2'>
                        <FontAwesomeIcon icon={solid('plus')}/>
                        Add
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTrainingModal;