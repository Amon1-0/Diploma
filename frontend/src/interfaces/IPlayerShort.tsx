import {PartOfFieldEnum} from "./PartOfFieldEnum";

export interface IPlayerShort{
    id: number,
    lastName: string,
    firstName: string,
    avatar: string,
    position: string,
    isInjured: boolean,
    partOfField: PartOfFieldEnum,
    twoWeeksForm: number|null,
}