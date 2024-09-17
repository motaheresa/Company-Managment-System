import React, { useContext, useEffect, useRef, useState } from "react";
import "./TopHeadbar.css";
import { HiOutlineMoon } from "react-icons/hi2";
import { LuSun } from "react-icons/lu";
import TopHeadbarStatus from "./TopHeadbarStatus";
import LiveClock from "../atoms/LiveClock";
import { CreateContext } from "../../Context/Context";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";

const TopHeadbar = () => {
  const usecon = useContext(CreateContext);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    usecon.firstLoginFunc();
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const d = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[d.getMonth()];
  const date = d.getDate();
  const year = d.getFullYear();

  return (
    <div className="relative w-full">
      <div className=" flex items-start justify-between py-8">
        <div>{<TopHeadbarStatus />}</div>
        <div className="flex items-center gap-2 ">
          <div
            className={`bg-transparent ${
              usecon.darkMode ? "text-white" : "OriginalColor"
            } font-medium px-1.5 flex items-center  outline-none border-none`}
          >
            <span>{date + "-"}</span>
            <span>{month + "-"}</span>
            <span>{year}</span>
          </div>
          <span className={`OriginalColor pr-2 font-medium  h-full py-1`}>
            <LiveClock />
          </span>
          {/* <div
            className={` px-2 py-2 rounded-full text-white cursor-pointer text-2xl`}
          >
            <img src={logo} className="w-10 rounded-full" alt="Naeem Logo" />
          </div> */}
          <div
            onClick={() => navigate("/hr/dashboard")}
            className={`clockinNav px-2 py-2 borderBackgroundHover rounded-full text-white cursor-pointer text-2xl`}
          >
            <RxDashboard />
          </div>
          <div
            onClick={() => navigate("/hr/profile")}
            className={`clockinNav px-2 py-2 borderBackgroundHover rounded-full text-white cursor-pointer text-2xl`}
          >
            <LuUser2 />
          </div>
          {usecon.darkMode ? (
            <div
              onClick={usecon.a1}
              className={`px-2 py-2 clockinNav ${"bg-tranparent border"} rounded-full text-white cursor-pointer text-2xl`}
            >
              {<LuSun />}
            </div>
          ) : (
            <div
              onClick={usecon.a2}
              className={`px-2 py-2 clockinNav ${"OriginalBackground NoOutlines"} rounded-full text-white cursor-pointer text-2xl`}
            >
              <HiOutlineMoon />
            </div>
          )}
          <div className="relative">
            <div
              onClick={() => setIsVisible(!isVisible)}
              className={`px-2 py-2 clockinNav borderBackgroundHover rounded-full text-white cursor-pointer text-2xl`}
            >
              <IoSettingsOutline />
            </div>
            {isVisible && (
              <div
                ref={ref}
                className="absolute my-2 z-50 right-0 w-56 text-gray-500 border-1 border-solid border-gray-400 rounded py-3 text-center top-full bg-white"
              >
                <Link to="/resetPassword" className="text-decoration-none">
                  <div className="flex cursor-pointer text-gray-500 items-center py-2 px-2 justify-between hover:bg-gray-400 hover:text-white">
                    Change Password
                    <span className="text-xl OriginalColor">
                      <FaRegEdit />
                    </span>
                  </div>
                </Link>
                <Link
                  to="/auth/login"
                  className="w-full items-start text-decoration-none"
                >
                  <div className="flex cursor-pointer text-gray-500 items-center py-2 px-2 justify-between hover:bg-gray-400 hover:text-white">
                    Logout
                    <span className="text-xl OriginalColor">
                      <AiOutlineLogout />
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeadbar;
