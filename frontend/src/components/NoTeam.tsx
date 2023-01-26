import React from 'react';

const NoTeam = () => {
    return (
        <div className={'no-team-wrap'}>
            <div className='no-team-content'>
                <div className='no-team-text'>
                    You are not a member of any team yet.
                </div>
                <div className='create-team-button'>
                    Create New Team
                </div>
            </div>
        </div>
    );
};

export default NoTeam;