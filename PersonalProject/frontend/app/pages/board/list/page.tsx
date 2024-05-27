"use client"
import CardButton from "@/app/atoms/button/CardButton"
import { IBoards } from "@/app/components/board/model/boards-model"
import { findAllBoards } from "@/app/components/board/service/board-service"
import { getAllBoards } from "@/app/components/board/service/board-slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function BoardCards(){
    
    const dispatch = useDispatch()
    const allBoards: IBoards[] = useSelector(getAllBoards)
    useEffect(()=>{
        dispatch(findAllBoards(1))
    }, [dispatch])


    return(<>
        <h1>게시판목록</h1>
        {/* {allBoards.map((board)=>(
            <CardButton key={board.id} id={board.id||0} title={board.title||""} 
            description={board.description||""}/>
        ))} */}
    </>)
}