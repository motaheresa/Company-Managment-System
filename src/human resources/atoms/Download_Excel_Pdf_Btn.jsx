import React, { useState } from "react";
import { MdDownload } from "react-icons/md";
import "./Download.css";
import { ImFilePdf } from "react-icons/im";
import { SiMicrosoftexcel } from "react-icons/si";

const Download_Excel_Pdf_Btn = ({ handlePdf=()=>{}, handleExcel=()=>{} }) => {
  const [isShowed, setIsShowed] = useState(false);
  return (
    <div className={`  duration-100 relative my-2`}>
      <div className={`absolute ${isShowed?"scale-100":"scale-0"} duration-300 right-full top-2/4 gap-2 z-50 -translate-y-2/4  bg-black -translate-x-2/4  bottom-full flex flex-col justify-center items-center`}>
        <span
          className=" cursor-pointer text-2xl borderBackgroundHover rounded-full px-2 py-2 text-white"
          onClick={()=>{handlePdf();setIsShowed(!isShowed)}}
        >
          <ImFilePdf />
        </span>
        <span
          className="cursor-pointer text-2xl borderBackgroundHover rounded-full px-2 py-2 text-white"
          onClick={()=>{handleExcel();setIsShowed(!isShowed)}}
        >
          <SiMicrosoftexcel />
        </span>
      </div>
      <div
        className={`${isShowed?"pdf-download":""} cursor-pointer w-full h-full text-2xl borderBackgroundHover rounded-full px-1 py-1 text-white`}
        onClick={() => setIsShowed(!isShowed)}
      >
        <MdDownload />
      </div>
    </div>
  );
};

export default Download_Excel_Pdf_Btn;
