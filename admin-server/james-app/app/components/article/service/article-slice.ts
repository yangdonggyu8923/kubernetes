import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./article-init";
import { countArticles, deleteArticleById, findAllArticles, findArticleById, modifyArticle } from "./article-service";

const articleThunks = [findAllArticles, findArticleById]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

const handlePending = (state:any) => {
}

const handleFulfilled = (state:any, {payload}:any)=>{   // payload = 자바에 갔다온다 ex) 택배
    console.log('---------------- conclusion ----------------')
    state.array = payload
    console.log(state.array)    
}   // 여기에서 state는 article(이 파일 안)의 state

const handleRejected = (state:any) => {
}


export const articleSlice = createSlice({   // 슬라이스의 이름 = articles, 슬라이스의 키  = article (리듀서에 있음)
    name: "articles",
    initialState,
    reducers: {
        handleTitle: (state:any, {payload}) => {state.json.title=payload},
        handleContent: (state:any, {payload}) => {state.json.content=payload},
    },
    extraReducers:builder =>{
        const {pending, rejected} = status;

        builder                                                 
        .addCase(findAllArticles.fulfilled, (state:any, {payload}:any)=>{state.array=payload})
        .addCase(findArticleById.fulfilled, (state:any, {payload}:any)=>{state.json=payload})
        .addCase(deleteArticleById.fulfilled, (state:any, {payload}:any)=>{state.json=payload})
        .addCase(modifyArticle.fulfilled, (state:any, {payload}:any)=>{state.json=payload})
        .addCase(countArticles.fulfilled, (state:any, {payload}:any)=>{state.count=payload})
        
    }                                                           
        // handFulfilled = break;
        // switch case(findAllArticles.fulfilled);
})

export const getAllArticles = (state: any) => {
    console.log('---------------- Before useSelector ----------------')
    console.log(JSON.stringify(state.article.array))
    return state.article.array;
}

export const getOneArticle = (state: any) => (state.article.json)   
    // 여기에서 state는 전체의 state -> 전역으로 보내야함. 
    // 보내기 전에 state를 슬라이스 해 놓았기때문에 article의 state임을 명시해줘야함

export const getCountArticles = (state:any) => (state.article.count)
export const deleteOneArticle = (state:any) => (state.article.json)


export const { handleContent, handleTitle } = articleSlice.actions

export default articleSlice.reducer;