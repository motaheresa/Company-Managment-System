import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CreateContext } from '../Context/Context';
import "./ResetPassword.css"
import axios from 'axios';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { CiWarning } from 'react-icons/ci';
import { LuSun } from 'react-icons/lu';
import { HiOutlineMoon } from 'react-icons/hi';
import PasswordInput from '../InputsField/InputPassword';
import { useTranslation } from "react-i18next";

const ResetPasword = () => {
    const {t}=useTranslation()
    const usecon = useContext(CreateContext)
    const [changedPass, set_pass] = useState("")
    const [con_pass, set_con_pass] = useState("")
    const [currentPass, set_curr_pass] = useState("")
    const [accept, setAccept] = useState(false)
    const [error, setError] = useState("")
    const [userId, setUserId] = useState("")
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:3005/dashboard/userDetails", {
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token,
            },
        }).then((res) => setUserId(res.data.user.userId))
    }, [])
    const resetPassword = (e) => {
        console.log(userId)
        e.preventDefault()
        if (changedPass != con_pass) {
            setAccept(true)
            setError("Passwords Do Not Match")
            setTimeout(() => {
                setError("")
            }, 7000)
        } else {
            setAccept(false)
            axios.patch("http://localhost:3005/auth/changePassword", {
                changedPass,
                con_pass,
                currentPass,
                userId: userId
            },
                {
                    headers: {
                        Accept: "Application/json",
                        Authorization: "Bearer " + token
                    }
                }).then((res) => {
                    usecon.setSuccessLogin("Password Successfully Changed")
                    navigate("/auth/login")
                }).catch((err) => {
                    setError("Incorrect Current Password")
                    console.log(err)
                    setTimeout(() => {
                        setError("")
                    }, 7000)
                })
        }
    }
    const CloseError = () => {
        setError("")
    }
    const handleClose=()=>{
        navigate(-1)
    }
    return (
        <div className={`${usecon.darkMode ? "darkmodeBody" : "bg-gray-300"} fixed  w-screen h-screen flex items-center justify-center`}>
            <div

                className={`px-2 py-2 w-fit absolute top-5 right-10 clockinNav ${usecon.darkMode
                    ? "bg-tranparent border"
                    : "OriginalBackground NoOutlines"
                    } rounded-lg text-white cursor-pointer text-2xl`}
            >
                {usecon.darkMode ? <div onClick={usecon.a1}><LuSun /></div> : <div onClick={usecon.a2}><HiOutlineMoon /></div>}
            </div>
            {
                error != "" ?
                    <div className={` text-white fixed duration-200 -translate-x-1/2 bg-red-400 px-3 w-2/5 flex items-center justify-between text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}>
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
            <div className={` ${usecon.darkMode ? "darkContainer" : "bg-white"} w-1/3 shadow-xl py-3 px-3 h-4/5 rounded-xl`}>
                {
                    error != "" && accept == true ?
                        <div className={` text-white fixed duration-200 -translate-x-1/2 bg-red-400 px-3 w-2/5 flex items-center justify-between text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}>
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

                <div className='flex items-center justify-center mt-0 pt-0 flex-col h-full w-full'>
                    <div className="my-3">
                        <h4 className='tracking-wider text-center OriginalColor'>{t("Change Password")}</h4>
                        {/* <div className="text-center lightgrayColor tracking-wider">
                            Enter the password registered on your account
                        </div> */}
                    </div>
                    <form onSubmit={(e) => resetPassword(e)} className='flex flex-col w-full gap-4'>
                        <PasswordInput value={{password:currentPass,setPassword: set_curr_pass,placeholder:t("Enter Current Password....."),label:t("Current Password"),classDiv:"w-full space-y-2"}} />
                        <PasswordInput value={{password:changedPass,setPassword: set_pass,placeholder:t("Enter New Password....."),label:t("New Password"),classDiv:"w-full space-y-2"}} />
                        <PasswordInput value={{password:con_pass,setPassword: set_con_pass,placeholder:t("Enter Confirm Password....."),label:t("Confirm Password"),classDiv:"w-full space-y-2"}} />
                        <div>
                            <div className='text-center cursor-pointer w-full'>
                                <span className={`${usecon.darkMode && "text-white"}`} ></span> <Link to="/forgetPassword">{t("Forgotten Password")}</Link>
                            </div>
                        </div>
                        {/* </div> */}
                        <div className='flex items-center w-4/5 gap-3 my-4 mx-auto'>
                            <Button type='submit' className='w-full hover:opacity-60'>
                               Submit
                            </Button>
                            {/* <Link to=-1 className='text-decoration-none w-full'> */}
                                <Button onClick={handleClose} className='OriginalBackground NoOutlines hoverColorLight w-full'>
                                    Close
                                </Button>
                            {/* </Link> */}
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ResetPasword