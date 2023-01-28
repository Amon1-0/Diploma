import {ILoginRequest} from "../interfaces/ILoginRequest";
import {IRegisterRequest} from "../interfaces/IRegisterRequest";
import {ITeam} from "../interfaces/ITeam";

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
