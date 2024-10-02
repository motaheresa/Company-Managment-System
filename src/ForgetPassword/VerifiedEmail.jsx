import React, { useContext, useEffect, useState } from 'react'
import "./ForgetPassword.css"
import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { MdOutlineMarkEmailRead } from "react-icons/md"
import { CreateContext } from '../Context/Context';
import axios from 'axios';
import { CiWarning } from 'react-icons/ci';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { LuSun } from 'react-icons/lu';
import { HiOutlineMoon } from 'react-icons/hi';
import { useTranslation } from "react-i18next";


const VerifiedEmail = () => {
    const {t}=useTranslation()
    const [error, setError] = useState("")
    const usecon = useContext(CreateContext)
    const navigate = useNavigate()
    const back = () => {
        navigate(-1)
    }
    useEffect(() => {
        if (usecon.email == "") {
            navigate(-1)
        }
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:1813/auth/verifyResetCode", {
            email: usecon.email,
            resetCode: usecon.codeVerify.trimStart()
        }).then((res) => {
            setError("")
            navigate("/CreateNewPassword")
            console.log(res)
        }).catch((err) => {
            setError(err.response.data.msg)
            console.log(err)
            // navigate("/CreateNewPassword")
        })
        // navigate("/CreateNewPassword")
    }
    useEffect(() => {
        if (error != "") {
            setTimeout(() => {
                setError("")
            }, 7000)
        }
    }, [error])
    const CloseError = () => {
        setError("")
    }
    return (
        <div className={`${usecon.darkMode && "darkmodeBody"} fixed bg-gray-300 w-screen h-screen flex items-center justify-center`}>
            <div

                className={`px-2 py-2 w-fit absolute top-5 right-10 clockinNav ${usecon.darkMode
                    ? "bg-tranparent border"
                    : "OriginalBackground NoOutlines"
                    } rounded-lg text-white cursor-pointer text-2xl`}
            >
                {usecon.darkMode ? <div onClick={usecon.a1}><LuSun /></div> : <div onClick={usecon.a2}><HiOutlineMoon /></div>}
            </div>
            <div className={`${usecon.darkMode ? "darkContainer" : "bg-white"} w-2/5 py-6 shadow-xl px-3 h-4/6 rounded-xl`}>
                <div className='OriginalColor text-8xl text-center flex items-center justify-center w-full'>
                    <MdOutlineMarkEmailRead />
                </div>
                <h4 className={`tracking-wider text-center ${usecon.darkMode ? "text-white" : "OriginalColor"}`}>{t("Verify your email address")}</h4>
                {/* <div className="text-center lightgrayColor tracking-wider">
                    To verify your email address, enter the code number in your browser
                </div> */}
                <div className='relative mt-16 w-full'>
                    <form action="" onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label className={`${usecon.darkMode && "text-white"} text-lg`} htmlFor="code">{t("Verification Code")}</label>
                            {/* <ReactCodeInput ref={inputRef}/> */}
                            <input placeholder={t("Enter Your Code...")} required className={`${usecon.darkMode && "inputDark"} mt-1 w-full border rounded px-2 py-2`} value={usecon.codeVerify.trim()} onChange={(e) => usecon.setCodeVerify(e.target.value.trim())} type="text" name="" id="code" />
                        </div>

                        <div className='mt-4 flex items-center gap-3'>
                            <Button type='submit' className='w-full hover:opacity-60'>
                                Next
                            </Button>
                            <Button onClick={back} className='OriginalBackground NoOutlines hoverColorLight w-full'>
                                Back
                            </Button>
                        </div>
                        {/* <div className="text-center mt-4 lightgrayColor tracking-wider">
                            <span className={`${usecon.darkMode&&"text-white"}`}>if you didn't recieve a code,you can</span> <span className='border-b border-blue-500 text-blue-600 hover:text-blue-800 cursor-pointer' onClick={(e)=>resendAgain(e)}>click here</span> <span className={`${usecon.darkMode&&"text-white"}`}>to resend again.</span>
                        </div> */}
                    </form>
                </div>
                {
                    error != "" ?
                        <div className={` text-white fixed z_inde duration-200 -translate-x-1/2 bg-red-400 px-3 w-2/5 flex items-center justify-between text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}>
                            <div className='flex items-center gap-1'>
                                <div className="text-2xl cursor-pointer"><CiWarning /></div>
                                <div>{error}</div>
                            </div>
                            <div onClick={CloseError} className='text-2xl cursor-pointer'>
                                <IoIosCloseCircleOutline />
                            </div>
                        </div>
                        : ""
                }
            </div >
        </div >
    )
}
export default VerifiedEmail