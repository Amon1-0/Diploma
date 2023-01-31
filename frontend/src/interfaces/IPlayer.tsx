import {PartOfFieldEnum} from "./PartOfFieldEnum";
import {ITraining} from "./ITraining";

export interface IPlayer{
    id: number,
    lastName: string,
    firstName: string,
    birthDate: Date,
    position: string,
    isInjured: boolean,
    avatar: string,
    partOfField: PartOfFieldEnum,
    trainings: ITraining[]
}