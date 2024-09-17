import React, { useContext, useEffect, useRef } from "react";
import { CreateContext } from "../../Context/Context";
import { useReactToPrint } from "react-to-print";
import image1 from "../../images/naeem_logo_1024white.png";
import { useNavigate } from "react-router";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { HiOutlineDownload } from "react-icons/hi";
import getName from "../../Atoms/getName";
import { getShift } from "../../Atoms/getShift";

const DownloadEmployee = () => {
  const usecon = useContext(CreateContext);
  const pdfRef = useRef();
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

  const NameData = [
    "Userid",
    "Name",
    "Email",
    "Branch",
    "Position",
    "Shift Start",
    "Shift End",
  ];
  useEffect(()=>{
    usecon.EmployeeDetailsManager.length===0&&navigate(-1)
  },[])
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full ">
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
      <div ref={pdfRef} className="bg-white rounded w-11/12 h-full px-4 py-4">
        <div className=" w-full flex items-center relative justify-between mx-auto py-6 px-4 ">
          <h4 className="tracking-wider OriginalColor">Employee Details</h4>
          <div className="">
            <img className="w-20" src={image1} alt="" />
          </div>
        </div>
        <div className="w-full  py-3 px-4 mx-auto">
          <table  className={`  w-full`} border={1} responsive>
            <thead>
              <tr>
                {NameData.map((one) => (
                  <td className={`border-1  px-2 py-1.5`}>
                    <div className={``}>{one}</div>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {usecon.EmployeeDetailsManager.map((onedata) => (
                <tr>
                <td
                  className={`border-1  px-2 py-2`}
                >
                  {onedata.userid}
                </td>
                <td
                  className={`border-1  px-2 py-2`}
                >
                  {getName(onedata.username,2)}
                </td>
                <td
                  className={`border-1  px-2 py-2`}
                >
                  {onedata.Email}
                </td>
                <td
                  className={`border-1  px-2 py-2`}
                >
                  {onedata.branch}
                </td>
                <td
                  className={`border-1  px-2 py-2`}
                >
                  {onedata.job}
                </td>
                <td
                  className={`border-1  px-2 py-2`}
                >
                  {getShift(onedata.shift_start)}
                </td>
                <td
                  className={`border-1  px-2 py-2`}
                >
                  {getShift(onedata.shift_end)}
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

export default DownloadEmployee;
