import React, {useEffect} from 'react';
import AddTrainingModalTopPanel from "./AddTrainingModalTopPanel";
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";
import TrainingPlayer from "./TrainingPlayer";
import {GetPlayers} from "../data/FetchData";
import {toast} from "react-toastify";

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
    return (
        <div onClick={closeModal} className={'modal-add-training-wrapper'}>
            <div onClick={(e) => e.stopPropagation()} className="modal-add-training-content">
                <AddTrainingModalTopPanel/>
                {props.playersForTraining?.map((player, index) => (
                    <TrainingPlayer key={index} player={player}/>
                ))}
            </div>
        </div>
    );
};

export default AddTrainingModal;