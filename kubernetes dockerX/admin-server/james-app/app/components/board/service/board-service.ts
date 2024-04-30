import { createAsyncThunk } from "@reduxjs/toolkit";
import { countBoardsAPI, findAllBoardsAPI, findBoardByIdAPI } from "./board-api";

export const findAllBoards: any = createAsyncThunk( 
    'boards/findAllBoards',                        
    async (page: number) => {
        console.log('findAllBoards page : ' + page)
        const data: any = await findAllBoardsAPI(1);       
        return data
    }
)

export const findBoardById: any = createAsyncThunk( 
    'boards/findBoardById',                       
    async (id: number) => {
        const data: any = await findBoardByIdAPI(id);
        return data
    }
)

export const countBoards: any = createAsyncThunk( 
    'boards/countBoards',                       
    async () => {
        const data: any = await countBoardsAPI();
        return data
    }
)