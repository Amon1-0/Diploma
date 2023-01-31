import React, {ChangeEvent, useRef, useState} from 'react';
import {toast} from "react-toastify";
import {IPlayerShort} from "../interfaces/IPlayerShort";
import {IPlayerAdd} from "../interfaces/IPlayerAdd";
import {IRegisterCoach} from "../interfaces/IRegisterCoach";

const AddPlayerModalContent = (props:{
    player: IPlayerAdd|undefined,
    setPlayer: React.Dispatch<React.SetStateAction<IPlayerAdd>>
}) => {

    const [preview, setPreview] = useState<string | ArrayBuffer | null>('');
    const fileInput = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (fileInput.current && fileInput.current.files) {
            const file = fileInput.current.files[0];
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);

            // Implement image to base64
            convertImageToBase64(reader, file);
        }
    };


    const convertImageToBase64 = (reader: FileReader, file: File) => {
        reader.onload = (event) => {
            props.setPlayer({...props.player!, avatar: event.target?.result as string});
        };
        reader.readAsDataURL(file);
    }


    return (
        <div className={'modal-add-team-content'}>
            <div className={`modal-add-team-image-part-wrapper`}>
                <input
                    type="file"
                    ref={fileInput}
                    accept="image/*"
                    onChange={(e) => handleChange(e)}
                />
                <div  className={`modal-add-team-image-wrapper`}>
                    <img className="modal-add-team-image" src={preview?.toString()} alt="Preview" />
                </div>
            </div>

            <div className={"modal-add-team-desc-part-wrapper"}>
                <div className={'modal-add-team-desc-text'}>
                    First Name
                </div>
                <div>
                    <input
                        value={props.player?.firstName}
                        onChange={(e) => props.setPlayer({...props.player!, firstName: e.target.value})}
                        type="text"
                        className={'input-add-team-name'}
                    />
                </div>
                <div className={'modal-add-team-desc-text'}>
                    Last Name
                </div>
                <div>
                    <input
                        value={props.player?.lastName}
                        onChange={(e) => props.setPlayer({...props.player!, lastName: e.target.value})}
                        type="text"
                        className={'input-add-team-name'}
                    />
                </div>
                <div className={'modal-add-team-desc-text'}>
                    Date of Birth
                </div>
                <div>
                    <input
                        className={'input-add-team-name'}
                        type="date"
                        value={props.player?.birthDate}
                        onChange={(e) => props.setPlayer({...props.player!, birthDate: e.target.value})}
                    />
                </div>
                <div className={'modal-add-team-desc-text'}>
                    Position
                </div>
                <div>
                    <select
                        name=""
                        id=""
                        className={'select-add-player-position'}
                        value={props.player?.position}
                        onChange={(e) => props.setPlayer({...props.player!, position: e.target.value})}
                    >
                        <option value="ST">ST</option>
                        <option value="CF">CF</option>
                        <option value="RW">RW</option>
                        <option value="LW">LW</option>
                        <option value="CAM">CAM</option>
                        <option value="CAM">RM</option>
                        <option value="CAM">LM</option>
                        <option value="CM">CM</option>
                        <option value="CDM">CDM</option>
                        <option value="LWB">LWB</option>
                        <option value="RWB">RWB</option>
                        <option value="RB">RB</option>
                        <option value="LB">LB</option>
                        <option value="CB">CB</option>
                        <option value="GK">GK</option>
                    </select>
                </div>
                <div className={'modal-add-team-desc-text'}>
                    Is Injured
                </div>
                <div>
                    <select
                        name=""
                        id=""
                        className={'select-add-player-position'}
                        value={props.player?.isInjured?.toString()}
                        onChange={(e) => props.setPlayer({...props.player!, isInjured: e.target.value === 'true'})}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AddPlayerModalContent;