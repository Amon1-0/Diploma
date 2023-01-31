import {ILoginRequest} from "../interfaces/ILoginRequest";
import {IRegisterRequest} from "../interfaces/IRegisterRequest";
import {ITeam} from "../interfaces/ITeam";
import {ICoach} from "../interfaces/ICoach";
import {IPlayerAdd} from "../interfaces/IPlayerAdd";

const BASE_URL = "https://localhost:7189/";

export const Login = async (loginData: ILoginRequest) => {
    try {
        const response = await fetch(`${BASE_URL}Profile/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: loginData.login,
                password: loginData.password
            })
        });

        const responseJson = await response.json()
        return responseJson;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const Register = async (registerData: IRegisterRequest) => {
    try {
        const response = await fetch(`${BASE_URL}Profile/register`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: registerData.password,
                firstName: registerData.firstName,
                lastName: registerData.lastName,
                birthDate: registerData.birthDate,
                avatar: registerData.avatar,
                login: registerData.login
            })
        });
        return response;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}

export const GetTeam = async (token:string) => {
    try {
        const response = await fetch(`${BASE_URL}Team/team`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}

export const CreateTeam = async (teamData: ITeam, token:string) => {
    try {
        const response = await fetch(`${BASE_URL}Team/team`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: teamData.name,
                description: teamData.description,
                image: teamData.image
            })
        });
        return response;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}

export const GetProfile = async (token:string) => {
    try {
        const response = await fetch(`${BASE_URL}Profile`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}

export const UpdateCoach = async (teamData: ICoach, token:string) => {
    try {
        const response = await fetch(`${BASE_URL}Profile`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                firstName: teamData.firstName,
                lastName: teamData.lastName,
                image: teamData.avatar,
                birthDate: teamData.birthDate
            })
        });
        return response;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}

export const DeleteTeam = async (token:string) => {
    try {
        const response = await fetch(`${BASE_URL}Team/team`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}

export const UpdateTeam = async (teamData: ITeam, token:string) => {
    try {
        const response = await fetch(`${BASE_URL}Team/team`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: teamData.name,
                description: teamData.description,
                image: teamData.image
            })
        });
        return response;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}

export const GetPlayers = async (token:string) => {
    try {
        const response = await fetch(`${BASE_URL}Team/players`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}

export const AddPlayer = async (token:string, player:IPlayerAdd) => {
    try {
        const response = await fetch(`${BASE_URL}Team/player`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                firstName: player.firstName,
                lastName: player.lastName,
                birthDate: player.birthDate,
                avatar: player.avatar,
                position: player.position
            })
        });
        return response;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}
