import React, { useContext, useState } from "react";
import { CreateContext } from "../../Context/Context";
import { HiMiniXMark } from "react-icons/hi2";
import { useNavigate } from "react-router";
import axios from "axios";

const GetoneLeaveManager = ({ oneData }) => {
  const usecon = useContext(CreateContext)
  const [openFile, setOpenFile] = useState("");
  const token = localStorage.getItem("token");
  console.log(oneData.fileSick);
  const handleFile = () => {
    axios
      .get(`${oneData.fileSick}`, {
        headers: {
          Accept: "Application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setOpenFile(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div className={`${usecon.eyeoneLeave ? "flex" : "hidden none"}`}>
      {
        <div
          className={`${
            openFile != "" ? "flex" : "hidden"
          } fixed z-50 w-full h-full bg-gray-300`}
        >
          <iframe
            title="PDF Viewer"
            src={`${oneData.fileSick}`}
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </div>
      }

      <div
        className={`${
          openFile != "" ? "hidden" : "fixed"
        } MyLeavesEyebg flex items-center justify-center w-screen h-screen `}
      >
        <div
          className={`${
            usecon.darkMode ? "darkContainer" : "bg-white"
          } w-2/4 h-3/5 rounded shadow-md shadow-zinc-700`}
        >
          <div className="flex flex-col gap-2">
            <div
              className={`border-b border-gray-400 w-full ${
                usecon.darkMode && "border-zinc-500"
              }`}
            >
              <div className="py-3 px-3 flex items-center justify-between">
                <h5 className="OriginalColor">Leave Action</h5>
                <div
                  onClick={() => usecon.setEyeOneLeaveTable(false)}
                  className="text-2xl borderBackground  cursor-pointer rounded-lg border"
                >
                  <HiMiniXMark />
                </div>
              </div>
            </div>
            <div className="mt-2"></div>
            <div
              className={` border-b ${
                usecon.darkMode && "border-zinc-700 text-white"
              } mx-4 pb-1.5`}
            >
              <div className="flex mx-10 w-3/4  items-center justify-between">
                <td>Leave Type</td>
                <div>{oneData.status_leave_type}</div>
              </div>
            </div>
            <div
              className={` border-b ${
                usecon.darkMode && "border-zinc-700 text-white"
              } mx-4 pb-1.5`}
            >
              <div className="flex mx-10 w-3/4  items-center justify-between">
                <td>Applied on</td>
                <div>{oneData.applied_on}</div>
              </div>
            </div>
            <div
              className={` border-b ${
                usecon.darkMode && "border-zinc-700 text-white"
              } mx-4 pb-1.5`}
            >
              <div className="flex mx-10 w-3/4  items-center justify-between">
                <td>From</td>
                <div className={`${usecon.darkMode && "text-white"}`}>
                  {oneData.from &&
                    new Date(oneData.from).getDate() +
                      "-" +
                      (new Date(oneData.from).getMonth() + 1) +
                      "-" +
                      new Date(oneData.from).getFullYear() +
                      "  "}
                </div>
              </div>
            </div>
            <div
              className={` border-b ${
                usecon.darkMode && "border-zinc-700 text-white"
              } mx-4 pb-1.5`}
            >
              <div className="flex mx-10 w-3/4  items-center justify-between">
                <td>To</td>
                <div className={`${usecon.darkMode && "text-white"}`}>
                  {oneData.to &&
                    new Date(oneData.to).getDate() +
                      "-" +
                      (new Date(oneData.to).getMonth() + 1) +
                      "-" +
                      new Date(oneData.to).getFullYear() +
                      "  "}
                </div>
              </div>
            </div>
            <div
              className={` border-b ${
                usecon.darkMode && "border-zinc-700 text-white"
              } mx-4 pb-1.5`}
            >
              <div className="flex mx-10 w-3/4  items-center justify-between">
                <td>Total Days</td>
                <div>{oneData.num_days}</div>
              </div>
            </div>
            {oneData.status_leave_type == "Sick Leave" && (
              <div
                className={` border-b ${
                  usecon.darkMode && "border-zinc-700 text-white"
                } mx-4 pb-1.5`}
              >
                <div className="flex mx-10 w-3/4  items-center justify-between">
                  <td>File Path</td>
                  <div
                    onClick={handleFile}
                    className="underline cursor-pointer"
                  >
                    {oneData.fileSick}
                  </div>
                </div>
              </div>
            )}

            <div
              className={` border-b ${
                usecon.darkMode && "border-zinc-700 text-white"
              } mx-4 pb-1.5`}
            >
              <div className="flex mx-10 w-3/4  items-center justify-between">
                <td>Leave Reason</td>
                <div>{oneData.leave_reason}</div>
              </div>
            </div>
            <div
              className={` border-b ${
                usecon.darkMode && "border-zinc-700 text-white"
              } mx-4 pb-1.5`}
            >
              <div className="flex mx-10 w-3/4  items-center justify-between">
                <td>Status</td>
                <div>{oneData.status}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GetoneLeaveManager;
