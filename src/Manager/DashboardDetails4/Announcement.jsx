import React from "react";
import { useContext } from "react";
import { CreateContext } from "../../Context/Context";
import { useTranslation } from "react-i18next";

const Announcement = () => {
  const usecon = useContext(CreateContext);
  const token = localStorage.getItem("token");
  const [t, i18n] = useTranslation();
  const announcement = ["title", "startdateData", "enddateData", "description"];
  return (
    <div
      className={` ${
        usecon.darkMode ? "darkContainer" : "LightThemeContainer"
      } col-span-1 ${
        usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
      } shadow py-4 h-fit px-8 rounded-xl`}
    >
      <div className="py-6">
        <div
          className={`border-b flex items-center w-full justify-between ${
            usecon.darkMode && "borderDarkLine"
          }`}
        >
          <h5
            className={` tracking-wider ${usecon.darkMode && "darkMainColor"}`}
          >
            {t("announcement")}
          </h5>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <table className="w-full">
        {announcement.map((one) => (
                <td
                  className={`border-1 ${
                    usecon.darkMode && " border-zinc-600 text-white"
                  } px-2 py-1.5`}
                >
                  {t(one)}
                </td>
              ))}
          <tr>
          </tr>
          <tbody>
            <tr>
              {/* <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5`}
              ></td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Announcement;
// import React from 'react'
// import {AnnouncementEmp} from '../../DashboardDetails3/atoms/Announcement'
// const Announcement = () => {
//   return (
//     <AnnouncementEmp />
//   )
// }

// export default Announcement