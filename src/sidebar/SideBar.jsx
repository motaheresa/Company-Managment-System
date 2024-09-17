import React, { useContext, useState } from "react";
import "./SideBar.css";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { BsBoxArrowInRight } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BiSolidUserX } from "react-icons/bi";
import { Link } from "react-router-dom";
import image from "../images/naeem_logo_1024white.jpeg";
import image2 from "../images/tra.png";
import { CreateContext } from "../Context/Context";
import { BiSolidPencil } from "react-icons/bi";
import { LiaUserCheckSolid } from "react-icons/lia";
import { SlCalender } from "react-icons/sl";
import { TbLogout } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import image3 from "../images/_1024نعيم.png"

//w-11/12
const SideBar = () => {
  const [SettingSidebar, setprofileLiMenu] = useState(false);
  const [t, i18n] = useTranslation();
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.location.pathname = "/auth/login";
  };

  const usecon = useContext(CreateContext);
  
  return (
    <section
      className={` relative ${usecon.toggle && "active"}  ${
        usecon.darkMode
          ? "darkContainer"
          : "LightThemeContainer"
      } SideSec bottom-4  rounded `}
    >
      <div
        className={`py-3 h-full px-1 rounded-xl flex ${
          usecon.toggle == true && SettingSidebar == false ? "gap-11" : "gap-9"
        } ${
          usecon.toggle == true && SettingSidebar == true ? "gap-4" : "gap-9"
        } flex-col `}
      >
        {/* <Link to="/mainPage"> */}
        {localStorage.getItem("i18nextLng") == "en-US" ||
        localStorage.getItem("i18nextLng") == "en" ? (
          usecon.darkMode ? (
            <div className="flex items-center justify-center  pt-3">
              <img src={image2} alt="" className="w-28 mt-4 p-2" />
            </div>
          ) : (
            <div className="flex items-center justify-center pt-3">
              <img src={image} alt="" className="w-28 mt-4" />
            </div>
          )
        ) : (
          <div className="flex items-center justify-center pt-3">
            <img src={image3} alt="" className="w-28 mt-4" />
          </div>
        )}
        {/* </Link> */}
        <Link to="/mainPage" className="text-decoration-none">
          <div title="Dashboard" className="hoverColor flex items-center justify-between px-2 duration-200 rounded py-1">
            <div className="flex items-center gap-3">
              <span
                className={`${
                  usecon.darkMode
                    ? "bg-icon-sidebar text-white"
                    : "bg-white icon"
                } OriginalColor  px-2 text-xl py-2  rounded-lg text-zinc-500`}
              >
                <AiOutlineHome />
              </span>
              <div
                className={`${
                  usecon.darkMode
                    ? "text-white"
                    : "text-zinc-600"
                } text-lg tracking-wider`}
              >
                {t("dashboard")}
              </div>
            </div>
            <div className={`OriginalColor arrow `}>
              <IoIosArrowForward />
            </div>
          </div>
        </Link>
        <Link to="/attendence" className="text-decoration-none">
          <div title="My Attendance" className="hoverColor flex items-center justify-between px-2 duration-200 rounded py-1">
            <div className="flex items-center gap-3">
              <span
                className={`OriginalColor ${
                  usecon.darkMode
                    ? "bg-icon-sidebar text-white"
                    : "bg-white icon"
                } px-2 text-xl py-2 rounded-lg text-zinc-500`}
              >
                <LiaUserCheckSolid />
              </span>
              <div
                className={`${
                  usecon.darkMode
                    ? "text-white"
                    : "text-zinc-600"
                }  text-lg  tracking-wider`}
              >
                {t("attendanceside")}
              </div>
            </div>
            <div className={`OriginalColor arrow `}>
              <IoIosArrowForward />
            </div>
          </div>
        </Link>
        <Link to="/dashboard/applyLeave" className="text-decoration-none">
          <div
          title="My Leaves"
            className={`hoverColor flex items-center justify-between px-2 duration-200 rounded py-1 `}
          >
            <div className="flex items-center gap-3">
              <span
                className={`OriginalColor ${
                  usecon.darkMode
                    ? "bg-icon-sidebar text-white"
                    : "bg-white icon"
                } px-2 text-xl py-2  rounded-lg text-zinc-500`}
              >
                <BiSolidUserX />
              </span>
              <div
                className={`${
                  usecon.darkMode
                    ? "text-white"
                    : "text-zinc-600"
                }  text-lg  tracking-wider`}
              >
                {t("leaveside")}
              </div>
            </div>
            <div className={`OriginalColor arrow `}>
              <IoIosArrowForward />
            </div>
          </div>
        </Link>
        <Link to="/profile" className="text-decoration-none">
          <div title="Profile" className="hoverColor flex items-center justify-between px-2 duration-200 rounded py-1">
            <div className="flex items-center gap-3">
              <span
                className={`OriginalColor ${
                  usecon.darkMode
                    ? "bg-icon-sidebar text-white"
                    : "bg-white icon"
                } px-2 text-xl py-2  rounded-lg text-zinc-500`}
              >
                <BiSolidUserCircle />
              </span>
              <div
                className={`${
                  usecon.darkMode
                    ? "text-white"
                    : "text-zinc-600"
                }  text-lg  tracking-wider`}
              >
                {t("profileside")}
              </div>
            </div>
            <div className={`OriginalColor arrow `}>
              <IoIosArrowForward />
            </div>
          </div>
        </Link>
        {/* </Link> */}
        <Link to="/calender" className="text-decoration-none">
          <div title="Calendar" className="hoverColor flex items-center justify-between px-2 duration-200 rounded py-1">
            <div className="flex items-center gap-3">
              <span
                className={`OriginalColor  px-2 text-xl py-2 ${
                  usecon.darkMode
                    ? "bg-icon-sidebar text-white"
                    : "bg-white icon"
                } rounded-lg text-zinc-500`}
              >
                <SlCalender />
              </span>
              <div
              
                className={`${
                  usecon.darkMode
                    ? "text-white"
                    : "text-zinc-600"
                } text-lg`}
              >
                {t("calendarside")}
              </div>
            </div>
            <div className={`OriginalColor arrow `}>
              <IoIosArrowForward />
            </div>
          </div>
        </Link>
        <div
          onClick={() => setprofileLiMenu(!SettingSidebar)}
          className="relative hoverColor flex items-center justify-between px-2 duration-200 rounded py-1"
        >
          <div title="Settings" className="flex items-center gap-3">
            <span
              className={`${
                usecon.darkMode
                  ? "bg-icon-sidebar text-white"
                  : "bg-white icon"
              } OriginalColor  px-2 text-xl py-2  rounded-lg text-zinc-500`}
            >
              <CiSettings />
            </span>
            <div
              className={`${
                usecon.darkMode
                  ? "text-white"
                  : "text-zinc-600"
              }  text-lg  tracking-wider`}
            >
              {t("settingside")}
            </div>
          </div>
          <div className={`OriginalColor arrow `}>
            <IoIosArrowForward />
          </div>
        </div>
        <div
          className={`${
            SettingSidebar == true && usecon.toggle == false ? "flex" : "hidden"
          } px-2 pb-3 SettingsListSideBar flex-col gap-2`}
        >
          <div>
            <Link to="/resetPassword" className="text-decoration-none">
              <div
                className={`${
                  usecon.darkMode
                    ? "text-white"
                    : "OriginalColor"
                } hover:opacity-70 duration-300 flex justify-between items-center`}
              >
                <span>{t("Change Password")}</span>
                <span title="Change Password">
                  <BiSolidPencil />
                </span>
              </div>
            </Link>
          </div>
          {/* <div>
            <Link to="/forgetPassword" className="text-decoration-none">
              <div
              title="Forgetten Password"
                className={`${
                  usecon.darkMode
                    ? "text-white"
                    : "OriginalColor"
                } hover:opacity-70 duration-300 flex justify-between items-center`}
              >
                <span>Forgotten Password</span>
                <span>
                  <RiLockPasswordLine />
                </span>
              </div>
            </Link>
          </div> */}
          <div>
            <div
              onClick={handleLogout}
              className="cursor-pointer text-decoration-none"
            >
              <div
              title="Logout"
                className={`${
                  usecon.darkMode
                    ? "text-white"
                    : "OriginalColor"
                } hover:opacity-70 duration-300 flex justify-between items-center`}
              >
                <span>{t("Logout")}</span>
                <span>
                  <TbLogout />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            SettingSidebar && usecon.toggle == true ? "flex" : "hidden"
          } px-2 pb-3 SettingsListSideBar flex-col gap-2`}
        >
          <div>
            <Link to="/resetPassword" className="text-decoration-none">
              <div
              title="Reset Password"
                className={`OriginalColor  px-2 text-lg py-2 ${
                  usecon.darkMode
                    ? "bg-icon-sidebar text-white"
                    : "bg-white icon"
                } rounded-lg `}
              >
                <span>
                  <BiSolidPencil />
                </span>
              </div>
            </Link>
          </div>
          <div>
            <Link to="/forgetPassword" className="text-decoration-none">
              <div
              title="Forgetten Password"
                className={`OriginalColor  px-2 text-lg py-2 ${
                  usecon.darkMode
                    ? "bg-icon-sidebar text-white"
                    : "bg-white icon"
                } rounded-lg `}
              >
                <span >
                  <RiLockPasswordLine />
                </span>
              </div>
            </Link>
          </div>
          <div>
            <div
              onClick={handleLogout}
              className="cursor-pointer text-decoration-none"
            >
              <div
              title="Logout"
                className={`OriginalColor  px-2 text-lg py-2 ${
                  usecon.darkMode
                    ? "bg-icon-sidebar text-white"
                    : "bg-white icon"
                } rounded-lg `}
              >
                <span>
                  <TbLogout />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => usecon.setToggle(!usecon.toggle)}
        className="toggle"
      ></div>
    </section>
  );
};

export default SideBar;
