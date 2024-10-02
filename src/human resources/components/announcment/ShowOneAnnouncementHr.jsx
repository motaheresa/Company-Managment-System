import axios from "axios";
import React, { useEffect, useState } from "react";
import Exit from "../../../Atoms/Exit";
import { IoCloseCircleOutline } from "react-icons/io5";

const ShowOneAnnouncementHr = ({ setIsOneAnnouncementAppeared, id }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const getData = () => {
      axios
        .get(`http://localhost:1813/announcement/${id && id}`)
        .then((res) => {
          Object.keys(res.data.data).map((oneData, index) => {
            if (oneData === "start_date") {
              res.data.data[oneData] = res.data.data[oneData].split("T")[0];
              oneData = "Start Date";
            } else if (oneData === "end_date") {
              res.data.data[oneData] = res.data.data[oneData].split("T")[0];
              oneData = "End Date";
            } else if (oneData === "createdAt") {
              res.data.data[oneData] = res.data.data[oneData].split("T")[0];
              oneData = "Created At";
            }
          });
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if(id){
      getData();
    }
  }, [id]);
  return (
    <div
      className={`${
        id ? "scale-100 visible opacity-1" : "scale-0 opacity-0 invisible"
      }  fixed top-0 left-0 bg-zinc-200 bg-opacity-40 z-30 flex items-center justify-center w-screen h-screen duration-300`}
    >
      <div
        className={`rounded-lg  w-11/12 h-3/5 my-4 bg-white shadow-animation border`}
      >
        <div className="flex items-center px-3 py-4 justify-between">
          <h3 className="w-full OriginalColor ">Announcement Details</h3>
          <span
            onClick={() => setIsOneAnnouncementAppeared("")}
            className="text-3xl cursor-pointer text-red-500 hover:text-red-700"
          >
            <IoCloseCircleOutline />
          </span>
        </div>
        <div className="overflow-x-auto  px-3">
          <table className="min-w-full !rounded-lg bg-white border border-gray-200">
            <tbody>
              {Object.keys(data).map((key, index) => (
                <tr key={index} className="border-b">
                  <th
                    className="px-4 py-2 text-left text-gray-600 font-medium bg-gray-50 border-r"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                  <td
                    className="px-4 py-2 text-gray-700"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {Object.values(data)[index]}
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

export default ShowOneAnnouncementHr;
