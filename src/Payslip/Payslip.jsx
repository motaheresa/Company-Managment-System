import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Payslip.css"
import { Table } from 'react-bootstrap'
import { AiOutlineEye, AiOutlinePrinter } from "react-icons/ai"
import { BiDownload, BiShareAlt } from "react-icons/bi"
import { CreateContext } from '../Context/Context'
import axios from 'axios'
import { MdKeyboardArrowRight } from "react-icons/md"
import { useReactToPrint } from 'react-to-print'

const ExcelJS = require("exceljs")



const Payslip = () => {
    const Headersdata = [
        "Leave Type", "Applied on", "Start Date", "End Date", "Total Days", "Leave Reason"
        , "Status"
    ]
    const AllData = [
        {
            "leavetype": "Casual Leave",
            "Applied ON": "Mar 4,2023",
            "Start Date": "May 5,2023",
            "End Date": "May 7,2023",
            "Total Days": "3",
            "Leave Reason": "Lorem ispumm or Libsum",
            "Status": "Rejected",
        },
        // {
        //     "leavetype": "Medical Leave",
        //     "Applied ON": "Mar 4,2023",
        //     "Start Date": "May 5,2023",
        //     "End Date": "May 7,2023",
        //     "Total Days": "3",
        //     "Leave Reason": "Lorem ispumm or Libsum",
        //     "Status": "Approved",
        // },
        // {
        //     "leavetype": "Casual Leave",
        //     "Applied ON": "Mar 4,2023",
        //     "Start Date": "May 5,2023",
        //     "End Date": "May 7,2023",
        //     "Total Days": "3",
        //     "Leave Reason": "Lorem ispumm or Libsum",
        //     "Status": "Pending",
        // }
    ]
    const [eye, setEyeTable] = useState(false);
    const usecon = useContext(CreateContext)
    const printRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => printRef.current
    })
    const [userList, setUserList] = useState([])
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users").then((res) => setUserList(res))
            .catch((err) => console.log(err))
    }, [])
    const exportExcelFile = () => {
        const workBook = new ExcelJS.Workbook();
        const sheet = workBook.addWorksheet("My Sheet")
        sheet.properties.defaultRowHeight = 30
        sheet.getRow(1).font = {
            name: "Comic Sans MS",
            family: 4,
            size: 11,
            bold: true,

        }

        sheet.columns = [
            {
                header: "Name",
                key: "name",
                width: 20
            },
            {
                header: "Phone",
                key: "phone",
                width: 40
            },
            {
                header: "Email",
                key: "email",
                width: 40
            },
            {
                header: "Address",
                key: "address",
                width: 30
            }
        ]
        userList.data.map((oneData) => {
            sheet.addRow({
                id: oneData.id,
                phone: oneData.phone,
                email: oneData.email,
                name: oneData.username,
                address: oneData.address.city
            })
        })
        workBook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet"
            })
            const url = window.URL.createObjectURL(blob)
            const anchor = document.createElement("a")
            anchor.href = url
            anchor.download = "NaeemDownload.xlsx"
            anchor.click()
            window.URL.revokeObjectURL(url)
        })
    }
    // const pdfRef = useRef()
    // const downloadPdf = () => {
    //     const input = pdfRef.current
    //     html2canvas(input).then((canvas) => {
    //         const imgData = canvas.toDataURL("image/png");
    //         const pdf = new jsPDF("p", "mm", "a4", true);
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = pdf.internal.pageSize.getHeight();
    //         const imgWidth = canvas.width;
    //         const imgHeight = canvas.height;
    //         const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    //         const imgX = (pdfWidth - imgWidth * ratio) / 2;
    //         const imgY = 30;
    //         pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    //         pdf.save("invoice.pdf")
    //     })
    // }
    return (
        <div>
            <div className='flex'>
                <div>
                    {/* <SideBar /> */}
                </div>
                <div className='w-full'>
                    <div className={`w-11/12 mx-auto px-3  py-10 ${usecon.darkMode && "borderDarkLine"} ${usecon.darkMode ? "darkContainer" : "LightThemeContainer"} rounded-xl `}>
                        <h5 className={`tracking-wider OriginalColor pb-10 ${usecon.darkMode && "text-white"}`}>My Payslips</h5>
                        <div className='w-full'>
                            <table ref={printRef} className={`${usecon.darkMode && "table_emp_dark"} w-full`} border={1} responsive>
                                <thead>
                                    <tr>
                                        {/* {
                                            Headersdata.map((one) => (
                                                <td className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"} px-2 py-1.5`}>
                                                    <div className={`${usecon.darkMode && "text-white"}`}>
                                                        {one}
                                                    </div>
                                                </td>
                                            ))
                                        } */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {
                                        AllData.map((data) => (
                                            <tr>
                                                <td className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"} px-2 py-1.5`}>
                                                    <div className={`${usecon.darkMode && "text-white"}`}>
                                                        {data.leavetype}
                                                    </div>
                                                </td>
                                                <td className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"} px-2 py-1.5`}>
                                                    <div className={`${usecon.darkMode && "text-white"}`}>
                                                        {data['Applied ON']}
                                                    </div>
                                                </td>
                                                <td className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"} px-2 py-1.5`}>
                                                    <div className={`${usecon.darkMode && "text-white"}`}>
                                                        {data['Start Date']}
                                                    </div>
                                                </td>
                                                <td className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"} px-2 py-1.5`}>
                                                    <div className={`${usecon.darkMode && "text-white"}`}>
                                                        {data['End Date']}
                                                    </div>
                                                </td>
                                                <td className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"} px-2 py-1.5`}>
                                                    <div className={`${usecon.darkMode && "text-white"}  w-full`}>
                                                        {data['Total Days']}
                                                    </div>
                                                </td>
                                                <td className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"} px-2 py-1.5`}>
                                                    <div className={`${usecon.darkMode && "text-white"}  w-full`}>
                                                        {data['Leave Reason']}
                                                    </div>
                                                </td>
                                                <td className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"} px-2 py-1.5`}>
                                                    <div className='flex items-center gap-1.5'>
                                                        <div onClick={usecon.PayslipFunc} className='text-white cursor-pointer text-lg px-1.5 py-1.5 rounded bg-primary'><AiOutlineEye /></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    } */}
                                </tbody>


                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payslip