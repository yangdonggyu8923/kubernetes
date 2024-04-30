import { GridColDef } from "@mui/x-data-grid";
import { ArticleColumn } from "../model/articles-column";
import { Link, Typography } from "@mui/material";
import { PG } from "../../common/enums/PG";
import { useDispatch } from "react-redux";
import { deleteArticleById } from "../service/article-service";

interface CellType{
    row : ArticleColumn
}

export default function ArticleColumns(): GridColDef[] {
    const dispatch = useDispatch();

    return [
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'id', // 스프링 필드 이름과 같게
            headerName: 'No.',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.5rem"}}>{row.id}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'title',
            headerName: '제목',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.5rem"}}>
                <Link href={`${PG.ARTICLE}/detail/${row.id}`} className="underline">{row.title}</Link>
            </Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'content',
            headerName: '내용',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.5rem"}}>{row.content}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'writer', // 스프링 필드 이름과 같게
            headerName: '작성자',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.5rem"}}>{row.writer}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'board',
            headerName: '게시판',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.5rem"}}>{row.board}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'regDate',
            headerName: '작성일자',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.5rem"}}>{row.regDate}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'modDate',
            headerName: '수정일자',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.5rem"}}>{row.modDate}</Typography>
        },
        // {
        //     flex: 0.04,
        //     minWidth: 30,
        //     sortable: false,
        //     field: 'delete',
        //     headerName: '삭제',
        //     renderCell: ({row}:CellType) => <Link style={{ textDecoration: "none"}} href={""}> <Typography textAlign="center" sx={{fontSize:"1.5rem"}}>삭제</Typography></Link>
        // }
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'delete',
            headerName: 'DELETE',
            renderCell: ({ row }: CellType) =>
                <div style={{ cursor: "pointer" , textDecoration: "underline"}}
            className="btn underline-offset-4 
            focus:outline-none focus:ring focus:ring-violet-300
            overflow-hidden relative w-full h-full font-bold -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full
            before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-300"
                    onClick={() => {
                        confirm("article을 삭제합니다.")
                        console.log("delete article id : {}", row.id)
                        dispatch(deleteArticleById(row.id))
                        location.reload();
                    }
                    }> 삭제 </div>
        }
        
    ]
}