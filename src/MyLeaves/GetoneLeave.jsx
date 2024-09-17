import React, { useContext } from "react";
import { CreateContext } from "../Context/Context";
import { HiMiniXMark } from "react-icons/hi2";

const GetoneLeave = ({ oneData }) => {
  const usecon = useContext(CreateContext);
  const getDate = (theDate) => {
    const date = theDate.split("-");
    const index = date[2].indexOf("T");
    const year = date[0];
    const month = date[1];
    const day = date[2].slice(0, index);
    return `${day}-${month}-${year}`;
  };
  function handleFile() {
    var iframeUrl = oneData.fileSick;
    // Create a new window or tab
    var newTab = window.open('', '_blank');

    // Check if the newTab is null (blocked by pop-up blocker)
    if (newTab !== null) {
        // Write the iframe HTML into the new window or tab
        newTab.document.write('<iframe src="' + iframeUrl + '" width="100%" height="100%"></iframe>');
    } else {
        alert('Pop-up blocked. Please allow pop-ups for this site.');
    }
    
}
  return (
    <div className={`${oneData ? "flex" : "hidden none"}`}>
      <div
        className={`fixed MyLeavesEyebg flex items-center justify-center w-screen h-screen `}
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
                  {getDate(oneData.from)}
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
                {getDate(oneData.to)}
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
            {(oneData.status_leave_type == "Sick Leave"||oneData.status_leave_type == "Study Leave") && (
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
export default GetoneLeave;
