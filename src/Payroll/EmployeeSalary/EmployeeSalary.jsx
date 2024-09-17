import React, { useContext, useEffect, useRef, useState } from 'react'
import { Table } from 'react-bootstrap'
import { AiOutlineEye, AiOutlinePrinter } from "react-icons/ai"
import { BiDownload, BiShareAlt } from "react-icons/bi"
import { CreateContext } from '../../Context/Context'
import { useReactToPrint } from 'react-to-print'
import axios from 'axios'
const ExcelJS = require("exceljs")



const Payslip = () => {
    const TableHeaders = ["ID", "Employee", "Role", "Salary"]
    const TableData = [
        ["###", "###", "###", "###"],
    ]
    const usecon = useContext(CreateContext)
    const [userList, setUserList] = useState([])
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users").then((res) => setUserList(res))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>

            <div className='flex'>
                <div className='w-full'>
                    <div className={`w-11/12 mx-auto px-3  py-10 ${usecon.darkMode && "borderDarkLine"} ${usecon.darkMode ? "darkContainer" : "LightThemeContainer"} rounded-xl `}>
                        <h5 className={`tracking-wider OriginalColor pb-10 ${usecon.darkMode && "text-white"}`}>Employee Salary</h5>
                        <div className='w-full'>
                            <table className={`${usecon.darkMode && "table_emp_dark"} w-full`} border={1} responsive>
                                <thead>
                                    {/* {
                                        TableHeaders.map((data) => (
                                            <th className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"} px-2 py-1.5`}>
                                                <div className={`font-normal  ${usecon.darkMode ? " text-white" : ""}`}>
                                                    {data}
                                                </div>
                                            </th>
                                        ))
                                    } */}
                                </thead>
                                <tbody>
                                    {/* {
                                        TableData.map((data) => (
                                            <tr>
                                                {
                                                    data.map((oneData) => (
                                                        <td className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"} px-2 py-1.5`}>
                                                            <div className={`${usecon.darkMode ? "text-white" : "darkgrayColor"}`}>
                                                                {oneData}
                                                            </div>
                                                        </td>
                                                    ))
                                                }
                                               

                                            </tr>
                                        ))
                                    } */}
                                </tbody>

                            </table>
                            {/* <Table className={`${usecon.darkMode && "table_emp_dark"}`} bordered >
                                <thead>
                                    {
                                        TableHeaders.map((data) => (
                                            <th>
                                                <div className={`font-normal  ${usecon.darkMode ? " text-white" : ""}`}>
                                                    {data}
                                                </div>
                                            </th>
                                        ))
                                    }
                                </thead>
                                <tbody>

                                    {
                                        TableData.map((data) => (
                                            <tr>
                                                {
                                                    data.map((oneData) => (
                                                        <td>
                                                            <div className={`${usecon.darkMode ? "lightgrayColor" : "darkgrayColor"}`}>
                                                                {oneData}
                                                            </div>
                                                        </td>
                                                    ))
                                                }
                                                <div className='flex items-center gap-1.5'>
                                                    
                                                    <div onClick={usecon.PayslipFunc} className='text-white cursor-pointer text-lg px-1.5 py-1.5 rounded bg-primary'><AiOutlineEye /></div>
                                                    
                                                    <div onClick={exportExcelFile} className='text-white cursor-pointer text-lg px-1.5 py-1.5 rounded bg-green-400'><BiDownload /></div>
                                                   
                                                    <div onClick={handlePrint} className='text-white cursor-pointer text-lg px-1.5 py-1.5 rounded bg-blue-800'>
                                                        <AiOutlinePrinter />
                                                    </div>

                                                    
                                                </div>

                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </Table> */}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Payslip