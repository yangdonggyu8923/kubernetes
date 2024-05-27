import { createAsyncThunk } from "@reduxjs/toolkit";
import { countLawyerAPI, deleteLawyerByIdAPI, existsIdAPI, findAllLawyersAPI, findLawyerByIdAPI, loginLawyerAPI, logoutLawyerAPI, modifyLawyerAPI } from "./lawyer-api";
import { ILawyers } from "../model/lawyers-model";

export const findAllLawyers: any = createAsyncThunk(
    'lawyers/findAllLawyers',
    async (page:number)=>{
        console.log('findAllUsers page : ' + page)
        const data:any = await findAllLawyersAPI(1);
        const {message, result}: any =data;
        console.log('----- API를 사용한 경우 ------')
        console.log('message : ' + message)
        console.log(JSON.stringify(result))
        return data
    }
)

// 아래 미구현
export const findLawyerById: any = createAsyncThunk(
    'Lawyers/findLawyerById',
    async (id: number) => {
        const data: any = await findLawyerByIdAPI(id);
        return data
    }
)

export const modifyLawyer: any = createAsyncThunk(
    'Lawyers/modifyLawyer',
    async (Lawyer: ILawyers) => {
        const data: any = await modifyLawyerAPI(Lawyer);
        return data
    }
)

export const countLawyers: any = createAsyncThunk(
    'Lawyers/countLawyer',
    async () => {
        const data: any = await countLawyerAPI();
        return data
    }
)

export const deleteLawyerById: any = createAsyncThunk(
    'Lawyers/deleteLawyerById',
    async (id:number) => {
        const data: any = await deleteLawyerByIdAPI(id);
        return data
    }
)

export const loginLawyer: any = createAsyncThunk(
    'Lawyers/loginLawyer',
    async (lawyer: ILawyers) => {
        const data: any = await loginLawyerAPI(lawyer);
        return data
    }
)

export const existsId: any = createAsyncThunk(
    'Lawyers/existsId',
    async (name: string) => {
        const data: any = await existsIdAPI(name);
        return data
    }
)

export const logoutLawyer: any = createAsyncThunk(
    'Lawyers/logoutLawyer',
    async () => await logoutLawyerAPI()
)