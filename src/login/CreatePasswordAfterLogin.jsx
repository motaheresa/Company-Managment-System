import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Form } from "react-bootstrap";
import image from "../images/naeem_logo_1024white.png"
import image2 from "../images/tra.png";
import { useInRouterContext, useNavigate } from "react-router-dom";
import axios from "axios";
import { CreateContext } from "../Context/Context";
import { LuSun } from "react-icons/lu"
import { HiOutlineMoon } from "react-icons/hi"
import { CiWarning } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import PasswordInput from "../InputsField/InputPassword";


const CreatePasswordAfterLogin = () => {
    const navigate = useNavigate()
    const usecon = useContext(CreateContext)
    const [newPassword, setnewPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [Accept, setAccept] = useState(false)
    const [flag, setflag] = useState(true)
    const [errorLogin, setErrorLogin] = useState("")

    useEffect(() => {
        if (usecon.CHECK_IF_LOGIN) {
            navigate("/auth/login")
        }
    }, [])
    const Submit = (e) => {
        setAccept(true)
        e.preventDefault()
        if (newPassword != confirmPassword) {
            setflag(false)
            setErrorLogin("Error new password does not match confirm password")
            setTimeout(() => {
                setAccept(false)
            }, 5000)
        }
        else if (newPassword == usecon.userId) {
            setflag(false)
            setErrorLogin("Error cannot enter password such as ID")
            setTimeout(() => {
                setAccept(false)
            }, 5000)
        }
        else {
            setflag(true)
            setErrorLogin("")
        }
        if (flag && errorLogin == "") {
            axios.post("http://localhost:3005/auth/setPassword", {
                newPassword: newPassword,
                userId: usecon.userId,
                confirmPassword: confirmPassword
            }).then((res) => {
                setAccept(false)
                if (res.status == 200) {
                    console.log(res)
                    setErrorLogin("")
                    const token = res.data.token
                    localStorage.setItem("token", token)
                    const userDetails = res.data.user
                    usecon.setauth({ token, userDetails })
                    navigate("/")
                    alert("Password reset sucessfully")
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    return (
        <section className={`${usecon.darkMode && "darkmodeBody"} h-screen flex justify-center items-center login-section`}>
            <div

                className={`px-2 py-2 w-fit absolute top-5 right-10 clockinNav ${usecon.darkMode
                    ? "bg-tranparent border"
                    : "OriginalBackground NoOutlines"
                    } rounded-lg text-white cursor-pointer text-2xl`}
            >
                {usecon.darkMode ? <div onClick={usecon.a1}><LuSun /></div> : <div onClick={usecon.a2}><HiOutlineMoon /></div>}
            </div>
            <div className={`login ${usecon.darkMode ? "darkContainer" : "bg-white"} relative z-10 rounded-xl shadow-xl`}>
                <form onSubmit={(e) => Submit(e)} action="" method="">
                    {usecon.darkMode ? (
                        <div className="flex items-center justify-center  pt-3">
                            <img src={image2} className="w-32 mx-auto h-32 rounded" alt="" />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center pt-3">
                            <img src={image} className="w-32 mx-auto h-32 rounded" alt="" />
                        </div>
                    )}
                    <div className="mb-4 space-y-1 mt-8">
                        {/* <label className={`LabelLogin ${usecon.darkMode && "text-white"}`} htmlFor="inputPassword5">
                            New Password
                        </label>
                        <input
                            placeholder="Enter New Password"
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            value={newPassword}
                            onChange={(e) => setnewPassword(e.target.value)}
                            required
                            className={`${usecon.darkMode && "inputDark"} py-1.5 px-2 border rounded-lg w-full`}
                        /> */}
                        <PasswordInput value={{ password: newPassword, setPassword: setnewPassword, placeholder: "Enter New Password", label: "New Password", classDiv: "mb-4 space-y-1 mt-8" }} />
                        {
                            errorLogin !== "" && Accept ?
                                <div className={` text-white fixed duration-200 -translate-x-1/2 bg-red-400 px-3 w-2/5 flex items-center justify-between text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}>
                                    <div className='flex items-center gap-1'>
                                        <div className="text-2xl cursor-pointer"><CiWarning /></div>
                                        <div>{errorLogin}</div>
                                    </div>
                                    <div onClick={() => setAccept(false)} className='text-2xl cursor-pointer'>
                                        <IoIosCloseCircleOutline />
                                    </div>
                                </div>
                                : ""
                        }
                    </div>
                    {/* <div className="my-4 space-y-1">
                        <label className={`LabelLogin ${usecon.darkMode && "text-white"}`} htmlFor="inputPassword5">
                            Confirm Password
                        </label>
                        <input
                            placeholder="Enter Confirm Password"
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            value={confirmPassword}
                            onChange={(e) => setconfirmPassword(e.target.value)}
                            required
                            className={`${usecon.darkMode && "inputDark"} py-1.5 px-2 border rounded-lg w-full`}
                        />

                    </div> */}
                    <PasswordInput value={{ password: confirmPassword, setPassword: setconfirmPassword, placeholder: "Enter Confirm Password", label: "Confirm Password", classDiv: "mb-3 space-y-1" }} />
                    <div className="py-4 ">
                        <div className="flex items-center gap-2">

                            <button
                                style={{ fontSize: "20px" }}
                                className="text-white text-center w-1/2 flex relative items-center justify-between btnLogin duration-200 px-2 py-2 rounded-lg hover:opacity-70 OriginalBackground mx-auto "
                                type="submit"
                            >
                                <span className="text-center text-xl w-full">Login</span>

                            </button>
                            <div
                                style={{ fontSize: "20px" }}
                                className="text-white text-center w-1/2 flex relative items-center justify-between btnLogin duration-200 px-2 py-2 rounded-lg hover:opacity-70 OriginalBackground mx-auto "
                                type="submit"
                            >
                                <span onClick={() => navigate(-1)} className="text-center text-xl w-full">Back</span>

                            </div>

                        </div>
                        {/* <div className="py-4 ">
                        <Form.Group>
                            <button
                                style={{ fontSize: "20px" }}
                                className="text-white text-center w-1/2 borderBackgroundHover flex relative items-center justify-between btnLogin duration-200 px-2 py-2 rounded-lg  OriginalBackground mx-auto "
                                type="submit"
                            >
                                <span className={`text-center text-xl w-full `}>Login</span>
                            </button>
                        </Form.Group> */}
                        {/* </div> */}
                    </div>
                </form>
            </div>
        </section >
    );
};

export default CreatePasswordAfterLogin;


