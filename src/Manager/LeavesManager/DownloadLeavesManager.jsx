import React, { useContext, useEffect, useRef, useState } from "react";
import "./LeavesManager.css";
import { CreateContext } from "../../Context/Context";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import image1 from "../../images/naeem_logo_1024white.png";
import { useNavigate } from "react-router";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { HiOutlineDownload } from "react-icons/hi";

const DownloadLeavesManager = () => {
  const usecon = useContext(CreateContext);
  const [userName, setuserName] = useState("");
  const [allLeaves, setAllLeaves] = useState([]);
  const [userId, setUserId] = useState("");
  const [branch, setBranch] = useState("");
  const [company, setCompany] = useState("");
  
  const pdfRef = useRef();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const getTo_AND_FROM=(date)=>{
    const newDate=date.split("-")
    const day=newDate[2].slice(0,2);
    const month=newDate[1]
    const year=newDate[0]
    return `${day}-${month}-${year}`
  }
  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
    pageStyle: `@media print {
            @page {
              size: 350mm 350mm;
              margin: 0;
            }
          }`,
  });
  useEffect(() => {
    axios
      .get(
        `http://localhost:3005/me/my-leaves?${
          usecon.fromLeaveFilter != "" && "startDate=" + usecon.fromLeaveFilter
        }${usecon.toLeaveFilter != "" && "&endDate=" + usecon.toLeaveFilter}${
          usecon.FilterLeaveByType && "&leaveType=" + usecon.FilterLeaveByType
        }${
          usecon.FilterLeaveByStatus && "&status=" + usecon.FilterLeaveByStatus
        }`,
        {
          headers: {
            Accept: "Application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {

        setAllLeaves(res.data.data.leaves);
        res.data.data.leaves.length==0&&navigate(-1)
      })
      .catch((err) => {
        console.log(err);
      });
      axios
      .get("http://localhost:3005/dashboard/userDetails", {
        headers: {
          Accept: "Application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setuserName(res.data.user.empName);
        setUserId(res.data.user.userId);
        setBranch(res.data.user.branch);
        setCompany(res.data.user.emp_comp);
      });
  }, []);

  const Headersdata = [
    "Leave Type",
    "Applied on",
    "Start Date",
    "End Date",
    "Total Days",
    "Leave Reason",
    "Status",
  ];
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen ">

      <div className="w-full relative top-14 left-2/4 gap-2 -translate-x-2/4  flex justify-center items-center">
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
          <span>{company}</span> <span>{branch}</span>
        </div>
        <div className="flex justify-center w-full mb-6">
          {usecon.fromLeaveFilter ? (
            <div className="flex items-center gap-6 font-semibold">
              <span>From: {usecon.fromLeaveFilter + " "}</span>{" "}
              <span>To: {usecon.toLeaveFilter}</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex gap-4">
          <div className="font-semibold">Manager: {userId}</div>
          <div className="font-semibold ">{userName}</div>
        </div>
        <div className=" w-full flex items-center relative justify-between mx-auto py-6 px-4 ">
          <h4 className="tracking-wider OriginalColor">Leaves Summary</h4>
          <div className="">
            <img className="w-20" src={image1} alt="" />
          </div>
        </div>
        <div className="w-full  py-3 px-4 mx-auto">
          <table  className={`  w-full`} border={1} responsive>
            <thead>
              <tr>
                {Headersdata.map((one) => (
                  <td
                    className={`border-1 ${usecon.darkMode && " "} px-2 py-1.5`}
                  >
                    <div className={``}>{one}</div>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {allLeaves &&
                allLeaves.map((data, index) => (
                  <tr>
                    <td
                      className={`border-1 ${
                        usecon.darkMode && " "
                      } px-2 py-1.5`}
                    >
                      <div className={``}>{data.status_leave_type}</div>
                    </td>
                    <td
                      className={`border-1 ${
                        usecon.darkMode && " "
                      } px-2 py-1.5`}
                    >
                      <div className={``}>{data["applied_on"]}</div>
                    </td>
                    <td
                      className={`border-1 ${
                        usecon.darkMode && " "
                      } px-2 py-1.5`}
                    >
                      <div className={``}>{getTo_AND_FROM(data["from"])}</div>
                    </td>
                    <td
                      className={`border-1 ${
                        usecon.darkMode && " "
                      } px-2 py-1.5`}
                    >
                      <div className={``}>{getTo_AND_FROM(data["to"])}</div>
                    </td>
                    <td
                      className={`border-1 ${
                        usecon.darkMode && " "
                      } px-2 py-1.5`}
                    >
                      <div className={`  w-full`}>{data["num_days"]}</div>
                    </td>
                    <td
                      className={`border-1 ${
                        usecon.darkMode && " "
                      } px-2 py-1.5`}
                    >
                      <div className={`  w-full`}>{data["leave_reason"]}</div>
                    </td>
                    <td
                      className={`border-1 ${
                        usecon.darkMode && " "
                      } px-2 py-1.5`}
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
                    {/* <td className={`border-1 ${usecon.darkMode && " "} px-2 py-1.5`}>
                                            <div className='flex items-center gap-2 justify-center'>
                                                <div onClick={() => ShowoneLeaveFunc(data, data.id)} className={` bg-green-500 cursor-pointer w-fit px-1 py-1 text-lg rounded-lg text-white`}>
                                                    <MdKeyboardArrowRight />
                                                </div>
                                                {
                                                    data.status == "Pending" &&
                                                    <div onClick={()=>deleteLeave(data,data.id)} className={` bg-red-500 cursor-pointer w-fit px-1 py-1 text-lg rounded-lg text-white`}>
                                                        <AiOutlineDelete />
                                                    </div>
                                                }
                                            </div>
                                        </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DownloadLeavesManager;
