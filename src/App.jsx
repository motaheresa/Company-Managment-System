import React, { useContext } from "react";
import "./App.css";
import MainPage from "./MainPage/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Attendence from "./Attendence/Attendence";
import MyLeaves from "./MyLeaves/MyLeaves";
import Profile from "./Profile/Profile";
import ReportPayslip from "./Report/ReportPayslip/ReportPayslip";
import PhotoPayslip from "./Payslip/PhotoPayslip";
import Calender from "./Calender/Calender";
import ResetPasword from "./ResetPassword/ResetPasword";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import AttendanceFileDownload from "./Attendence/AttendanceFileDownload";
import CreatePasswordAfterLogin from "./login/CreatePasswordAfterLogin";
import { CreateContext } from "./Context/Context";
import Payroll from "./Payroll/Payroll";
import EmployeeSalary from "./Payroll/EmployeeSalary/EmployeeSalary";
import RequireAuth from "./RequireAuth/RequireAuth";
import PersistLogin from "./login/PersistLogin";
import DownloadLeaves from "./MyLeaves/DownloadLeaves";
import VerifiedEmail from "./ForgetPassword/VerifiedEmail";
import CreateNewPassword from "./ForgetPassword/SetNewPassword";
import DownloadAttendance from "./Attendence/DownloadAttenadance";
import ManagerDashboard from "./Manager/DashboardConent/ManagerDashboard";
import ProfileManager from "./Manager/profile/ProfileManager";
import CalenderManager from "./Manager/Calendar/Calender";
import LeavesManager from "./Manager/LeavesManager/LeavesManager";
import DownloadLeavesManager from "./Manager/LeavesManager/DownloadLeavesManager";
import AttendenceManager from "./Manager/AttendanceManager/AttendenceManager";
import EmplyeeDetails from "./Manager/EmployeeDetails/EmplyeeDetails";
import DownloadEmployee from "./Manager/EmployeeDetails/DownloadEmployeeDetails";
import LeaveRequests from "./Manager/LeaveRequests/LeaveRequests";
import DownloadLeaveRequests from "./Manager/LeaveRequests/DownloadLeaveRequests";
import AnnualBalanceReport from "./Manager/AnnualBalanceReport/AnnualBalanceReport";
import AnnualBalanceDownload from "./Manager/AnnualBalanceReport/AnnualBalanceDownload";
import DownloadAttendanceManager from "./Manager/AttendanceManager/DownloadAttenadanceManager";
import LeaveReportManager from "./Manager/LeaveReportManager/LeaveReportManager";
import DownloadLeaveReport from "./Manager/LeaveReportManager/DownloadLeaveReport";
import EmployeeAttendanceManager from "./Manager/EmployeeAttendanceManager/EmployeeAttendanceManager";
import DownloadEmployeeAttendance from "./Manager/EmployeeAttendanceManager/DownloadEmployeeAttendanceManager";
import HrDashboard from "./human resources/Dashboard/HrDashboard";
import CrudEmployee from "./human resources/crud-employee/CrudEmployee";
import DailyAttendanceHr from "./human resources/daily-attendance/DailyAttendanceHr";
import AnnualBalanceReportHr from "./human resources/annual-balance-report/AnnualBalanceReportHr";
import EmployeeLeaveRequest from "./human resources/employee-leave-request/EmployeeLeaveRequestHr";
import LeavesReport from "./human resources/leaves-report/LeavesReport";
import ProfileHr from "./human resources/profile/ProfileHr";
import PayslipHr from "./human resources/Payslip/PayslipHr";
import NewelyHired from "./human resources/PageReport/NewelyHired";
import Terminated from "./human resources/PageReport/Terminated";
import OverTime from "./human resources/over-time/OverTime";
import ResetCodePaySlip from "./human resources/Payslip/auth/ResetCodePaySlip";
import PassPaylip from "./human resources/Payslip/auth/PassPaylip";
import PayslipAuthCon from "./Context/hr/PayslipAuthCon";
import DownloadEmpPayslip from "./human resources/Payslip/atoms/DownloadEmpPayslip";
import AttendanceReport from "./human resources/Attendance-Report/AttendanceReport";
import SyncAttendance from "./human resources/SyncAttendance/SyncAttendance";
import CalendarHr from "./human resources/Calendar/CalendarHr";

