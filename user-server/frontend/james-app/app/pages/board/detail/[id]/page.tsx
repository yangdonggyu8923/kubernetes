'use client'
import { IBoards } from "@/app/components/board/model/boards-model"
import { findBoardById } from "@/app/components/board/service/board-service"
import { getSingleBoard } from "@/app/components/board/service/board-slice"
import { Button, Typography } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"


export default function BoardDetailPage ({params}:any)  {
    const dispatch = useDispatch()
    const oneBoard:IBoards = useSelector(getSingleBoard)
    

    useEffect(()=>{
        dispatch(findBoardById(params.id))
    },[])

    const handleDeleteBoard = () => {}
    const handleModifyBoard = () => {}

    return (<>
    <span>ID : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{params.id}</Typography>
    <span>게시판이름 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{oneBoard.title}</Typography>
    <span>게시판종류 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{oneBoard.description}</Typography>
    <span>작성일자 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{oneBoard.regDate}</Typography>
    <span>수정일자 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{oneBoard.modDate}</Typography>
    <Button onClick={handleModifyBoard}>수정</Button>
    <Button onClick={handleDeleteBoard}>삭제</Button>
    </>)
}
