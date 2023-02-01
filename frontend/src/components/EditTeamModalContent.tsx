import React, {ChangeEvent, useRef, useState} from 'react';
import {ITeam} from "../interfaces/ITeam";
import {toast} from "react-toastify";

const EditTeamModalContent = (props:{
    teamEdit: ITeam | undefined,
    setTeamEdit: React.Dispatch<React.SetStateAction<ITeam | undefined>>
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
            props.setTeamEdit({...props.teamEdit!, image: event.target?.result as string});
        };
        reader.readAsDataURL(file);
    }

    const notifyHandleSymbolsLimit = () => {
        const notify = () => toast.success("Description must be smaller than 200 symbols.");
        notify();
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
                <div className={`modal-add-team-image-wrapper`}>
                    <img className="modal-add-team-image" src={props.teamEdit?.image} alt="Preview" />
                </div>
            </div>

            <div className={"modal-add-team-desc-part-wrapper"}>
                <div className={'modal-add-team-desc-text'}>
                    Name
                </div>
                <div>
                    <input
                        value={props.teamEdit?.name}
                        onChange={(e) => props.setTeamEdit({...props.teamEdit!, name: e.target.value})}
                        type="text"
                        className={'input-add-team-name'}
                    />
                </div>
                <div className={'modal-add-team-desc-text'}>
                    Description
                </div>
                <div>
                    <textarea
                        className={'modal-add-team-textarea'}
                        name=""
                        id=""
                        value={props.teamEdit!.description}
                        cols={38}
                        rows={20}
                        onChange={(e) => {
                            if (e.target.value.length <= 200) {
                                props.setTeamEdit({...props.teamEdit!, description: e.target.value})}
                            else
                                notifyHandleSymbolsLimit()
                        }
                        }
                    >
                    </textarea>
                </div>
            </div>
        </div>
    );
};

export default EditTeamModalContent;