import React, { useContext, useEffect, useRef, useState } from 'react'
import Divs5 from '../Divs5/Divs5'
import { CreateContext } from '../Context/Context'
import SideBar from '../sidebar/SideBar'
import { Link, Outlet } from 'react-router-dom'
import "./Payroll.css"
import PhotoPayslip from '../Payslip/PhotoPayslip'

const Payroll = () => {
    const usecon = useContext(CreateContext)
    const [payslipPage, setpayslipPage] = useState(true)
    const [secondPageHover, setsecondPageHover] = useState(false)
    const [payslipPageHover, setpayslipPageHover] = useState(false)


    useEffect(() => {
        if (secondPageHover) {
            document.querySelector(".secondPageBefore").classList.add("PayrollLinksHover")
        } else {
            document.querySelector(".secondPageBefore").classList.remove("PayrollLinksHover")
        }
    }, [secondPageHover])
    useEffect(() => {
        if (payslipPageHover) {
            document.querySelector(".payslipPageBefore").classList.add("PayrollLinksHover")
        } else {
            document.querySelector(".payslipPageBefore").classList.remove("PayrollLinksHover")
        }
    }, [payslipPageHover])
    useEffect(() => {
        if (payslipPage) {
            document.querySelector(".payslipPageBefore").classList.add("activePage")
            document.querySelector(".secondPageBefore").classList.remove("activePage")
        } else {
            document.querySelector(".payslipPageBefore").classList.remove("activePage")
            document.querySelector(".secondPageBefore").classList.add("activePage")
        }
    }, [payslipPage])

    return (
        <div>
            <div  className={`${usecon.PayslipTable ? "flex" : "hidden"}`}>
                <PhotoPayslip />
            </div>
            <div className='flex'>
                <div>
                    <SideBar />
                </div>
                <div className='w-full'>
                    <Divs5 />
                    <div className=''>
                        
                        <div className="flex w-11/12 border-b pb-3 mb-3 border-zinc-400 mx-auto gap-3 items-center">
                            <Link onClick={() => setpayslipPage(true)} to="payslip" className={`text-decoration-none`}>
                                <div onMouseEnter={() => setpayslipPageHover(true)} onMouseLeave={() => setpayslipPageHover(false)} className={` payslipPageBefore text-xl ${payslipPage ? "OriginalColor" : "text-gray-500"} `}>Payslip</div>
                            </Link>
                            <Link onClick={() => setpayslipPage(false)} to="employeeSalary" className=' text-decoration-none'>
                                <div onMouseEnter={() => setsecondPageHover(true)} onMouseLeave={() => setsecondPageHover(false)} className={`secondPageBefore text-xl ${payslipPage ? "text-gray-500" : "OriginalColor"} `}>Employee Salary</div>
                            </Link>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payroll