import React, { useContext, useEffect, useState } from "react";
import "./ForgetPassword.css";
import { useRef } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { BsShieldLock } from "react-icons/bs";
import axios from "axios";
import { CreateContext } from "../Context/Context";
import { CiWarning } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuSun } from "react-icons/lu";
import { HiOutlineMoon } from "react-icons/hi";
import { useTranslation } from "react-i18next";

const ForgetPassword = () => {
  const {t}=useTranslation()
  const [error, setError] = useState("");
  const usecon = useContext(CreateContext);
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  const CloseError = () => {
    setError("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post("http://localhost:1813/auth/forgetPassword", {
        email:usecon.email,
      })
      .then((res) => {
        setError("");
        navigate("/auth/verified");
        console.log(res);
      })
      .catch((err) => {
        //
        setError(err.response.data.msg);
        console.log(err);
      });
  };
  useEffect(() => {
    if (error != "") {
      setTimeout(() => {
        setError("");
      }, 7000);
    }
  }, [error]);
  return (
    <div
      className={`fixed bg-gray-300 w-screen h-screen flex items-center justify-center ${usecon.darkMode && "darkmodeBody"
        }`}
    >
      <div

        className={`px-2 py-2 w-fit absolute top-5 right-10 clockinNav ${usecon.darkMode
          ? "bg-tranparent border"
          : "OriginalBackground NoOutlines"
          } rounded-lg text-white cursor-pointer text-2xl`}
      >
        {usecon.darkMode ? <div onClick={usecon.a1}><LuSun /></div> : <div onClick={usecon.a2}><HiOutlineMoon /></div>}
      </div>
      <div
        className={`${usecon.darkMode ? "darkContainer" : "bg-white"
          }  w-2/5 py-12 shadow-xl px-3 flex flex-col justify-center relative h-4/6 rounded-xl`}
      >
        <div className="OriginalColor text-8xl text-center flex items-center justify-center  w-full">
          <BsShieldLock />
        </div>
        <h4
          className={`tracking-wider text-center ${usecon.darkMode ? "text-white" : "OriginalColor"
            } `}
        >
         {t(" Enter your email and we will send you a code to reset your password")}
        </h4>
        <div className="relative mt-16 w-full">
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label
                className={`${usecon.darkMode && "text-white"}`}
                htmlFor="code"
              >
                {t("Email")}
              </label>
              <input
                placeholder={t("Enter Your Email...")}
                required
                className={`${usecon.darkMode && "inputDark"
                  } mt-2 w-full border rounded px-2 py-2`}
                value={usecon.email}
                onChange={(e) => usecon.setEmail(e.target.value)}
                type="email"
                name=""
                id="code"
              />
            </div>
            {/* <div className="text-center mt-4 lightgrayColor tracking-wider">
                            if you didn't recieve a code,you can <span className='border-b border-blue-500 text-blue-600 hover:text-blue-800 cursor-pointer'>click here</span> to resend again.
                        </div> */}
            <div className="mt-4 flex items-center gap-3">
              <Button type="submit" className="w-full hover:opacity-60">
                Next
              </Button>
              <Button
                onClick={back}
                className="OriginalBackground NoOutlines hoverColorLight w-full"
              >
                Back
              </Button>
            </div>
          </form>
        </div>
        {error != "" ? (
          <div
            className={` text-white fixed z_inde duration-200 -translate-x-1/2 bg-red-400 px-3 w-2/5 flex items-center justify-between text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}
          >
            <div className="flex items-center gap-1">
              <div className="text-2xl cursor-pointer">
                <CiWarning />
              </div>
              <div>{error}</div>
            </div>
            <div onClick={CloseError} className="text-2xl cursor-pointer">
              <IoIosCloseCircleOutline />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default ForgetPassword;
