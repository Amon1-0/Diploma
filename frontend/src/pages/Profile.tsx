import React, {useEffect} from 'react';
import NavMenu from "../components/NavMenu";
import {ICoach} from "../interfaces/ICoach";
import ProfileContent from "../components/ProfileContent";
import {GetProfile} from "../data/FetchData";
import EditProfileModal from "../components/EditProfileModal";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const [coach, setCoach] = React.useState<ICoach>();
    const [toggleProfile, setToggleProfile] = React.useState(false);
    const [isOpenEditProfileModal, setIsOpenEditProfileModal] = React.useState(false);

    const nav = useNavigate();
    useEffect(() => {
        const getCoach = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                const response = await GetProfile(token);
                if (response.status === 401) {
                    setTimeout(() => nav('/'), 2000);
                    const notify = () => toast.error("Your session is expired. Please log in again.");
                    notify();
                }
                const data = await response.json();
                setCoach(data);
            }
        }
        getCoach();
    }, [toggleProfile])

    console.log(coach);
    return (
        <div>
            <NavMenu/>
            <ProfileContent setIsOpenEditProfileModal={setIsOpenEditProfileModal} coach={coach} setCoach={setCoach}/>
            {isOpenEditProfileModal &&
                <EditProfileModal setToggleProfile={setToggleProfile} toggleProfile={toggleProfile} profile={coach} setProfile={setCoach} isOpenEditProfileModal={isOpenEditProfileModal} setIsOpenEditProfileModal={setIsOpenEditProfileModal}/>
            }
        </div>
    );
};

export default Profile;