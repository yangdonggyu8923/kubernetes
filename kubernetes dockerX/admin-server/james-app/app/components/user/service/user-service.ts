import { createAsyncThunk } from "@reduxjs/toolkit";
import { countUserAPI, deleteUserByIdAPI, findAllUsersAPI, findUserByIdAPI, loginUserAPI, modifyUserAPI } from "./user-api";
import { IUsers } from "../model/users-model";


export const findAllUsers: any = createAsyncThunk(
    'users/findAllUsers',
    async (page: number) => {
        console.log('findAllUsers page : ' + page)
        const data: any = await findAllUsersAPI(1);
        const { message, result }: any = data;
        console.log('----- API를 사용한 경우 ------')
        console.log('message : ' + message)
        console.log(JSON.stringify(result))
        return data
    }
)

export const findUserById: any = createAsyncThunk(
    'users/findUserById',
    async (id: number) => {
        const data: any = await findUserByIdAPI(id);
        return data
    }
)

export const modifyUser: any = createAsyncThunk(
    'users/modifyUser',
    async (user: IUsers) => {
        const data: any = await modifyUserAPI(user);
        return data
    }
)

export const countUsers: any = createAsyncThunk(
    'users/countUser',
    async () => {
        const data: any = await countUserAPI();
        return data
    }
)

export const deleteUserById: any = createAsyncThunk(
    'users/deleteUserById',
    async (id:number) => {
        const data: any = await deleteUserByIdAPI(id);
        return data
    }
)

export const loginUser: any = createAsyncThunk(
    'users/loginUser',
    async (user: IUsers) => {
        const data: any = await loginUserAPI(user);
        return data
    }
)





