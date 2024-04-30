'use client'
import BoardColumns from "@/app/components/board/module/board-columns"
import { findAllBoards } from "@/app/components/board/service/board-service"
import { getAllBoards } from "@/app/components/board/service/board-slice"
import { Box, alpha, gridClasses, styled } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { NextPage } from "next"
import Link from "next/link"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

const cards = [
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/mountain-nightview.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/autumn.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/babypinetree.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/beach.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/purpleflowers.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/starrysky.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/lake.jpg",
];

export default function BoardsPage({data}:any){
    const dispatch = useDispatch()
    const allBoards: [] = useSelector(getAllBoards)

    // if(allBoards !== undefined){
    //     console.log('allBoards is not undefined')

    //     console.log('length is ' + allBoards.length)
    //     for(let i=0; i<allBoards.length; i++){
    //         console.log(JSON.stringify(allBoards[i]))
    //     }
    // }else{
    //     console.log('allBoards is undefined')
    // }

    useEffect(()=>{
        dispatch(findAllBoards(1))
    },[])
    

    return (<>

        <Box sx={{ height: '100%', width: '100%' }}>
        <div className="flex flex-col items-center justify-center">
      <div className="flex overflow-x-scroll snap-x snap-mandatory max-w-6xl no-scrollbar">
        {cards.map((data, index) => {
          return (
            <section
              className="flex-shrink-0 w-full snap-center justify-center items-center"
              key={index}
            >
              <img
                src={data}
                alt="Images to scroll horizontal"
                className="w-full h-[500px]"
              />
              <Link href='http://localhost:3000/pages/article/save'>
                게시판 글쓰기
                </Link>
            </section>
          );
        })}
      </div>
    </div>
     {allBoards && <DataGrid
        rows={allBoards}
        columns={BoardColumns()}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />}
    </Box>
    </>)
}