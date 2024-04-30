import { instance } from '@/app/components/common/configs/axios-config'

export const findAllBoardsAPI = async (page: number) =>{    
    try{                                                      
        const response = await instance.get('/boards/list',{
            params: {page, size:10, limit: 10}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
    
}

export const findBoardByIdAPI = async (id: number) =>{    
    try{                                                      
        const response = await instance.get('/boards/detail',{
            params: {id}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
    
}
export const countBoardsAPI = async () =>{    
    try{                                                      
        const response = await instance.get('/boards/count',{
            params: {}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
    
}