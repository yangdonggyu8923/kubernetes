'use client'
import { PG } from "@/app/components/common/enums/PG"
import { IUsers } from "@/app/components/user/model/users-model"
import { deleteUserById, findUserById, modifyUser } from "@/app/components/user/service/user-service"
import { getOneUser, handleJob, handlePassword, handlePhone } from "@/app/components/user/service/user-slice"
import { Button, Input, Typography } from "@mui/material"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import { destroyCookie, parseCookies } from "nookies"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

export default function UserDetailPage({params}:any){
    const router = useRouter();
    const dispatch = useDispatch()
    const oneUser:IUsers = useSelector(getOneUser)
    const token:string|null = parseCookies().accessToken;

    const updatePassword = (e:any) => dispatch(handlePassword(e.target.value))
    const updatePhone = (e:any) => dispatch(handlePhone(e.target.value))
    const updateJob = (e:any) => dispatch(handleJob(e.target.value))
    
    const handleModifyUser = () => {
        dispatch(modifyUser(oneUser))
        location.reload()
    }

    const handleDeleteUser = () =>{
        destroyCookie(null, 'accessToken')
        dispatch(deleteUserById(token? jwtDecode<any>(token).userId:0))
        router.push("/")
    }
    
    useEffect(()=>{
        dispatch(findUserById(token? jwtDecode<any>(token).userId:0))
    },[])

    return(<>
    <span>ID : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{token? jwtDecode<any>(token).userId:0}</Typography>
    <span>아이디 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{oneUser.username}</Typography>
    <span>비밀번호 : </span><Input type="password" name="password" placeholder={oneUser.password} onChange={updatePassword}></Input><br />
    <span>이름 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{oneUser.name}</Typography>
    <span>전화번호 : </span><Input type="text" name="phone" placeholder={oneUser.phone} onChange={updatePhone}></Input><br />
    <span>직업 : </span><Input type="text" name="job" placeholder={oneUser.job} onChange={updateJob}></Input><br />
    {/* <span>작성일자 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{oneUser.regDate}</Typography>
    <span>수정일자 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{oneUser.modDate}</Typography> */}
    <Button onClick={handleModifyUser}>수정</Button>
    <Button onClick={handleDeleteUser}>탈퇴</Button>
    </>)
}
