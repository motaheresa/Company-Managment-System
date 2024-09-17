import React, { useContext } from "react";
import SideBar from "../sidebar/SideBar";
import "./Calender.css";
import Divs5 from "../Divs5/Divs5";
import CalenderAddTask from "./CalenderAddTask/CalenderAddTask";
import { CreateContext } from "../Context/Context";
import Calende from "./TestCalender/Calende";

const Calender = ({ pos = "emp" }) => {
  const usecon = useContext(CreateContext);
  const closeCalenderAddTask = () => {
    usecon.setOpen(false);
  };

  return (
    <div>
      <CalenderAddTask closeCalenderAddTask={closeCalenderAddTask} />
      <div className="flex ">
        {pos === "emp" && (
          <div>
            <SideBar />
          </div>
        )}
        <div className="w-full ">
          {pos === "emp" && (
            <div>
              <Divs5 />
            </div>
          )}
          <div className="w-full">
            <div
              className={` ${
                usecon.darkMode
                  ? "darkMainColor text-white"
                  : "bg-white text-black"
              }  rounded-xl calenderWidth mt-3 pt-4 mx-auto px-3 py-5 `}
            >
              <Calende pos={pos}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender;