const App = () => {
  const usecon = useContext(CreateContext);

  return (
    <div
      className={`${
        localStorage.getItem("i18nextLng") == "ar" && "arabic-lang"
      } ${usecon.darkMode && "darkmodeBody"}`}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth/setPassword"
            element={<CreatePasswordAfterLogin />}
          />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/CreateNewPassword" element={<CreateNewPassword />} />
          <Route path="/auth/verified" element={<VerifiedEmail />} />
          <Route path="/" element={<Login />} />
          {/* Protected Routes */}
          {/* /auth/verifyResetCode */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/mainPage" element={<MainPage />} />
              <Route path="/resetPassword" element={<ResetPasword />} />
              <Route path="/dashboard/userDetails" element={<MainPage />} />
              <Route path="/attendence" element={<Attendence />} />
              <Route
                path="/dashboard/applyLeave/downloadLeave"
                element={<DownloadLeaves />}
              />
              <Route
                path="/attendance/downloadAttendance"
                element={<DownloadAttendance />}
              />
              <Route path="/dashboard/applyLeave" element={<MyLeaves />} />

              <Route
                path="/profile"
                element={
                  // <User_Details>
                  <Profile />
                  // </User_Details>
                }
              />

              <Route path="/payroll" element={<Payroll />}>
                {/* <Route index element={<Payslip />} /> */}
                {/* <Route path="payslip" element={<Payslip />} /> */}
                <Route path="employeeSalary" element={<EmployeeSalary />} />
              </Route>
              <Route path="/PayslipReport" element={<ReportPayslip />} />
              <Route path="/photoPayslip" element={<PhotoPayslip />} />
              <Route path="/calender" element={<Calender />} />
              <Route
                path="Attendacefiledownload"
                element={<AttendanceFileDownload />}
              />
              {/* Manager Routes */}
              <Route path="/managerdashboard" element={<ManagerDashboard />} />
              <Route path="/profilemanager" element={<ProfileManager />} />
              <Route path="/calendarmanager" element={<CalenderManager />} />
              <Route path="/leavesmanager" element={<LeavesManager />} />
              <Route
                path="/dashboard/leaves/downloadmanager"
                element={<DownloadLeavesManager />}
              />
              <Route
                path="/attendnacemanager"
                element={<AttendenceManager />}
              />
              <Route
                path="/attendance/downloadmanager"
                element={<DownloadAttendanceManager />}
              />
              <Route path="/employeeDetails" element={<EmplyeeDetails />} />
              <Route
                path="/employee/downloadManager"
                element={<DownloadEmployee />}
              />
              <Route path="/leaveRequests" element={<LeaveRequests />} />
              <Route
                path="/download/leaveRequests"
                element={<DownloadLeaveRequests />}
              />
              <Route
                path="/annualBalanceReport"
                element={<AnnualBalanceReport />}
              />
              <Route
                path="/download/annualBalance"
                element={<AnnualBalanceDownload />}
              />
              <Route
                path="/leaveReportManager"
                element={<LeaveReportManager />}
              />
              <Route
                path="/download/leaveReportManager"
                element={<DownloadLeaveReport />}
              />
              <Route
                path="/employeeAttendanceManager"
                element={<EmployeeAttendanceManager />}
              />
              <Route
                path="/download/employeeAttendanceManager"
                element={<DownloadEmployeeAttendance />}
              />
              {/* HR Routes */}
              {/* <Route path="/dashboardHR" element={<DashboardHR />} />
              <Route path="/profileHR" element={<ProfileHR />} />
              <Route path="/calenderHR" element={<CalenderHR />} />
              <Route path="/leavesDownloadHR" element={<LeavesDownloadHR />} /> */}
              {/* hr system 2024 */}
              <Route path="/hr/dashboard" element={<HrDashboard />} />
              <Route path="/hr/employee-details" element={<CrudEmployee />} />
              <Route
                path="/hr/daily-attendance"
                element={<DailyAttendanceHr />}
              />
              <Route
                path="/hr/employee-leave-request"
                element={<EmployeeLeaveRequest />}
              />
              <Route
                path="/hr/annual-balance-report"
                element={<AnnualBalanceReportHr />}
              />
              <Route path="/hr/profile" element={<ProfileHr />} />
              <Route path="/hr/leaves-report" element={<LeavesReport />} />
              <Route path="/hr/over-time" element={<OverTime />} />
              <Route path="/hr/newly-hired" element={<NewelyHired />} />
              <Route path="/hr/terminated" element={<Terminated />} />
              <Route
                path="/hr/payslip"
                element={
                  <PayslipAuthCon>
                    <PayslipHr />
                  </PayslipAuthCon>
                }
              />
              <Route
                path="/hr/auth-payslip"
                element={
                  <PayslipAuthCon>
                    <PassPaylip />
                  </PayslipAuthCon>
                }
              />
              <Route
                path="/hr/reset-code-payslip"
                element={
                  <PayslipAuthCon>
                    <ResetCodePaySlip />
                  </PayslipAuthCon>
                }
              />
              <Route
                path="/hr/download-emp-payslip"
                element={
                  <PayslipAuthCon>
                    <DownloadEmpPayslip />
                  </PayslipAuthCon>
                }
              />
              <Route
                path="/hr/attendance-report"
                element={<AttendanceReport />}
              />
              <Route
                path="/hr/sync-attendance"
                element={<SyncAttendance />}
              />
              <Route
                path="/hr/calendar"
                element={<CalendarHr />}
              />
              {/* hr system ends 2024 */}
            </Route>
          </Route>
          {/* error route */}
          <Route path="*" element={<h1>Incorrect Route Y Bagm</h1>} />
        </Routes>

        {/* Payslip Authorization Context  */}
        {/* <PayslipAuthCon>
          <Routes>
            <Route path="/hr/auth-payslip" element={<PassPaylip />} />
            <Route
              path="/hr/reset-code-payslip"
              element={<ResetCodePaySlip />}
            />
          </Routes>
        </PayslipAuthCon> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
