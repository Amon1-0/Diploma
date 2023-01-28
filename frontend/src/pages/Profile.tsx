import React, {useEffect} from 'react';
import NavMenu from "../components/NavMenu";
import {ICoach} from "../interfaces/ICoach";
import ProfileContent from "../components/ProfileContent";
import {GetProfile} from "../data/FetchData";

const Profile = () => {
    const [coach, setCoach] = React.useState<ICoach>();

    useEffect(() => {
        const getCoach = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                const response = await GetProfile(token);
                const data = await response.json();
                setCoach(data);
            }
        }
        getCoach();
    }, [])

    return (
        <div>
            <NavMenu/>
            <ProfileContent coach={coach} setCoach={setCoach}/>
        </div>
    );
};

export default Profile;