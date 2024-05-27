import instance from "../../common/configs/axios-config"
import { ILawyers } from "../model/lawyers-model"

export const findAllLawyersAPI = async (page :number)=>{
    try {
        const response = await instance().get('/lawyers/list', {
            params: { page, size: 5, limit: 5 }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}



// 아래 미구현
export const findLawyerByIdAPI = async (id: number) => {
    try {
        const response = await instance().get('/lawyers/detail', {
            params: { id }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const modifyLawyerAPI = async (lawyer: ILawyers) => {
    try {
        const response = (await instance().put('/lawyers/modify', lawyer))
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const countLawyerAPI = async () => {
    try {
        const response = await instance().get('/lawyers/count', {
            params: {}
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteLawyerByIdAPI = async (id: number) => {
    try {
        const response = await instance().delete('/lawyers/delete', {
            params: { id }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const loginLawyerAPI = async (lawyer: ILawyers) => {
    console.log(` 로그인API 에 넘어온 파라미터 : ${JSON.stringify(lawyer)}`)
    try{
        const response = await instance().post(`/lawyers/login`,lawyer)
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const existsIdAPI = async (name: string) => {
    try {
        const response = await instance().get('/lawyers/exists-name',
            { params: { name } })
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const logoutLawyerAPI = async () => {
    try {
        const response = await instance().get('/lawyers/logout')
        console.log('logoutAPI 결과 : '+ response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}