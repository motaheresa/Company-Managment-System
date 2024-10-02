import React, { useContext, useEffect, useState } from 'react'
import "./ForgetPassword.css"
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { CreateContext } from '../Context/Context';
import { LuSun } from 'react-icons/lu';
import { HiOutlineMoon } from 'react-icons/hi';
import axios from 'axios';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { CiWarning } from 'react-icons/ci';
import PasswordInput from '../InputsField/InputPassword';
import { useTranslation } from "react-i18next";

const CreateNewPassword = () => {
    const {t}=useTranslation()
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const usecon = useContext(CreateContext)
    useEffect(() => {
        if (usecon.email == "") {
            navigate(-1)
        } else if (usecon.codeVerify == "") {
            navigate(-2)
        }
        // || usecon.codeVerify == ""
    }, [])
    const navigate = useNavigate()
    console.log(usecon.userId)
    const back = () => {
        navigate(-1)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (newPassword != confirmPassword) {
            setError("invalid password")
        } else if (+newPassword == +usecon.userId) {
            setError("invalid password")
        } else {
            setError("")
            axios.post("http://localhost:1813/auth/resetPassword", {
                email: usecon.email,
                newPassword: newPassword
            }).then((res) => {
                setError("")
                navigate("/")
                usecon.setSuccessLogin("Password Successfully Changed")
            }).catch((err) => {
                if (err.response.data.errors[0]) {
                    setError(err.response.data.errors[0].msg)
                } else {
                    setError(err.response.data.msg)
                    console.log(err)
                }

                // navigate("/CreateNewPassword")
            })
        }
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
            <div className={`${usecon.darkMode ? "darkContainer" : "bg-white"} w-1/3 py-12 shadow-xl px-3 h-5/6 rounded-xl`}>
                <h4 className='tracking-wider text-center OriginalColor'>{t("Verify your email address")}</h4>
                <div className='relative mt-16 w-full'>
                    <form action="" onSubmit={(e) => handleSubmit(e)}>
                        {/* <div>
                            <label className={`${usecon.darkMode && "text-white"}`} htmlFor="code">New Password</label>
                            <input placeholder='New Password...' required className={`${usecon.darkMode && "inputDark"} mt-2 w-full border rounded px-2 py-2`} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" name="" id="code" />
                        </div> */}
                        <PasswordInput value={{password:newPassword,setPassword:setNewPassword,placeholder:t("New Password")+"...",label:t("New Password"),classDiv:""}} />
                        <PasswordInput value={{password:confirmPassword,setPassword:setConfirmPassword,placeholder:t("Confirm Password")+"...",label:t("Confirm Password"),classDiv:"mt-3"}} />
                        <div className='mt-4 flex items-center gap-3'>
                            <Button type='submit' className='w-full hover:opacity-60'>
                                Reset Password
                            </Button>
                            <Button onClick={back} className='OriginalBackground NoOutlines hoverColorLight w-full'>
                                Back
                            </Button>
                        </div>
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
export default CreateNewPassword