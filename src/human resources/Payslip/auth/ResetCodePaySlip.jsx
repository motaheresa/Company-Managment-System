import axios from "axios";
import React, { useState } from "react";
import Success from "../../../Atoms/alerts/Success";
import Filled from "../../../Atoms/alerts/Filled";
import apiAuth from "../../../Atoms/apiAuth";
import { useNavigate } from "react-router";
import EyePassword from "../../../Atoms/alerts/EyePassword";

const ResetCodePaySlip = () => {
  const [IsPasswordAppeared,setIsPasswordAppeared]=useState(false)
    const navigate=useNavigate()
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    code: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1813/hr/reset-password",formData, apiAuth(token))
      .then((res) => {
        console.log(res.data);
        setStatus("Success");
        const timer=setTimeout(()=>{
          navigate("/hr/payslip")
        },1000)
        return ()=>clearTimeout(timer)
      })
      .catch((err) => {
        setStatus("Failed");
        console.log(err);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      {status == "Success" && (
        <Success
          message="Request Completed Successfully"
          setMessage={setStatus}
        />
      )}
      {status == "Failed" && (
        <Filled message="Error : Something went wrong" setMessage={setStatus} />
      )}
      <div
        className={` duration-200 bg-opacity-60 z-50 left-0 top-0 bg-gray-300 h-screen w-screen`}
      >
        <form
          onSubmit={handleSubmit}
          className={`bg-white absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 px-6 rounded-lg py-2 m-auto w-2/5`}
        >
          <div className="py-4 space-y-2 px-2 space-y-6 relative gap-3">
            <div>
              <label htmlFor="">Verfication Code</label>
            <input
              required
              value={formData.code}
              name="code"
              onChange={handleChange}
              className="w-full text-lg h-full border-b outline-none px-2 py-1"
              type="text"
              placeholder="Enter Your Code..."
            />
            </div>
            
            <div className="relative space-y-2">
            <label htmlFor="">New Password</label>
            <input
              required
              value={formData.password}
              name="password"
              onChange={handleChange}
              className="w-full text-lg h-full border-b outline-none px-2 py-1"
              type={IsPasswordAppeared?"text":"password"}
              placeholder="Enter New Password..."
            />
            <EyePassword IsPasswordAppeared={IsPasswordAppeared} setIsPasswordAppeared={setIsPasswordAppeared} />
            </div>
            <div className="flex gap-3 items-center relative pt-4 pb-1 justify-center">
              <button
                className="borderBackgroundHover w-24 px-6 py-1 text-white text-lg rounded-lg"
                type="submit"
              >
                Submit
              </button>
              <button
                className="borderBackground w-24 px-6 py-1  text-lg rounded-lg"
                type="button"
                onClick={()=>navigate(-1)}
              >
                Back
              </button>
              {/* </Link> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetCodePaySlip;
