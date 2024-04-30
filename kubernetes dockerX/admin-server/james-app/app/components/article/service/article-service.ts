import { createAsyncThunk } from "@reduxjs/toolkit";
import { countArticlesAPI, deleteArticleByIdAPI, findAllArticlesAPI, findArticleByIdAPI, modifyArticleAPI } from "./article-api";
import { IArticles } from "../model/articles-model";

export const findAllArticles: any = createAsyncThunk( // 데이터를 비동기로 만들어 자바와 주고 받으려고,
    'articles/findAllArticles',                        // createAsyncThunk가 없으면 동기로 보내는 것
    async (page: number) => {
        console.log('findAllArticles page : ' + page)
        const data: any = await findAllArticlesAPI(1); // axios = 자바와 연결해주는 것

        const { message, result }: any = data;
        // console.log('----- API를 사용한 경우 ------')
        // console.log('message : ' + message)
        // console.log(JSON.stringify(result))
        
        return data
    }
)

export const findArticleById: any = createAsyncThunk(
    'articles/findArticleById',
    async (id: number) => {
        const data: any = await findArticleByIdAPI(id);
        return data
    }
)

export const deleteArticleById: any = createAsyncThunk(
    'articles/deleteArticleById',
    async (id: number) => {
        const data: any = await deleteArticleByIdAPI(id);
        return data
    }
)

export const countArticles: any = createAsyncThunk(
    'articles/countArticles',
    async () => (await countArticlesAPI())
)

export const modifyArticle: any = createAsyncThunk(
    'articles/modifyArticle',
    async (article: IArticles) => {
        const data :any = await modifyArticleAPI(article)
        return data
    }
)