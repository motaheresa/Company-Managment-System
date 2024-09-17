import React, { useContext } from "react";
import { CreateContext } from "../../Context/Context";
import { useTranslation } from "react-i18next";
import { useFetch } from "../../network/useFetch";
import getFromToDate from "../../Atoms/getFromToDate";

const announcement = ["title", "startdateData", "enddateData", "description"];
const Announcement = () => {
  const usecon = useContext(CreateContext);
  const [t] = useTranslation();
  const {data,loading,error}=useFetch("/announcement/my-announcement")
  console.log(data?.data);
  if(loading) <div>Loading....</div>
  if(error)throw new Error("Line 13 Page Announcement");
  
  return (
    <div
      className={`  ${
        usecon.darkMode ? "darkContainer" : "LightThemeContainer"
      } col-span-1 h-fit ${
        usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
      } shadow py-4 px-8 rounded-xl `}
    >
      <div
        className={`flex items-center ${
          usecon.darkMode && "darkMainColor borderDarkLine"
        } tracking-wider border-b justify-between pt-4 pb-1`}
      >
        <h5 className={`  tracking-wider`}>{t("announcement")}</h5>
      </div>
      <div
        className={`w-full ${
          usecon.darkMode ? "darkContainer" : "LightThemeContainer"
        }`}
      >
        <table
          className={`mt-6 w-full table_emp ${
            usecon.darkMode && "table_emp_dark"
          }`}
        >
          <thead>
            <tr>
              {announcement.map((one) => (
                <td>{t(one)}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              data?.data.map(row=>(
                <tr >
                  <td>
                    {row.title}
                  </td>
                  <td>
                    {getFromToDate(row.start_date)}
                  </td>
                  <td>
                    {getFromToDate(row.end_date)}
                  </td>
                  <td >
                    {row.description}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Announcement;
export const AnnouncementEmp=Announcement