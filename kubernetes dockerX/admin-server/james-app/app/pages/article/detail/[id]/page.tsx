'use client'
import { IArticles } from "@/app/components/article/model/articles-model"
import { deleteArticleById, findArticleById, modifyArticle } from "@/app/components/article/service/article-service"
import { getOneArticle, handleContent, handleTitle } from "@/app/components/article/service/article-slice"
import { PG } from "@/app/components/common/enums/PG"
import { Button, Input, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { NextPage } from "next"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

export default function ArticleDetailPage({params}:any){
    const dispatch = useDispatch()
    const oneArticle:IArticles = useSelector(getOneArticle)
    const router = useRouter()

    const updateTitle = (e:any) => dispatch(handleTitle(e.target.value))
    const updateContent = (e:any) => dispatch(handleContent(e.target.value))

    const handleModifyArticle = () => {
        dispatch(modifyArticle(oneArticle))
        location.reload()
    }

    const HandleDeleteArticle = () => {
        dispatch(deleteArticleById(params.id))
        router.push(`${PG.ARTICLE}/list`)
    }
    
    useEffect(()=>{
        dispatch(findArticleById(params.id))
    },[])

    return(<>
    <span>ID : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{params.id}</Typography>
    <span>제목 : </span><Input type="text" name="title" placeholder={oneArticle.title} onChange={updateTitle}></Input><br />
    <span>내용 : </span><Input type="text" name="content" placeholder={oneArticle.content} onChange={updateContent}></Input><br />
    <span>작성자 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{oneArticle.writer}</Typography>
    <span>게시판 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{oneArticle.board}</Typography>
    <span>작성일자 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{oneArticle.regDate}</Typography>
    <span>수정일자 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{oneArticle.modDate}</Typography>
    <Button onClick={handleModifyArticle}>수정</Button>
    <Button onClick={HandleDeleteArticle}>삭제</Button>
    </>)
}