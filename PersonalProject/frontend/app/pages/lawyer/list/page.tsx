'use client'
import LawyerColumns from "@/app/components/lawyer/module/lawyer-columns"
import { countLawyers, findAllLawyers } from "@/app/components/lawyer/service/lawyer-service"
import { getAllLawyers, getCountLawyers } from "@/app/components/lawyer/service/lawyer-slice"
import { DataGrid } from "@mui/x-data-grid"
import { NextPage } from "next"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

const LawyerPage: NextPage = () => {
    const dispatch = useDispatch()
    const allLawyer: [] = useSelector(getAllLawyers)
    const cntLawyer = useSelector(getCountLawyers);

    useEffect(()=>{
        dispatch(findAllLawyers(1)),
        dispatch(countLawyers())
    },[])

    return(<>
    <div style={{ height: '100%', width: "100%" }}>
      {allLawyer && <DataGrid
        rows={allLawyer}
        columns={LawyerColumns()}
        pageSizeOptions={[5]}
        checkboxSelection
      />}
    </div>
    <div>변호사 회원 수 : {cntLawyer} 명 </div>
    </>)
}

export default LawyerPage