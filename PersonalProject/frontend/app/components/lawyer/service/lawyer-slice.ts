import { createSlice } from "@reduxjs/toolkit";
import { ILawyers } from "../model/lawyers-model";
import { countLawyers, deleteLawyerById, existsId, findAllLawyers, findLawyerById, loginLawyer, modifyLawyer } from "./lawyer-service";

const LawyerThunks = [findAllLawyers]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

interface IAuth {
    message?: boolean,
    token?: string
}

interface LawyerState {
    json?: ILawyers,
    array?: Array<ILawyers>, // = 자바의 ArrayList
    auth?: IAuth,

}

export const initialState: LawyerState = {
    json: {} as ILawyers,     // ILawyers Lawyer = new ILawyers, 
    array: [],          // 자동으로 내부 속성값이 초기화된다 (init)
    auth: {} as IAuth,

}

export const lawyerSlice = createSlice({  // DB Lawyers테이블의 내부, 액시오스로 전달
    name: "lawyers",
    initialState, // name, initialState = 속성
    reducers: {
        // handlePassword: (state: any, { payload }) => { state.json.password = payload },

    },
    extraReducers: builder => { // reducers, extraReducers = 기능
        const { pending, rejected } = status;

        builder
        .addCase(findAllLawyers.fulfilled, (state: any, { payload }: any) => { state.array = payload })
        .addCase(findLawyerById.fulfilled, (state: any, { payload }: any) => { state.json = payload })
        .addCase(countLawyers.fulfilled, (state: any, { payload }: any) => { state.count = payload })
        .addCase(modifyLawyer.fulfilled, (state: any, { payload }: any) => { state.json = payload })
        .addCase(deleteLawyerById.fulfilled, (state: any, { payload }: any) => { state.json = payload })
        .addCase(existsId.fulfilled, (state: any, { payload }: any) => { state.json = payload })
            
    }
})

// DB Lawyers 테이블의 바깥
export const getAllLawyers = (state: any) => {
    console.log('-- Before useSelector --')
    console.log(JSON.stringify(state.lawyer.array))
    return state.lawyer.array;
}
export const getOneLawyer = (state: any) => (state.lawyer.json)
export const getCountLawyers = (state: any) => (state.lawyer.count)
export const deleteOneLawyer = (state: any) => (state.lawyer.json)
export const existsLawyer = (state: any) => {
    console.log(JSON.stringify(state.lawyer.json))
    return state.lawyer.json
}

export const {  } = lawyerSlice.actions

export default lawyerSlice.reducer; // 위는 각각의 reducers 여기선 다 합쳐져서 s가 사라진다.