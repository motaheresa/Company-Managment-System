import React, { useContext, useEffect, useRef, useState } from "react";
import { CreateContext } from "../Context/Context";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import image1 from "../images/naeem_logo_1024white.png";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { HiOutlineDownload } from "react-icons/hi";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { getShift } from "../Atoms/getShift";
import getFromToDate from "../Atoms/getFromToDate";
import getCheck from "../Atoms/getCheck";

const DownloadAttendance = () => {
  const usecon = useContext(CreateContext);
  const pdfRef = useRef();
  const [t] = useTranslation();
  const navigate = useNavigate();


  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
    pageStyle: `@media print {
            @page {
              size: 350mm 350mm;
              margin: 0;
            }
          }`,
  });
  useEffect(()=>{
    usecon.user==""&&navigate(-1)
  },[])

  const Headersdata = [
    t("dateData"),
    t("dayData"),
    t("devicenameData"),
    t("checkinData"),
    t("checkoutData"),
    t("lateinData"),
    t("earlyoutData"),
    t("workhourData"),
    t("shorthourData"),
    // t("daytypeData"),
    "DT",
    t("statusData"),
  ];

  return (
    <div className={`flex flex-col items-center justify-center w-full min-h-screen `}>
      <div className="w-full z-20 relative top-14 left-2/4 gap-2 -translate-x-2/4  flex justify-center items-center">
        <button
          className="absloute w-28 h-8 border-2 flex items-center justify-between borderBackgroundHover text-white border-white hover:bg-transparent OriginalColor rounded-lg px-2 my-2 top-10 left-2/4 -translate-x-2/4 "
          onClick={() => handlePrint()}
        >
          <span>Download</span>
          <span className="text-lg">
            <HiOutlineDownload />
          </span>
        </button>
        <button
          className="absloute w-28 h-8 border-2 flex items-center justify-between borderBackgroundHover text-white hover:bg-transparent OriginalColor rounded-lg px-2 my-2 top-10 left-2/4 -translate-x-2/4 "
          onClick={() => navigate(-1)}
        >
          <span>Back</span>
          <span className="text-sm">
            <ExitToAppIcon />
          </span>
        </button>
      </div>
      <div ref={pdfRef} className="bg-white rounded w-11/12 min-h-3/4 px-4 py-4">
        <div className="relative flex items-center gap-8 left-0 top-0 mb-14">
          <span>{usecon.user.emp_comp}</span> <span>{usecon.user.branch}</span>
        </div>
        <div className="flex justify-center w-full mb-6">
          {usecon.START_ATTENDANCE ? (
            <div className="flex items-center gap-6 font-semibold">
              <span>From: {usecon.START_ATTENDANCE + " "}</span>{" "}
              <span>To: {usecon.END_ATTENDANCE}</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex gap-4">
          <div className="font-semibold">Employee: {usecon.user.empName}</div>
          <div className="font-semibold ">{usecon.user.userId}</div>
          <div className="flex items-center gap-1">
          <div className="font-semibold ">{getShift(usecon.user.shift_start)}</div>
          <div className="font-semibold ">{t("to")}</div>
          <div className="font-semibold ">{getShift(usecon.user.shift_end)}</div>
          </div>
        </div>
        <div className=" w-full flex items-center relative justify-between mx-auto py-6 px-4 ">
          <h4 className="tracking-wider OriginalColor">Attendance Summary</h4>
          <div className="">
            <img className="w-20" src={image1} alt="" />
          </div>
        </div>
        <div className="w-full  py-3 px-4 mx-auto">
          <table  className={`  w-full`} border={1} responsive>
            <thead>
              <tr>
                {Headersdata.map((one) => (
                  <td className={`border-1  px-2 py-1.5`}>
                    <div className={``}>{one}</div>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {usecon.attendanceData.map((onedata) => (
                <tr>
                  <td className={`border-1  px-2 py-2`}>
                  {getFromToDate(onedata.day)}
                  </td>
                  <td
                    className={`border-1  px-2 py-2`}
                  >
                    {onedata.week_day}
                  </td>
                  <td className={`border-1  px-2 py-2`}>
                    {onedata.deviceName}
                  </td>
                  <td className={`border-1  px-2 py-2`}>
                    {getCheck(onedata.checkIn)}{" "}
                  </td>
                  <td className={`border-1  px-2 py-2`}>
                    {getCheck(onedata.checkOut)}
                  </td>
                  <td className={`border-1  px-2 py-2`}>{onedata.late}</td>
                  <td className={`border-1  px-2 py-2`}>{onedata.early}</td>
                  <td className={`border-1  px-2 py-2`}>{onedata.workHour}</td>
                  <td className={`border-1  px-2 py-2`}>{onedata.shortHour}</td>
                  <td className={`border-1  px-2 py-2`}>{onedata.day_type}</td>
                  <td className={`border-1  px-2 py-2`}>
                    <div
                      className={`px-2 
                        text-black max-w-fit font-semibold rounded-md py-1 text-xs`}
                    >
                      {onedata.status.charAt(0).toUpperCase() +
                        onedata.status.slice(1)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DownloadAttendance;
