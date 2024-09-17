import React, { useContext, useEffect, useRef } from 'react'
import { Table } from 'react-bootstrap'
import image from "../images/naeem_logo_1024white.png"
import { HiMiniXMark } from 'react-icons/hi2'
import { CreateContext } from '../Context/Context'
import "./Payslip.css"
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { HiOutlineDownload } from "react-icons/hi"
import { AiOutlinePrinter } from "react-icons/ai"
import { useReactToPrint } from 'react-to-print'



const PhotoPayslip = () => {
    const TableHeader = [["Name", "Title", "Location"], ["Month", "Bank", "Currency"]]
    const TableData = [
        ["N/A", "N/A", "N/A"],
        ["N/A", "N/A", "N/A"],
        ["N/A", "N/A", "N/A"]
    ]
    const info2 = ["Basic Salary", "Transportation Allowance", "Gross Income"]
    const info3 = ["Refunded Amounts", "Emp. Social Insurance", "Tax", "Mobile",
        "Loans/S.Insurance", "Medical Insurance", "Amount in Advance", "Lateness", "Absence", "Penalties",
        "Premium Card", "Total Deductions", "Net Pay", "Final Net pay"]
    const infoData3 = ["N/A", "N/A", "N/A", "N/A",
        "N/A", "N/A", "N/A", "N/A", "N/A", "N/A",
        "N/A", "N/A", "N/A", "N/A"]
    const usecon = useContext(CreateContext)
    const pdfRef = useRef()
    const downloadPdf = () => {
        const input = pdfRef.current
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4", true);
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const pdfWidth = pdf.internal.pageSize.getWidth();
            // const pdfHeight = imgHeight;
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 0;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save("Naeem.pdf")
        })
    }
    const handlePrint = useReactToPrint({
        content: () => pdfRef.current
    })
    return (
        <div className={`${usecon.PayslipTable ? "flex" : "hidden"}  fixed bg-gray-300 bg-opacity-60 w-screen h-screen z-40`}>
            <div className={` bg-white shadow w-3/5 px-10 relative rounded-xl my-2 mx-auto`}>
                <div onClick={usecon.PayslipFuncHide} className={`borderBackground border cursor-pointer absolute right-6 top-6 text-2xl rounded-lg `}>
                    <HiMiniXMark />
                </div>
                <div className='absolute left-24  top-4'>
                    <button className={`border px-1 py-1 rounded-md my-2 flex items-center gap-2`} onClick={downloadPdf}>
                        <span>Download</span>
                        <span className={`OriginalColor text-xl`}>
                            <HiOutlineDownload />
                        </span>
                    </button>
                </div>
                <div className='absolute left-56  top-4'>
                    <button className={` border px-1 py-1 rounded-md my-2 flex items-center gap-2`} onClick={handlePrint} >
                        <span>Print</span>
                        <div className={`OriginalColor text-xl`}>
                            <AiOutlinePrinter />
                        </div>
                    </button>
                </div>

                <div ref={pdfRef} className='w-11/12  py-6 px-4 mx-auto mt-3'>
                    <div className="flex items-center justify-between my-4">
                        <h4 className='tracking-wider OriginalColor'>My Payslip</h4>
                        <div>
                            <img className='w-20' src={image} alt="" />
                        </div>
                    </div>

                    <Table bordered className=''>
                        <tr>
                            <div className="grid grid-cols-2">
                                <td>

                                    <Table className=''>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className={` grid grid-cols-2`}>
                                                        <div>
                                                            {
                                                                TableHeader[0].map((headers) => (
                                                                    <div>
                                                                        {
                                                                            <div>{headers}: </div>
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                        <div>

                                                            {
                                                                TableData[0].map((headers) => (
                                                                    <div>
                                                                        {
                                                                            <div>{headers} </div>
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className={`bg-gray-300 OriginalColor w-full  flex items-center justify-between py-1 shadow-lg rounded-lg px-2 font-medium`}>
                                                        <div>
                                                            income
                                                        </div>
                                                        <div>
                                                            Amount
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className={` flex items-center justify-between`}>
                                                        <div>
                                                            {
                                                                info2.map((oneinfo) => (
                                                                    <div>{oneinfo}: </div>
                                                                ))
                                                            }
                                                        </div>
                                                        <div>
                                                            {
                                                                TableData[0].map((headers) => (
                                                                    <div>
                                                                        {
                                                                            <div>{headers} </div>
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </td>

                                <td>

                                    <Table className=''>
                                        <tbody>
                                            <tr>
                                                <div className={` grid grid-cols-2`}>
                                                    <div>
                                                        {
                                                            TableHeader[1].map((headers) => (
                                                                <div>
                                                                    {
                                                                        <div>{headers}</div>
                                                                    }
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div>
                                                        {
                                                            TableData[1].map((headers) => (
                                                                <div>
                                                                    {
                                                                        <div>{headers}</div>
                                                                    }
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className={`bg-gray-300 OriginalColor w-full  flex items-center justify-between py-1 shadow-lg rounded-lg px-2 font-medium`}>
                                                        <div>
                                                            Deductions
                                                        </div>
                                                        <div>
                                                            Amount
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className={` flex items-center justify-between`}>
                                                        <div className='w-full'>
                                                            {
                                                                info3.map((oneinfo) => (
                                                                    <div>{oneinfo}: </div>
                                                                ))
                                                            }
                                                        </div>

                                                        <div className={``}>
                                                            {
                                                                infoData3.map((headers) => (
                                                                    <div>
                                                                        {
                                                                            <div>{headers} </div>
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </td>
                            </div>
                        </tr>
                    </Table>
                </div>
            </div>
        </div >
    )
}

export default PhotoPayslip