import React, { useContext, useEffect, useRef } from "react";
import { CreateContext } from "../../Context/Context";
import { useReactToPrint } from "react-to-print";
import image1 from "../../images/naeem_logo_1024white.png";
import { useNavigate } from "react-router";
import { HiOutlineDownload } from "react-icons/hi";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import getName from "../../Atoms/getName";
import getFromToDate from "../../Atoms/getFromToDate";

const DownloadLeaveRequests = () => {
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
  useEffect(()=>{
    usecon.AllLeavesRequests.length==0&&navigate(-1)
  },[])

  const Headersdata = [
    "Userid",
    "User Name",
    "Leave Type",
    "Applied on",
    "Start Date",
    "End Date",
    "Total Days",
    "Leave Reason",
    "Status",
  ];
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full ">
      <div className="w-full z-20 relative left-2/4 gap-2 -translate-x-2/4  flex justify-center items-center">
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
      <div className="flex items-center justify-center w-full mb-6">
          {usecon.FromLeaveRequest!="" ? (
            <div className="flex items-center gap-6 font-semibold">
              <span>From: {usecon.FromLeaveRequest + " "}</span>{" "}
              <span>To: {usecon.ToLeaveRequest}</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className=" w-full flex items-center relative justify-between mx-auto py-6 px-4 ">
        
          <h4 className="tracking-wider OriginalColor">Employee Leave Requests</h4>

          <div className="">
            <img className="w-20" src={image1} alt="" />
          </div>
        </div>
        <div className="w-full  py-3 px-4 mx-auto">
        <table
              
              className={`  w-full`}
              border={1}
              responsive
            >
              <thead>
                <tr>
                  {Headersdata.map((one) => (
                    <td
                      className={`border-1  px-2 py-1.5`}
                    >
                      <div className={``}>
                        {one}
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usecon.AllLeavesRequests &&
                  usecon.AllLeavesRequests.map((data, index) => (
                    <tr>
                      <td
                        className={`border-1  px-2 py-1.5`}
                      >
                        <div className={``}>
                          {data.user_id}
                        </div>
                      </td>
                      <td
                        className={`border-1  px-2 py-1.5`}
                      >
                        <div className={``}>
                          {getName(data.name)}
                        </div>
                      </td>
                      <td
                        className={`border-1  px-2 py-1.5`}
                      >
                        <div className={``}>
                          {data.status_leave_type}
                        </div>
                      </td>

                      <td
                        className={`border-1  px-2 py-1.5`}
                      >
                        <div className={``}>
                          {data.applied_on &&
                            new Date(data.applied_on).getDate() +
                              "-" +
                              (new Date(data.applied_on).getMonth() + 1) +
                              "-" +
                              new Date(data.applied_on).getFullYear() +
                              "  "}
                        </div>
                      </td>
                      <td
                        className={`border-1  px-2 py-1.5`}
                      >
                        <div className={``}>
                          {getFromToDate(data.from)}
                          
                        </div>
                      </td>
                      <td
                        className={`border-1  px-2 py-1.5`}
                      >
                        <div className={``}>
                          {getFromToDate(data.to)}
                        </div>
                      </td>
                      <td
                        className={`border-1  px-2 py-1.5`}
                      >
                        <div
                          className={`${
                            usecon.darkMode && "text-white"
                          }  w-full`}
                        >
                          {data["num_days"]}
                        </div>
                      </td>
                      <td
                        className={`border-1  px-2 py-1.5`}
                      >
                        <div
                          className={`${
                            usecon.darkMode && "text-white"
                          }  w-full`}
                        >
                          {data["leave_reason"]}
                        </div>
                      </td>
                      <td
                        className={`border-1  px-2 py-1.5`}
                      >
                        <div>
                          {data.status == "Approved" && (
                            <div className="text-black text-center py-1 text-sm font-medium   px-1  w-20 rounded-lg">
                              Approved
                            </div>
                          )}
                          {data.status == "Rejected" && (
                            <div className="text-black text-center py-1 text-sm font-medium   px-1  w-20 rounded-lg">
                              Rejected
                            </div>
                          )}
                          {data.status == "Pending" && (
                            <div className="text-black text-center py-1  text-sm font-medium  px-1  w-20 rounded-lg">
                              Pending
                            </div>
                          )}
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

export default DownloadLeaveRequests;
