import React, {ChangeEvent, useRef, useState} from 'react';
import {IPlayer} from "../interfaces/IPlayer";

const EditPlayerModalContent = (props:{
    playerEdit: IPlayer|undefined,
    setPlayerEdit: React.Dispatch<React.SetStateAction<IPlayer|undefined>>,
    togglePlayer: boolean,
    setTogglePlayer: React.Dispatch<React.SetStateAction<boolean>>,
}) => {

    const [preview, setPreview] = useState<string | ArrayBuffer | null>(props.playerEdit?.avatar!);
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
            props.setPlayerEdit({...props.playerEdit!, avatar: event.target?.result as string});
        };
        reader.readAsDataURL(file);
    }

    console.log(props.playerEdit?.position);
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
                        value={props.playerEdit?.firstName}
                        onChange={(e) => props.setPlayerEdit({...props.playerEdit!, firstName: e.target.value})}
                        type="text"
                        className={'input-add-team-name'}
                    />
                </div>
                <div className={'modal-add-team-desc-text'}>
                    Last Name
                </div>
                <div>
                    <input
                        value={props.playerEdit?.lastName}
                        onChange={(e) => props.setPlayerEdit({...props.playerEdit!, lastName: e.target.value})}
                        type="text"
                        className={'input-add-team-name'}
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
                        value={props.playerEdit?.position}
                        onChange={(e) => props.setPlayerEdit({...props.playerEdit!, position: e.target.value})}
                    >
                        <option value="ST">ST</option>
                        <option value="CF">CF</option>
                        <option value="RW">RW</option>
                        <option value="LW">LW</option>
                        <option value="CAM">CAM</option>
                        <option value="RM">RM</option>
                        <option value="LM">LM</option>
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
                        value={props.playerEdit?.isInjured?.toString()}
                        onChange={(e) => props.setPlayerEdit({...props.playerEdit!, isInjured: e.target.value === 'true'})}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default EditPlayerModalContent;