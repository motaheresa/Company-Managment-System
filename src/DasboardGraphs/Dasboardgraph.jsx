import React, { useContext, useEffect, useState } from "react";
import Test from "../Test";
import { CreateContext } from "../Context/Context";
import axios from "axios";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import apiAuth from "../Atoms/apiAuth";
const backCalender1 = {
  color: "#219029",
  backgroundColor: "rgba(13, 205, 148, 0.1)",
};
const backCalender2 = {
  color: "#aa4cf2",
  backgroundColor: "rgba(170, 76, 242, 0.1)",
};
const Dasboardgraph = () => {
  const usecon = useContext(CreateContext);
  const [holidays, setHolidays] = useState([]);
  let [top, setTop] = useState(5);
  const [t] = useTranslation();
  let [bottom, setBottom] = useState(0);

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:1813/dashboard/yearHolidays", apiAuth(token))
      .then((res) => {
        res.data.holidays.map((holi) => {
          console.log(new Date(holi.date_holy))
          if (new Date(holi.date_holy).getTime() > new Date().getTime()) {
            setHolidays(
              res.data.holidays.sort(
                (a, b) => new Date(a.date_holy) - new Date(b.date_holy)
              )
            );
          }
        });
       
      });
  }, []);
  const Next_Holiday = () => {
    if (top > holidays.length - 1) {
      setTop((prev) => prev);
    } else {
      setTop((prev) => prev + 5);
      setBottom((prev) => prev + 5);
    }
  };
  const Before_Holiday = () => {
    if (bottom <= 0) {
      setBottom((prev) => prev);
    } else {
      setTop((prev) => prev - 5);
      setBottom((prev) => prev - 5);
    }
  };
  console.log(bottom)
  return (
    <div
      className={` grid grid-cols-5 gap-3 WidthDashBoardDetails mx-auto over-flow-hidden`}
    >
      <div className="col-span-3 ">
        <div className="">
          <div
            className={`px-4 py-8  rounded-xl shadow ${
              usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
            }  ${usecon.darkMode ? "darkContainer" : "LightThemeContainer"}`}
          >
            <div
              className={`flex py-4 mb-4 items-center w-full justify-between border-b ${
                usecon.darkMode && "borderDarkLine"
              } w-full`}
            >
              {/* <h5 className={` tracking-wider  ${usecon.darkMode && "darkMainColor"}`}> Holidays</h5> */}
              <h5
                className={` tracking-wider w-fit ${
                  usecon.darkMode && "darkMainColor"
                }`}
              >
                {t("holidays")}
              </h5>
              <div className="flex items-center gap-2 w-fit ">
                <div
                  onClick={Before_Holiday}
                  className="text-white z-40 cursor-pointer borderBackgroundHover rounded text-2xl px-2  py-1"
                >
                  <GoChevronLeft className="" />
                </div>

                <div
                  onClick={Next_Holiday}
                  className="text-white z-40 cursor-pointer borderBackgroundHover rounded text-2xl px-2  py-1"
                >
                  <GoChevronRight className="" />
                </div>
              </div>
              {/* <div className={`${HideNextBtn ? "hidden" : "flex"}`} onClick={Next_Holiday}>Next</div>
                                <div className={`${HideBeforeBtn || bottom == 0 ? "hidden" : "flex"}`} onClick={Before_Holiday}>Before</div> */}
            </div>
            <div className="flex items-start flex-col gap-3 ">
              {holidays.slice(bottom, top).map((holi, index) => {
                return (
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <div
                        style={index % 2 == 0 ? backCalender1 : backCalender2}
                        className={`${
                          usecon.darkMode && "backHolidayElementsContainer"
                        } px-3 flex flex-col items-center justify-center rounded-xl py-2`}
                      >
                        <div
                          className={`${
                            usecon.darkMode && "text-white"
                          } text-xl font-semibold `}
                        >
                          {parseInt(holi.date_holy.toString().split("-")[2])}
                        </div>
                        <div
                          className={`${
                            usecon.darkMode && "text-white"
                          }  font-semibold `}
                        >
                          {new Date(holi.date_holy).toString().split(" ")[1]}
                        </div>
                      </div>
                      <div className="flex flex-col ">
                        <div
                          className={`${usecon.darkMode && "darkMainColor"}`}
                        >
                          {holi.holiday_eng_name}
                        </div>
                        <p
                          className={`${
                            usecon.darkMode ? "text-gray-400" : "text-gray-600"
                          } text-sm`}
                        >
                          {new Date(holi.date_holy).toLocaleDateString(
                            "en-US",
                            { weekday: "long" }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="lightgrayColor text-sm">
                      {Math.floor(
                        (new Date(holi.date_holy).getTime() -
                          new Date().getTime()) /
                          1000 /
                          86400
                      ) + " days to left"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 w-full h-full">
        <div
          className={`px-4 pt-10 ${
            usecon.darkMode ? "darkContainer" : "LightThemeContainer"
          } rounded-xl h-full shadow ${
            usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
          }`}
        >
          <div className="flex items-center justify-center w-full">
            <Test />
          </div>
          <div className="grid grid-cols-1 w-full items-start gap-1 mt-16">
            <div className="flex items-center w-full justify-center gap-6">
              <div className="flex items-center w-44 gap-2">
                <div className="w-3 h-3 bg-primary rounded-sm"></div>
                <div
                  className={`${
                    usecon.darkMode && "darkMainColor"
                  } text-lg tracking-wider font-normal`}
                >
                  {t("casualleave")}
                </div>
              </div>
              <div className="flex items-center w-52 gap-2">
                <div className="w-3 h-3 OrangeBackToolTip rounded-sm"></div>
                <div
                  className={`${
                    usecon.darkMode && "darkMainColor"
                  } text-lg tracking-wider font-normal`}
                >
                  {t("annualleave")}
                </div>
              </div>
            </div>
            <div className="flex items-center w-full justify-center gap-6">
              <div className="flex items-center w-44  gap-2">
                <div className="w-3 h-3 bg-danger rounded-sm"></div>
                <div
                  className={`${
                    usecon.darkMode && "darkMainColor"
                  } text-lg tracking-wider font-normal`}
                >
                  {t("sickleave")}
                </div>
              </div>
              <div className="flex items-center w-52 gap-2">
                <div className="w-3 h-3 GreenBackToolTip rounded-sm"></div>
                <div
                  className={`${
                    usecon.darkMode && "darkMainColor"
                  } text-lg font-normal`}
                >
                  {t("remainingpermission")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dasboardgraph;
