import React, { useContext, useEffect, useState } from "react";
import "./Divs5.css";
import { BiUser } from "react-icons/bi";
import { HiOutlineMoon } from "react-icons/hi2";
import { FiClock, FiUser } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { Tooltip } from "@mui/material";
import {
  BsBoxArrowInRight,
} from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CreateContext } from "../Context/Context";
import DivsCondition from "./DivsCondition";
import { LuSettings } from "react-icons/lu";
import { LuSun } from "react-icons/lu";
import ButtonsTranlator from "../Translator/ButtonsTranlator";
import { useTranslation } from "react-i18next";

const Divs5 = () => {
  const { t } = useTranslation();
  const usecon = useContext(CreateContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [profileLiMenu, setprofileLiMenu] = useState(false);

  useEffect(() => {
    usecon.firstLoginFunc();
  }, []);
  const d = new Date();
  const weekDay = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getName = () => {
    if (usecon.user != "") {
      return (
        usecon.user.empName.toString().split(" ")[0] +
        " " +
        usecon.user.empName.toString().split(" ")[1]
      );
    }
  };
  const getPosition = () => {
    if (usecon.user != "") {
      return usecon.user.jobPost;
    }
  };

  const day = t(weekDay[d.getDay()]);
  const month = t(months[d.getMonth()]);
  const date = d.getDate();
  const year = d.getFullYear();

  // console.log(employeeName[0] + " " +employeeName[1])

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount
  // Format the time to HH:mm:ss
  const formattedTime = currentTime.toLocaleTimeString();
  return (
    <div className="relative w-full">
      <div className=" flex items-start justify-between mx-4 my-8">
        <div>{<DivsCondition />}</div>
        <div className="flex items-center gap-2 ">
          <button
            className={`${
              usecon.darkMode
                ? "borderDarkModeInoutHead"
                : "borderDarkModeInoutHead"
            }  flex items-center w-54 px-3 rounded-xl py-1`}
          >
            <span
              className={`OriginalColor pr-3 border-r ${
                usecon.darkMode ? "border-gray-500" : "border-gray-300 "
              }  h-full py-1 py-2`}
            >
              <SlCalender />
            </span>
            <div
              className={`bg-transparent ${
                usecon.darkMode ? "text-white" : "OriginalColor"
              } font-medium px-3 flex items-center  outline-none border-none`}
            >
              <span>{day + "-"}</span>
              <span>{date + "-"}</span>
              <span>{month + "-"}</span>
              <span>{year}</span>
            </div>
          </button>
          <button
            className={`${
              usecon.darkMode
                ? "borderDarkModeInoutHead"
                : "borderDarkModeInoutHead"
            } flex items-center w-40 px-3 rounded-xl py-1`}
          >
            <span
              className={`OriginalColor pr-3 border-r ${
                usecon.darkMode ? "border-gray-500" : "border-gray-300 "
              }  h-full py-1 py-2`}
            >
              <FiClock />
            </span>
            <div
              className={`bg-transparent ${
                usecon.darkMode ? "text-white" : "OriginalColor"
              } font-medium px-0.5 outline-none border-none`}
            >
              {formattedTime}
            </div>
          </button>
          <div
            className={`px-2 py-1 clockinNav ${
              usecon.darkMode
                ? "bg-tranparent border"
                : "OriginalBackground NoOutlines"
            } rounded-lg text-white cursor-pointer text-2xl`}
          >
            {<ButtonsTranlator />}
          </div>
          {/* <ButtonsTranlator /> */}
          <OverlayTrigger
            trigger="click"
            key={"bottom"}
            placement={"bottom"}
            id="pop"
            overlay={
              <Popover
                id={`popover-positioned-bottom`}
                className={`${usecon.darkMode && "popoverProfile"} `}
              >
                <div
                  as="h3"
                  className={`bg-gray-300 ${
                    usecon.darkMode && "bg-zinc-600"
                  } rounded-lg`}
                >
                  <div className="text-center flex bg-red- flex-col gap-1 pt-2 pb-3">
                    <span
                      className={`${
                        usecon.darkMode && "text-white"
                      } tracking-wider text-lg`}
                    >
                      {getName()}
                    </span>
                    <span
                      className={`${
                        usecon.darkMode ? "text-gray-200" : "text-gray-500"
                      } `}
                    >
                      {getPosition()}
                    </span>
                  </div>
                </div>
                {/* <Popover.Header className='text-center w-full' as="span">App Developer</Popover.Header> */}
                <Popover.Body>
                  <div className={`flex flex-col w-48 items-start  gap-3`}>
                    <Link to="/profile" className="text-decoration-none w-full">
                      <div
                        className={`flex items-center text-lg gap-2.5 cursor-pointer ${
                          usecon.darkMode
                            ? "hover:bg-zinc-600"
                            : "hover:bg-gray-300"
                        } w-full px-2 py-1 rounded-lg`}
                      >
                        <div className="text-primary">
                          <FiUser />
                        </div>

                        <div
                          className={`${
                            usecon.darkMode ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {t("profileside")}
                        </div>
                      </div>
                    </Link>
                    <div
                      onClick={() => setprofileLiMenu(!profileLiMenu)}
                      className={`flex items-center text-lg gap-2.5 cursor-pointer ${
                        usecon.darkMode
                          ? "hover:bg-zinc-600"
                          : "hover:bg-gray-300"
                      } w-full px-2 py-1 rounded-lg`}
                    >
                      <div className="text-orange-500">
                        <LuSettings />
                      </div>
                      <div
                        className={`${
                          usecon.darkMode ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {t("settingside")}
                      </div>
                    </div>
                    <ul
                      className={`${
                        profileLiMenu ? "ShowProfileMenu" : "HideProfileMenu"
                      } SettingsListSideBar ${
                        profileLiMenu && "flex"
                      } flex-col gap-3`}
                    >
                      <li>
                        <Link
                          to="/resetPassword"
                          className="text-decoration-none"
                        >
                          <div className="hover:opacity-70 duration-300 flex justify-between items-center resetPasswordSideBar">
                            <span
                              className={`${
                                usecon.darkMode ? "text-white" : "text-gray-500"
                              }`}
                            >
                              {t("Change Password")}
                            </span>
                            <span
                              className={`${
                                usecon.darkMode ? "text-white" : "text-gray-500"
                              }`}
                            >
                              <BsBoxArrowInRight />
                            </span>
                          </div>
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/forgetPassword"
                          className="text-decoration-none"
                        >
                          <div className=" hover:opacity-70 duration-300 flex items-center justify-between gap-3 resetPasswordSideBar">
                            <span
                              className={`${
                                usecon.darkMode ? "text-white" : "text-gray-500"
                              }`}
                            >
                              Forgotten Password
                            </span>
                            <span
                              className={`${
                                usecon.darkMode ? "text-white" : "text-gray-500"
                              }`}
                            >
                              <BiSolidPencil />
                            </span>
                          </div>
                        </Link>
                      </li> */}
                    </ul>
                    <Link
                      to="/auth/login"
                      className="w-full items-start text-decoration-none"
                    >
                      <div
                        className={`flex items-center text-lg gap-2.5 cursor-pointer ${
                          usecon.darkMode
                            ? "hover:bg-zinc-600"
                            : "hover:bg-gray-300"
                        } w-full px-2 py-1 rounded-lg`}
                      >
                        {/* <div className="flex items-center text-lg gap-2.5 cursor-pointer hover:bg-gray-300 w-full px-2 py-1 rounded-lg"> */}
                        <div className="text-danger">
                          <RiLogoutCircleLine />
                        </div>

                        <div
                          className={`${
                            usecon.darkMode ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {t("Logout")}
                        </div>
                        {/* </div> */}
                      </div>
                    </Link>
                  </div>
                </Popover.Body>
              </Popover>
            }
          >
            {/* <Button> */}
            <Tooltip title="View Profile">
              <div
                className={`px-2 py-2 clockinNav ${
                  usecon.darkMode
                    ? "bg-tranparent border"
                    : "OriginalBackground NoOutlines"
                } duration-200  rounded-lg text-white cursor-pointer text-2xl`}
              >
                <BiUser />
              </div>
            </Tooltip>
            {/* </Button> */}
          </OverlayTrigger>
          {usecon.darkMode ? (
            <div
              onClick={usecon.a1}
              className={`px-2 py-2 clockinNav ${"bg-tranparent border"} rounded-lg text-white cursor-pointer text-2xl`}
            >
              {<LuSun />}
            </div>
          ) : (
            <div
              onClick={usecon.a2}
              className={`px-2 py-2 clockinNav ${"OriginalBackground NoOutlines"} rounded-lg text-white cursor-pointer text-2xl`}
            >
              <HiOutlineMoon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Divs5;
