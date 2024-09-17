import React, { useEffect, useState } from "react";
import { createContext } from "react";
import App from "../App";
import Divs5 from "../Divs5/Divs5";
import { useTranslation } from "react-i18next";
import { io } from "socket.io-client";

export const CreateContext = createContext();
const Context = ({ children }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [translate, setTranslate] = useState("en");
  const [auth, setauth] = useState({});
  const [toggle, setToggle] = useState(false);
  const [leaves, setLeaves] = useState(false);
  const [payslip, setPayslip] = useState(false);
  const [email, setEmail] = useState("");
  const [codeVerify, setCodeVerify] = useState("");
  const [dashboard, setDashboard] = useState(false);
  const [PayslipTable, setPayslipTable] = useState(false);
  const [oneInbox, setInbox] = useState(false);
  const [sentEmails, setsentEmail] = useState(false);
  const [TrashEmails, setTrashEmail] = useState(false);
  const [darkMode,setDarkMode]=useState(localStorage.getItem("darkMode"))
  const [fromLeaveFilter,setFromLeaveFilter]=useState("")
  const [toLeaveFilter,setToLeaveFilter]=useState("")
  const [firstLogin, setfirstLogin] = useState(true);
  const [loginType, setLoginType] = useState("");
  const [userId, setId] = useState("");
  const [user, setUser] = useState("");
  const [eyeoneLeave, setEyeOneLeaveTable] = useState(false);
  const [open, setOpen] = useState(false);
  const [k, setK] = useState([]);
  const [CHECK_IF_LOGIN, SET_CHECK_IF_LOGIN] = useState(false);
  const [allLeaves, setAllLeaves] = useState([]);
  let [LATE_PERMISSION, SET_LATE_PERMISSOIN] = useState(0);
  let [EARLY_PERMISSION, SET_EARLY_PERMISSOIN] = useState(0);
  // Filter Attendance
  const [START_ATTENDANCE, SET_START_ATTENDANCE] = useState("");
  const [END_ATTENDANCE, SET_END_ATTENDANCE] = useState("");
  const [FilterByType, setFilterByType] = useState("");
  const [FilterByStatus, setFilterByStatus] = useState("");
  const [succesLogin,setSuccessLogin]=useState("")

  //Filter Leave
  const [FilterLeaveByType, setFilterLeaveByType] = useState("");
  const [FilterLeaveByStatus, setFilterLeaveByStatus] = useState("");

  //Leave Request 

  const [FromLeaveRequest,setFromLeaveRequest]=useState("")
  const [ToLeaveRequest,setToLeaveRequest]=useState("")
  const [UserNameLeaveRequest,setUserNameLeaveRequest]=useState("")
  const [UserIdLeaveRequest,setUserIdLeaveRequest]=useState("")
  const [DayTypeLeaveRequest,setDayTypeLeaveRequest]=useState("")
  const [StatusLeaveRequest,setStatusLeaveRequest]=useState("")
  // DayTypeLeaveReques
  //            Manager fromLeaveFilter

  const [EmployeeDetailsManager, setEmployeeDetailsManager] = useState([]);
  const [FilterLeaveByUserid,setFilterLeaveByUserid]=useState("")
  const [FilterLeaveByUsername,setFilterLeaveByUsername]=useState("")
  const [AnnualBalanceReport,setAnnualBalanceReport]=useState([])
  const [AllLeavesRequests,setAllLeavesRequests]=useState([])
  const [ToLeaveReportFilter,setToLeaveReportFilter]=useState([])
  const [FromLeaveReportFilter,setFromLeaveReportFilter]=useState([])
  const [controlShowing,setcontrolShowing]=useState(false) //Info Help  Leave
  const [controlShowingAtt,setcontrolShowingAtt]=useState(false) //Info Help  Leave
  const [AllLeaveReportFilter,setAllLeaveReportFilter]=useState([])
  const [FilterLeaveReportByUserid,setFilterLeaveReportByUserid]=useState([])
  const [FilterLeaveReportByUsername,setFilterLeaveReportByUsername]=useState([])
  const [FilterLeaveReportByType,setFilterLeaveReportByType]=useState([])
  const [FilterLeaveReportByStatus,setFilterLeaveReportByStatus]=useState([])
  const [AttendanceManagerData,setAttendanceManagerData]=useState([])

  //           EMPLOYEE  ATTENDANCE
  const [EmployeeAttendance,setEmployeeAttendance]=useState([])
  const [FilterEmployeeAtt, setFilterEmployeeAtt] = useState({
    DayType: "",
    Name: "",
    user_id: "",
    TypePermission: "",
    Status: "",
    From: "",
    To: "",
  });
  //                               HR
  
  //    Attendance
  const [dataHrAttendance,setdataHrAttendance]=useState([])
  const [HRAttendance,setHRAttendance]=useState([])
  const [FilterHRAtt, setFilterHRAtt] = useState({
    DayType: "",
    Name: "",
    user_id: "",
    Status: "",
    From: "",
    To: "",
    Sector:"",
    Branch:"",
    Departements:"",
    Site:"",
    JopPost:"",
    Permission:""
  });

  //   Leaves
  const [HRLeaves,setHRLeaves]=useState([])
  const [FilterHRLea, setFilterHRLea] = useState({
    LeaveType: "",
    Name: "",
    user_id: "",
    Status: "",
    From: "",
    To: "",
    Sector:"",
    Branch:"",
    Departements:"",
    Site:"",
    JopPost:"",
    Permission:""
  });

  const PayslipFunc = () => {
    setPayslipTable(true);
  };
  const PayslipFuncHide = () => {
    setPayslipTable(false);
  };
  const DashboardFunc = () => {};
  const oneInboxFunc = () => {
    setInbox(false);
  };
  const ShowoneInboxFunc = () => {
    setInbox(true);
  };
  const HideoneInboxFunc = () => {
    setInbox(false);
  };
  const ShowEmailSentFunc = () => {
    setsentEmail(true);
  };
  const HideEmailSentFunc = () => {
    setsentEmail(false);
  };
  const ShowTrashEmailsFunc = () => {
    setTrashEmail(true);
  };
  const HideTrashEmailsFunc = () => {
    setTrashEmail(false);
  };

  //  Dark Mode Function
  const DarkModeFunc = () => {
    setDarkMode(!darkMode)
    // window.location.reload();
    // localStorage.setItem("darkMode", darkMode);
  };
  const a1 = () => {
    localStorage.removeItem("darkMode");
    setDarkMode("")
    // window.location.reload();
  };
  const a2 = () => {
    localStorage.setItem("darkMode", true);
    setDarkMode(true)
    // window.location.reload();
  };

  // First Login Function

  const firstLoginFunc = () => {
    setfirstLogin(false);
  };
  const openCalenderAddTask = () => {
    setOpen(true);
  };
  if(succesLogin!=""){
    setTimeout(()=>{
      setSuccessLogin("")
    },4000)
  }
  const [AttendanceFileDownloadStatus, setAttendanceFileDownloadStatus] =
    useState(false);
    const token = localStorage.getItem("token");
    const [socket, setSocket] = useState(null);
  useEffect(() => {
    const callSocket = () => {
      const socket2 = io(`http://localhost:3005`, {
        query:{
          Authorization: "Bearer " + token && token,

        },extraHeaders: {
          Authorization: "Bearer " + token && token,
        }
      });
      socket2.on("connect", () => {
        setSocket(socket2);
      });
      socket2.on("disconnect", () => {
        console.log("Disconnected from the server");
      });
      return () => {
        socket2.disconnect();
      };
    };
    if (token) {
      callSocket();
    }
  }, [token]);
  return (
    <div>
      <CreateContext.Provider
        value={{
          auth,
          setauth,
          leaves,
          dashboard,
          payslip,
          setAttendanceFileDownloadStatus,
          AttendanceFileDownloadStatus,
          PayslipFuncHide,
          DashboardFunc,
          PayslipFunc,
          oneInbox,
          oneInboxFunc,
          ShowoneInboxFunc,
          HideoneInboxFunc,
          PayslipTable,
          ShowEmailSentFunc,
          HideEmailSentFunc,
          sentEmails,
          ShowTrashEmailsFunc,
          TrashEmails,
          HideTrashEmailsFunc,
          darkMode,
          DarkModeFunc,
          a1,
          a2,
          firstLogin,
          firstLoginFunc,
          loginType,
          setLoginType,
          userId,
          setId,
          attendanceData,
          setAttendanceData,
          user,
          setUser,
          eyeoneLeave,
          setEyeOneLeaveTable,
          open,
          openCalenderAddTask,
          setOpen,
          k,
          setK,
          CHECK_IF_LOGIN,
          SET_CHECK_IF_LOGIN,
          allLeaves,
          setAllLeaves,
          LATE_PERMISSION,
          SET_LATE_PERMISSOIN,
          EARLY_PERMISSION,
          SET_EARLY_PERMISSOIN,
          email,
          setEmail, //FilterHRAtt
          codeVerify,
          setCodeVerify,
          toggle,
          setToggle,
          fromLeaveFilter,
          setFromLeaveFilter,
          toLeaveFilter,
          setToLeaveFilter,
          START_ATTENDANCE,
          SET_START_ATTENDANCE,
          END_ATTENDANCE,
          SET_END_ATTENDANCE,
          FilterByType,
          setFilterByType,
          FilterByStatus,
          setFilterByStatus,
          FilterLeaveByType,
          setFilterLeaveByType,
          FilterLeaveByStatus,
          setFilterLeaveByStatus,
          setSuccessLogin,
          succesLogin,

          //                                      Manager setFromLeaveFilter

          EmployeeDetailsManager,
          setEmployeeDetailsManager,

          //      leave request
          FilterLeaveByUserid,
          FilterLeaveByUsername,
          setFilterLeaveByUserid,
          setFilterLeaveByUsername,
          ToLeaveRequest,
          setToLeaveRequest,
          FromLeaveRequest,
          setFromLeaveRequest,
          UserIdLeaveRequest,
          setUserIdLeaveRequest,
          DayTypeLeaveRequest,
          setDayTypeLeaveRequest,
          StatusLeaveRequest,
          setStatusLeaveRequest,
          UserNameLeaveRequest,
          setUserNameLeaveRequest,
          

          AnnualBalanceReport,
          setAnnualBalanceReport,
          AllLeavesRequests,
          setAllLeavesRequests,

          //     Leave Report
          FromLeaveReportFilter,
          setFromLeaveReportFilter,
          ToLeaveReportFilter,
          setToLeaveReportFilter,
          AllLeaveReportFilter,
          setAllLeaveReportFilter,
          FilterLeaveReportByUserid,
          setFilterLeaveReportByUserid,
          FilterLeaveReportByUsername,
          setFilterLeaveReportByUsername,
          FilterLeaveReportByType,
          setFilterLeaveReportByType,
          FilterLeaveReportByStatus,
          setFilterLeaveReportByStatus,
           
          // attendance  
          AttendanceManagerData,
          setAttendanceManagerData,

          //   EMPLOYEE ATTENDANCE
          EmployeeAttendance,
          setEmployeeAttendance,

          //   Filter EMPLOYEE ATTENDANCE
          FilterEmployeeAtt,
          setFilterEmployeeAtt,
          controlShowingAtt,
          setcontrolShowingAtt,
          controlShowing,
          setcontrolShowing,


          //                     HR

          FilterHRAtt,
          setFilterHRAtt,
          HRAttendance,
          setHRAttendance,
          dataHrAttendance,
          setdataHrAttendance,

          FilterHRLea,
          setFilterHRLea,
          HRLeaves,
          setHRLeaves,
          socket
        }}
      >
        {children}
      </CreateContext.Provider>
    </div>
  );
};

export default Context;
