import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CreateContext } from "../../Context/Context";
import { CloseSharp } from "@mui/icons-material";

const InfoAtt = ({ info }) => {
  const [counter, setCounter] = useState(20);
  const [close, setClose] = useState(false);
  const usecon = useContext(CreateContext);

  useEffect(() => {
    if (localStorage.getItem("counter") == undefined) {
      setTimeout(() => {
        if (counter > 0) {
          setCounter((prev) => prev - 1);
        } else {
          localStorage.setItem("counter", 0);
          window.location.reload();
        }
      }, [1000]);
    }
  }, [counter]);
  return (
    <div
      className={`${localStorage.getItem("counter")==0?"hidden":"fixed"||close} bg-gray-200 w-full h-full left-2/4 top-2/4 bg-opacity-40 flex items-center justify-center z-50 -translate-x-2/4 -translate-y-2/4`}
    >
      <div
        className={`w-2/4 h-full ${
          usecon.darkMode ? "darkContainer" : "bg-white"
        }  rounded-xl shadow-xl relative`}
      >
        <h5 className="OriginalColor text-center items-center ml-4 underline mt-3 text-2xl">
          Guidance
        </h5>
        <ul className={`list-disc text-lg space-y-1 ${usecon.darkMode&&"text-white"}`}>
          <li>
            <span className={`${usecon.darkMode?"text-white":"text-black"}`}>Daytype: H (Holiday) / status: (For Absent) :</span>
            <span
              className={`${
                usecon.darkMode ? "text-gray-200" : "OriginalColor"
              }`}
            >
                Represents any holiadys :(casual,annual,sick,marriage,maternity).
            </span>
          </li>
          <li>
            <span className={`${usecon.darkMode?"text-white":"text-black"}`}>Daytype: PH (Public Holidays) / status:(For Absent):</span>
            <span
              className={`${
                usecon.darkMode ? "text-gray-200" : "OriginalColor"
              }`}
            >
                Pertains to public holidays observed throughout the year.
            </span>
          </li>
          <li>
            <span className={`${usecon.darkMode?"text-white":"text-black"}`}>Daytype: A  / status:  (Absent) (no checkin/checkout) :</span>
            <span
              className={`${
                usecon.darkMode ? "text-gray-200" : "OriginalColor"
              }`}
            >
              Indicates an absence from work until you apply for any leave the daytype will change.
            </span>
          </li>
          <li>
           <span className={`${usecon.darkMode?"text-white":"text-black"}`}> M (Mission):</span>
            <span
              className={`${
                usecon.darkMode ? "text-gray-200" : "OriginalColor"
              }`}
            >
              status ={" "} (Present) or absent based on mission status
            </span>
          </li>
          <li>
            <span className={`${usecon.darkMode?"text-white":"text-black"}`}>W  (Workday) / status:  (For Present) :</span>
            <span
              className={`${
                usecon.darkMode ? "text-gray-200" : "OriginalColor"
              }`}
            >
              Signifies being present at work.
            </span>
          </li>
          <li>
            <span className={`${usecon.darkMode?"text-white":"text-black"}`}>R  Restday / status:  (For Weekend,Present) :</span>
            <span
              className={`${
                usecon.darkMode ? "text-gray-200" : "OriginalColor"
              }`}
            >
               Denotes weekend days, specifically Friday or Saturday.
            </span>
          </li>
          <li>
            <span className={`${usecon.darkMode?"text-white":"text-black"}`}>Daytype: P/M / status:  (For present) :</span>
            <span
              className={`${
                usecon.darkMode ? "text-gray-200" : "OriginalColor"
              }`}
            >
               Corresponds to day types (P for Permissions, M for Missions).
            </span>
          </li>
        </ul>
        <h5 className="OriginalColor text-center items-center ml-4 underline mt-2 text-2xl">
          Steps for serach:
        </h5>
        <ul className={`list-disc text-lg space-y-1 ${usecon.darkMode&&"text-white"}`}>
          <li>
            <span className={`${usecon.darkMode?"text-white":"text-black"}`}> Select the Daytype (W,A,P,M,R,PH)</span>
          </li>
          <li>
            <span className={`${usecon.darkMode?"text-white":"text-black"}`}>Daytype: PH (Public Holidays) / status:(For Absent):</span>
          </li>
          <li>
            <span className={`${usecon.darkMode?"text-white":"text-black"}`}>Select the status (Absent, Present, Weekend).</span>
          </li>
          <li>
           <span className={`${usecon.darkMode?"text-white":"text-black"}`}> Refine the search by choosing the date range FROM/TO.</span>
          </li>
          <li>
            <span className={`${usecon.darkMode?"text-white":"text-black"}`}> If you want to clear the filteration search of (Daytype and Status) choose (None) then click button (serach).</span>
          </li>
        </ul>
        <div className="items-center text-center">
          <Button
            onClick={() => {
              localStorage.setItem("counter", 0);
              setClose(true);
            }}
            className={`borderBackgroundHover hover:OriginalColor w-44 mt-6 NoOutlines  text-white text-xl `}
          >
            <span >Close </span>
            <span> ({counter})</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoAtt;
