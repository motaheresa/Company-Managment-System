import React, { useContext, useEffect, useState } from "react";
import { CreateContext } from "../Context/Context";
import "./DashboardDetails3.css";
import { useTranslation } from "react-i18next";
import Announcement from "./atoms/Announcement";

const DashboardDetails3 = () => {
  const usecon = useContext(CreateContext);
  const [upcomingVacatoin, setUpcomingVacation] = useState([]);
  const [t] = useTranslation();
  const aa = async () => {
    const token = localStorage.getItem("token");
    const js = (data) => {
      data.data.leaves.map((onedata) => {
        if (
          new Date(onedata.from).getTime() > new Date().getTime() &&
          onedata.status == "Approved"
        ) {
          setUpcomingVacation((prev) => [...prev, onedata]);
        }
      });
    };
    await fetch("http://localhost:3005/me/my-leaves", {
      headers: {
        Accept: "Application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json().then((data) => js(data)))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    aa();
  }, []);
  const getDuration = (from) => {
    const currentDate = new Date().getTime();
    const fromDate = new Date(from).getTime();
    const diffDate = fromDate - currentDate;
    const days = Math.floor(diffDate / (3600 * 24) / 1000);
    if (days < 0) {
      return;
    }
    return `${days + 1} days`;
  };

  return (
    <div className=" grid grid-cols-2 WidthDashBoardDetails w-11/12 mx-auto gap-2 my-16">
<Announcement />
      <div
        className={` ${
          usecon.darkMode ? "darkContainer" : "LightThemeContainer"
        } col-span-1 h-fit ${
          usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
        } shadow py-4 px-8 rounded-xl`}
      >
        <div className="py-6">
          <div
            className={`border-b flex items-center w-full justify-between ${
              usecon.darkMode && "borderDarkLine"
            }`}
          >
            <h5
              className={` tracking-wider ${
                usecon.darkMode && "darkMainColor"
              }`}
            >
              {t("upcomingvacation")}
            </h5>
            {/* <div className="flex items-center gap-2 text-2xl OriginalColor">
                            <BsPatchQuestion />
                        </div> */}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <table className="w-full">
            <tr>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5`}
              >
                {t("vacationType")}
              </td>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5`}
              >
                {t("dateData")}
              </td>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5`}
              >
                {t("duration")}
              </td>
            </tr>
            <tbody>
              {upcomingVacatoin.map((vac) => (
                <tr>
                  <td
                    className={`border-1 ${
                      usecon.darkMode && " border-zinc-600 text-white"
                    } px-2 py-1.5`}
                  >
                    {vac.status_leave_type}
                  </td>
                  <td
                    className={`border-1 ${
                      usecon.darkMode && " border-zinc-600 text-white"
                    } px-2 py-1.5`}
                  >
                    {vac.from &&
                      new Date(vac.from).getDate() +
                        "-" +
                        (new Date(vac.from).getMonth() + 1) +
                        "-" +
                        new Date(vac.from).getFullYear() +
                        "  "}
                  </td>
                  <td
                    className={`border-1 ${
                      usecon.darkMode && " border-zinc-600 text-white"
                    } px-2 py-1.5`}
                  >
                    {getDuration(vac.from)}
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

export default DashboardDetails3;
