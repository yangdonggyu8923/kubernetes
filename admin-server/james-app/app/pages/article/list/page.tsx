'use client'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from "next";
import { countArticles, findAllArticles } from "@/app/components/article/service/article-service";
import { getAllArticles, getCountArticles } from "@/app/components/article/service/article-slice";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ArticleColumns from "@/app/components/article/module/article-columns";

interface IArticle {
    id: number,
    title: string,
    content: string,
    writer: string,
    registerDate: string
}

const ArticlesPage: NextPage = () => {
    const dispatch = useDispatch()  // 레퍼런스 있음 = 의존관계
    // const [articles, setArticles] = useState([]) -> 상태가 리액트에 없고 리덕스에 있다 = 무상태 프로그래밍
    const allArticles: [] = useSelector(getAllArticles)  // 레퍼런스 있음 = 의존관계
    const cntArticles = useSelector(getCountArticles)
    
    // if(allArticles !== undefined){  // -> fulfilled의 switch case
    //     console.log('allArticles is not undefined')

    //     console.log('length is ' + allArticles.length)
    //     for(let i=0; i<allArticles.length; i++){
    //         console.log(JSON.stringify(allArticles[i]))
    //     }
    // }else{
    //     console.log('allArticles is undefined')
    // }


    useEffect(() => {   // 레퍼런스 없음 = 의존관계 아님, 
        dispatch(findAllArticles(1)),    // 실행 순서: useEffect -> dispatch -> fetchAllArticles(Chunk. 비동기)
        dispatch(countArticles())
      }, [])
    
    return (<>
    <Box sx={{ height: '100%', width: '100%' }}>
      {allArticles && <DataGrid
        rows={allArticles}
        columns={ArticleColumns()}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />}
    </Box>
    <div>게시글 수 : {cntArticles}</div>
    </>)
}

export default ArticlesPage