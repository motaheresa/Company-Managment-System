import React, { useContext } from 'react'
import { CreateContext } from '../../Context/Context'
import getFromToDate from '../../Atoms/getFromToDate'
import getCheck from '../../Atoms/getCheck'
import { useTranslation } from 'react-i18next'
import CheckStatus from '../../Atoms/CheckStatus'

const AttendanceDetails = ({attendanceData}) => {
    const usecon=useContext(CreateContext)
    const [t] = useTranslation();
    
  return (
    <div
        className={` ${
          usecon.darkMode ? "darkContainer" : "LightThemeContainer"
        } w-full col-span-3 ${
          usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
        } shadow py-4 px-8 rounded-xl`}
      >
        <div className="py-6">
          <div
            className={`border-b ${
              usecon.darkMode && "borderDarkLine"
            } flex items-center w-full justify-between`}
          >
            <h5 className={`${usecon.darkMode && "text-white"} tracking-wider`}>
              {t("attendancedetails")}
            </h5>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <table className={`w-full table_emp ${usecon.darkMode&&"table_emp_dark"}`}>
            <tr>
              <ColumnHeader t={t} usecon={usecon} value="dateData" />
              <ColumnHeader t={t} usecon={usecon} value="dayData" />
              <ColumnHeader t={t} usecon={usecon} value="checkinData" />
              <ColumnHeader t={t} usecon={usecon} value="checkoutData" />
              <ColumnHeader t={t} usecon={usecon} value="daytypeData" />
              <ColumnHeader t={t} usecon={usecon} value="statusData" />
            </tr>
            {attendanceData?.data.attendance.slice(0, 5).map((onedata) => (
              <tr>
                <td>{getFromToDate(onedata.day)}</td>
                <td>{onedata.week_day}</td>
                <td>{getCheck(onedata.checkIn)}</td>
                <td>{getCheck(onedata.checkOut)}</td>
                <td>{onedata.day_type}</td>
                <td>
                  <div
                    className={`px-2 ${CheckStatus(
                      onedata.status
                    )} max-w-fit font-semibold rounded-md py-1 text-xs`}
                  >
                    {onedata.status.charAt(0).toUpperCase() +
                      onedata.status.slice(1)}
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
  )
}

export default AttendanceDetails


export const ColumnHeader = ({ usecon, t, value }) => {
    return <td>{t(value)}</td>;
  };
  
  export const ColumnData = ({ usecon, value }) => {
    return (
      <td
        className={`border-1 ${
          usecon.darkMode && " border-zinc-600 text-white"
        } px-2 py-1.5`}
      >
        {value}
      </td>
    );
  };
  

