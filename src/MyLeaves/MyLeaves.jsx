import React, { useContext, useEffect, useState } from "react";
import SideBar from "../sidebar/SideBar";
import apiAuth from "../Atoms/apiAuth";
import Divs5 from "../Divs5/Divs5";
import { CreateContext } from "../Context/Context";
import axios from "axios";
import GetoneLeave from "./GetoneLeave";
import "./MyLeaves.css";
import Snackbar from "./atoms/Snackbar";
//          Icons
import Table from "./atoms/Table";
import Counter from "./atoms/Counter";
import SideBarManager from "../Manager/sidebar/SideBar";
import AddLeaveButton from "./atoms/AddLeaveButton";

const MyLeaves = ({ pos }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [undo, setUndo] = useState(false);
  const [id, setId] = useState(null);
  const [showOneLeave, setShowoneLeave] = useState(false);
  const [error, setError] = useState("");
  const [isOpenFormApplyLeave, setIsOpenFormApplyLeave] = useState(false);
  // let [Casual_Anuual_Pen_App, set_Casual_Anuual_Pen_App] = useState(0);
  const [SickLeave_Pen_App, set_SickLeave_Pen_App] = useState(0);
  let [StudyLeave_Pen_App, SET_Study_Leave_Pen_App] = useState(0);
  const [counterLeaves, setCounterLeaves] = useState({});
  // let [APPENDING_CASUAL_ANNUAL, SET_APPENDING_CASUAL_ANNUAL] = useState(0);
  // let [APP_CASUAL, SET_APP_CASUAL] = useState(0); //                  Approved Leaves
  let [APP_PERMISSION, SET_APP_PERMISSION] = useState(0); //                  Approved Leaves
  const token = localStorage.getItem("token");
  const usecon = useContext(CreateContext);

  const handleResponse = (responseData, type) => {
    setCounterLeaves(responseData.data.counters);
    usecon.setAllLeaves(responseData.data.leaves);
    console.log(responseData.data.leaves);
    if (type === "socket") {
      // SET_APP_CASUAL((prev) => 0);
      // set_Casual_Anuual_Pen_App((prev) => 0);
      // SET_APPENDING_CASUAL_ANNUAL((prev) => 0);
      set_SickLeave_Pen_App((prev) => 0);
      SET_Study_Leave_Pen_App((prev) => 0);
    }
    responseData.data.leaves.map((onedata) => {
      // if (
      //   onedata.status_leave_type == "Casual Leave" &&
      //   (onedata.status == "Approved" || onedata.status == "Pending")
      // ) {
      //   SET_APP_CASUAL((prev) => prev + onedata.num_days);
      // }
      // if (
      //   (onedata.status_leave_type == "Casual Leave" ||
      //     onedata.status_leave_type == "Annual Leave") &&
      //   (onedata.status == "Approved" || onedata.status == "Pending")
      // ) {
      //   set_Casual_Anuual_Pen_App((prev) => prev + onedata.num_days);
      // }
      // if (
      //   (onedata.status_leave_type == "Casual Leave" ||
      //     onedata.status_leave_type == "Annual Leave") &&
      //   onedata.status == "Pending"
      // ) {
      //   SET_APPENDING_CASUAL_ANNUAL((prev) => prev + onedata.num_days);
      // }
      if (
        onedata.status_leave_type == "Late Permission" &&
        (onedata.status == "Approved" || onedata.status == "Pending")
      ) {
        SET_APP_PERMISSION((prev) => prev + onedata.num_days);
      }
      if (
        onedata.status_leave_type == "Early Leave" &&
        (onedata.status == "Approved" || onedata.status == "Pending")
      ) {
        SET_APP_PERMISSION((prev) => prev + onedata.num_days);
      }
      if (
        onedata.status_leave_type == "Sick Leave" &&
        onedata.num_days <= 2 &&
        (onedata.status == "Approved" || onedata.status == "Pending")
      ) {
        set_SickLeave_Pen_App((prev) => prev + onedata.num_days);
      }
      if (
        onedata.status_leave_type == "Study Leave" &&
        (onedata.status == "Approved" || onedata.status == "Pending")
      ) {
        SET_Study_Leave_Pen_App((prev) => prev + onedata.num_days);
      }
    });
  };
  const getData = (type) => {
    axios
      .get("http://localhost:3005/me/my-leaves", apiAuth(token))
      .then((res) => handleResponse(res.data, type));
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (undo) {
      deleteLeave();
      setUndo(false);
    }
  }, [undo]);
  useEffect(() => {
    const socket = usecon.socket;
    const handleSocket = () => {
      socket.on("acceptLeave", () => {
        console.log(socket);
        getData("socket");
      });
      socket.on("rejectLeave", () => {
        console.log(socket);

        getData("socket");
      });
    };
    socket && handleSocket();
  }, [usecon.socket]);
  const ShowoneLeaveFunc = (data, id) => {
    usecon.setEyeOneLeaveTable(true);
    setShowoneLeave(data);
  };
  const deleteLeave = () => {
    axios
      .delete(
        "http://localhost:3005/dashboard/deleteLeave/" + id,
        apiAuth(token)
      )
      .then(() => {
        const leaves = usecon.allLeaves.filter((leave) => leave.id != id);
        const leave = usecon.allLeaves.find((leave) => leave.id == id);
        usecon.allLeaves.map((onedata) => {
          if (onedata.id == leave.id) {
            // if (onedata.status_leave_type == "Casual Leave") {
            //   SET_APP_CASUAL((prev) => prev - leave.num_days);
            // }
            // if (
            //   onedata.status_leave_type == "Casual Leave" ||
            //   onedata.status_leave_type == "Annual Leave"
            // ) {
            //   set_Casual_Anuual_Pen_App((prev) => prev - leave.num_days);
            //   SET_APPENDING_CASUAL_ANNUAL((prev) => prev - leave.num_days);
            // }
            if (onedata.status_leave_type == "Late Permission") {
              SET_APP_PERMISSION((prev) => prev - leave.num_days);
            }
            if (onedata.status_leave_type == "Early Leave") {
              SET_APP_PERMISSION((prev) => prev - leave.num_days);
            }
            if (onedata.status_leave_type == "Study Leave") {
              SET_Study_Leave_Pen_App((prev) => prev - onedata.num_days);
            }
            if (
              onedata.status_leave_type == "Sick Leave" &&
              onedata.num_days <= 2
            ) {
              set_SickLeave_Pen_App((prev) => prev - onedata.num_days);
            }
          }
        });
        usecon.setAllLeaves(leaves);
      });
  };
  const handleApplied = (response, leaveType, days, type = "leave") => {
    if (type === "sick") {
      console.log("Sick 1");

      if (days <= 2) {
        set_SickLeave_Pen_App((prev) => prev + days);
      }
      usecon.setAllLeaves([...usecon.allLeaves, response]);
      return;
    } else if (type === "study") {
      SET_Study_Leave_Pen_App((prev) => prev + days);
      usecon.setAllLeaves([...usecon.allLeaves, response]);
      return;
    } else {
      switch (leaveType) {
        // case "Casual Leave":
        //   SET_APP_CASUAL((prev) => prev + days);
        // case "Casual Leave":
        // case "Annual Leave":
        //   set_Casual_Anuual_Pen_App((prev) => prev + days);
        //   SET_APPENDING_CASUAL_ANNUAL((prev) => prev + days);
        //   break;
        case "Late Permission":
        case "Early Leave":
          SET_APP_PERMISSION((prev) => prev + days);
          break;
        case "Study Leave":
          SET_Study_Leave_Pen_App((prev) => prev + days);
          break;

        default:
          break;
      }
      const newObject = response.data.data;
      usecon.setAllLeaves([...usecon.allLeaves, newObject]);
    }
  };
  const handleUndoDeleteLeave = () => {
    setUndo(false);
    setOpenSnackbar(false);
  };
  console.log(pos);
  return (
    <div className="flex relative">
      {pos == "att" ? (
        <Counter
          // APP_CASUAL={APP_CASUAL}
          // APPENDING_CASUAL_ANNUAL={APPENDING_CASUAL_ANNUAL}
          APP_PERMISSION={APP_PERMISSION}
          // Casual_Anuual_Pen_App={Casual_Anuual_Pen_App}
          handleApplied={handleApplied}
          leaveBalance={counterLeaves && counterLeaves.leaveBalance}
          isOpenFormApplyLeave={isOpenFormApplyLeave}
          setIsOpenFormApplyLeave={setIsOpenFormApplyLeave}
          counterLeaves={counterLeaves}
          SickLeave_Pen_App={SickLeave_Pen_App}
          StudyLeave_Pen_App={StudyLeave_Pen_App}
          pos = "att" 
        />
      ) : (
        <>
          {showOneLeave != "" && usecon.eyeoneLeave && (
            <div>
              <GetoneLeave oneData={showOneLeave} />
            </div>
          )}
          {pos == "manager" ? (
            <>
              {/* <h1>Test</h1> */}
              <div>
              <SideBarManager />
              </div>
              <div className="w-full">
                <div>
                  <Divs5 />
                </div>
                <Counter
                  // APP_CASUAL={APP_CASUAL}
                  // APPENDING_CASUAL_ANNUAL={APPENDING_CASUAL_ANNUAL}
                  APP_PERMISSION={APP_PERMISSION}
                  // Casual_Anuual_Pen_App={Casual_Anuual_Pen_App}
                  handleApplied={handleApplied}
                  leaveBalance={counterLeaves && counterLeaves.leaveBalance}
                  isOpenFormApplyLeave={isOpenFormApplyLeave}
                  setIsOpenFormApplyLeave={setIsOpenFormApplyLeave}
                  counterLeaves={counterLeaves}
                  SickLeave_Pen_App={SickLeave_Pen_App}
                  StudyLeave_Pen_App={StudyLeave_Pen_App}
                />
                <div
                  className={` my-4 ${
                    usecon.darkMode ? "darkContainer" : "LightThemeContainer"
                  } relative shadow px-4 py-6 rounded-xl attendencewidthholidays mx-auto`}
                >
                  <Table
                    ShowoneLeaveFunc={ShowoneLeaveFunc}
                    setId={setId}
                    error={error}
                    setError={setError}
                    setOpenSnackbar={setOpenSnackbar}
                  />
                </div>
              </div>
              <Snackbar
                handleUndoDeleteLeave={handleUndoDeleteLeave}
                setOpenSnackbar={setOpenSnackbar}
                setUndo={setUndo}
                open={openSnackbar}
              />
            </>
          ) : (
            <>
              <div>
                <SideBar />
              </div>

              <div className="w-full">
                <div>
                  <Divs5 />
                </div>
                <Counter
                  // APP_CASUAL={APP_CASUAL}
                  // APPENDING_CASUAL_ANNUAL={APPENDING_CASUAL_ANNUAL}
                  APP_PERMISSION={APP_PERMISSION}
                  // Casual_Anuual_Pen_App={Casual_Anuual_Pen_App}
                  handleApplied={handleApplied}
                  leaveBalance={counterLeaves && counterLeaves.leaveBalance}
                  isOpenFormApplyLeave={isOpenFormApplyLeave}
                  setIsOpenFormApplyLeave={setIsOpenFormApplyLeave}
                  counterLeaves={counterLeaves}
                  SickLeave_Pen_App={SickLeave_Pen_App}
                  StudyLeave_Pen_App={StudyLeave_Pen_App}
                />
                <div
                  className={` my-4 ${
                    usecon.darkMode ? "darkContainer" : "LightThemeContainer"
                  } relative shadow px-4 py-6 rounded-xl attendencewidthholidays mx-auto`}
                >
                  <Table
                    ShowoneLeaveFunc={ShowoneLeaveFunc}
                    setId={setId}
                    error={error}
                    setError={setError}
                    setOpenSnackbar={setOpenSnackbar}
                  />
                </div>
              </div>
              <Snackbar
                handleUndoDeleteLeave={handleUndoDeleteLeave}
                setOpenSnackbar={setOpenSnackbar}
                setUndo={setUndo}
                open={openSnackbar}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyLeaves;
