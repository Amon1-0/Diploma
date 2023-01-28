import React from 'react';
import {UpdateTeam} from "../data/FetchData";
import {ITeam} from "../interfaces/ITeam";
import {ICoach} from "../interfaces/ICoach";
import {toast} from "react-toastify";

const EditProfileModalTopPanel = (props: {
    setIsActiveEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>,
    isActiveEditProfileModal: boolean,
    coachEdit: ICoach|undefined,
    setCoachEdit: React.Dispatch<React.SetStateAction<ICoach|undefined>>
}) => {

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        props.setIsActiveEditProfileModal(false)
    }

    const handlePutProfile = async () => {
        const token = localStorage.getItem('access_token')
        console.log(props.coachEdit)
        if (token) {
             const res = await UpdateTeam(props.coachEdit!, token)
                if (res.status === 200) {
                    props.setCoachEdit(res.data)
                    const notify = () => toast.success("Profile updated successfully")
                    notify()
                    setTimeout(() => props.setIsActiveEditProfileModal(false), 1000)
                }
                else{
                    const notify = () => toast.error("Something went wrong")
                    notify()
                }
        }
        props.setIsActiveEditProfileModal(false)
    }

    return (
        <div className='modal-add-team-top-panel-wrapper'>
            <div onClick={closeModal} className="modal-add-team-top-panel-text">
                Cancel
            </div>
            <div className="modal-add-team-top-panel-header">
                Edit Profile
            </div>
            <div onClick={handlePutProfile} className="modal-add-team-top-panel-text">
                Edit
            </div>
        </div>
    );
};

export default EditProfileModalTopPanel;