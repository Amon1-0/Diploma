import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const Loader = () => {
    return (
        <div className={'loader-wrapper'}>
            <div className={'loader-image'}>
                <FontAwesomeIcon style={{color:'white'}} icon={solid('spinner')} spin size={'3x'}/>
            </div>
            <div className={'loader-text'}>
                Loading...
            </div>

        </div>
    );
};

export default Loader;