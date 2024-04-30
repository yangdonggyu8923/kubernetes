import { createSlice } from "@reduxjs/toolkit";
import { countUsers, deleteUserById, findAllUsers, findUserById, loginUser, modifyUser } from "./user-service";
import { IUsers } from "../model/users-model";

const userThunks = [findAllUsers]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected' 
}

interface IAuth {
    message?: string,
    token?: string
}

interface UserState  {
    json?: IUsers,    
    array?: Array<IUsers>, // = 자바의 ArrayList
    auth?: IAuth
}

export const initialState: UserState = {
    json: {} as IUsers,     // IUsers user = new IUsers, 
    array : [],          // 자동으로 내부 속성값이 초기화된다 (init)
    auth: {} as IAuth 
}

export const userSlice = createSlice({  // DB users테이블의 내부, 액시오스로 전달
    name: "users",
    initialState, // name, initialState = 속성
    reducers: {
        handlePassword: (state:any, {payload}) => {state.json.password=payload},
        handlePhone: (state:any, {payload}) => {state.json.phone=payload},
        handleJob: (state:any, {payload}) => {state.json.job=payload},
    },
    extraReducers:builder =>{ // reducers, extraReducers = 기능
        const {pending, rejected} = status;

        builder
        .addCase(findAllUsers.fulfilled,(state:any, {payload}:any)=>{state.array=payload}) 
        .addCase(findUserById.fulfilled, (state:any, {payload}:any)=>{state.json=payload})
        .addCase(countUsers.fulfilled, (state:any, {payload}:any)=>{state.count=payload})
        .addCase(modifyUser.fulfilled, (state:any, {payload}:any)=>{state.json=payload})
        .addCase(deleteUserById.fulfilled, (state:any, {payload}:any)=>{state.json=payload})
        .addCase(loginUser.fulfilled, (state:any, {payload}:any)=>{state.auth=payload})
    }
})

// DB users 테이블의 바깥
export const getAllUsers = (state:any) => {
    console.log('-- Before useSelector --')
    console.log(JSON.stringify(state.user.array))
    return state.user.array;
}
export const getOneUser = (state:any) => (state.user.json)
export const getCountUsers = (state:any) => (state.user.count)
export const deleteOneUser = (state:any) => (state.user.json)
export const getAuth = (state:any) => {    
    console.log(JSON.stringify(state.user.auth))
    return state.user.auth
}

export const { handlePassword, handleJob, handlePhone } = userSlice.actions

export default userSlice.reducer; // 위는 각각의 reducers 여기선 다 합쳐져서 s가 사라진다.