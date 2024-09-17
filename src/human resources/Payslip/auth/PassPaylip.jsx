import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateContext } from "../../../Context/Context";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { PaylsipAuthManagement } from "../../../Context/hr/PayslipAuthCon";
import EyePassword from "../../../Atoms/alerts/EyePassword";

const PassPaylip = () => {
  const [IsPasswordAppeared,setIsPasswordAppeared]=useState(false)
  const usecon = useContext(CreateContext);
  const {password,setPassword,setIsSubmitted}=useContext(PaylsipAuthManagement);
  const ref = useRef(null);
  const navigate=useNavigate(null)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    navigate("/hr/payslip")
  };
  const handleChange=(e)=>{
    setPassword(e.target.value)
  }

  return (
    
    <div
      className={`fixed duration-200 bg-opacity-60 z-50 left-0 top-0 bg-gray-300 h-screen w-screen`}
    >
      <form
        onSubmit={handleSubmit}
        className={`bg-white absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 px-6 rounded-lg py-2 m-auto w-2/5`}
      >
        <span
          onClick={() => navigate("/hr/dashboard")}
          className="absolute top-2 right-2 text-2xl cursor-pointer text-red-400 hover:text-red-700"
        >
          <IoIosCloseCircleOutline />
        </span>
        <div className="py-4 px-2 relative gap-3">
          <div className="relative">
          <input
            required
            value={password}
            onChange={handleChange}
            ref={ref}
            className="focus:border-orange-500 w-full  focus:!border-b-2 outline-none border-b border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2"
            type={IsPasswordAppeared?"text":"password"}
            placeholder="Enter Your Password..."
          />
          <EyePassword IsPasswordAppeared={IsPasswordAppeared} setIsPasswordAppeared={setIsPasswordAppeared} />
          </div>
          <div className="flex items-center relative pt-4 pb-1 justify-center">
            <button
              className="borderBackgroundHover w-fit px-6 py-1 text-white text-lg rounded-lg"
              type="submit"
            >
              Submit
            </button>
            <span
              className={`${
                usecon.darkMode && "text-white"
              } border-b pb-1 border-orange-600 absolute right-0`}
            >
              <Link
                to="/hr/reset-code-payslip"
                className="text-decoration-none OriginalColor"
              >
                Forgotten Password?
              </Link>
            </span>
            {/* </Link> */}
          </div>
        </div>
      </form>
    </div>
    // </PayslipAuthCon>
  );
};

export default PassPaylip;
