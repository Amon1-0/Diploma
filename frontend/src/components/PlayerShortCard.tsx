import React from 'react';
import {IPlayerShort} from "../interfaces/IPlayerShort";

const PlayerShortCard = (props:{
    player: IPlayerShort
}) => {
    return (
        <div>
            {props.player.firstName}
            {props.player.lastName}
            {props.player.position}
            {props.player.partOfField}
            {props.player.twoWeeksForm}
            {props.player.isInjured}
            {props.player.avatar}
        </div>
    );
};

export default PlayerShortCard;