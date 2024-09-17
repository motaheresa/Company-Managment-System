import { useContext, useState } from "react";
import { DAYS, MONTHS } from "./Conts";
import {
  CalenderHead,
  Wrapper,
  SevenColGrid,
  HeadDay,
  CalendarBody,
  StyledDay,
  StyledEvent,
} from "./styled";
import {
  areDatesTheSame,
  getDateObj,
  getDaysInMonth,
  getRandomDarkColor,
  getSortedDays,
  range,
} from "./utils";
import { TiDeleteOutline } from "react-icons/ti";
import { Button } from "react-bootstrap";
import { CreateContext } from "../../Context/Context";
import axios from "axios";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";
import { useTranslation } from "react-i18next";

export const TestCalender = ({ startingDate, eventsArr }) => {
  const {t} = useTranslation()
  const [showOneLeave, setShowoneLeave] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth());
  const [error, setError] = useState("");
  const [currentYear, setCurrentYear] = useState(startingDate.getFullYear());
  const DAYSINMONTH = getDaysInMonth(currentMonth, currentYear);
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    }
  };
  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    }
  };

  const onAddEvent = (date) => {};
  const usecon = useContext(CreateContext);
  const ShowoneLeaveFunc = (data, id) => {
    setShow(true);
    if (data.id == id) {
      setShowoneLeave(data);
    }
  };
  const deleteLeave = (data, id) => {
    if (data.id == id) {
      axios
        .delete("http://localhost:3005/dashboard/deleteEvent/" + id, {
          headers: {
            Accept: "Application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then(() => window.location.reload())
        .catch((err) => {
          //   setError("You Cannot Delete This Holiday")
          console.log(err);
        });
    }
  };
  if (error != "") {
    setTimeout(() => {
      setError("");
    }, 3000);
  }
  return (
    <div className={`relative `}>
      {error != "" && (
        <div
          className={` text-white fixed gap-2
                 duration-200 -translate-x-1/2 bg-red-400 px-20 flex items-center text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}
        >
          <div className="text-2xl">
            <CiWarning />
          </div>
          {error}
        </div>
      )}
      {show&&showOneLeave.details!="None" ? (
        <div>
          <div
            className={`fixed ${
              usecon.darkMode ? "darkContainer" : "bg-gray-200 "
            }   border top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 px-4 py-4 w-2/4 h-1/3 z-50 rounded-lg`}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="OriginalColor text-xl font-semibold tracking-wider">
                {t("Event Details")}
              </div>
            </div>
            <div className={`flex items-center max-w-full text-xl mt-2 `}>
              {showOneLeave.details.slice(0, 60)}
            </div>
            <div
              className={`flex items-center max-w-full text-xl  ${
                showOneLeave.details.split(60, 120).length <= 0 &&
                "hidden"
              }`}
            >
              {showOneLeave.details.slice(60, 120)}
            </div>
            <div
              className={`flex items-center max-w-full text-xl  ${
                showOneLeave.details.split(120, 180).length <= 0 &&
                "hidden"
              }`}
            >
              {showOneLeave.details.slice(120, 180)}
            </div>
            <div className="flex justify-center mt-14 w-full">
              <button
                onClick={() => setShow(false)}
                className="borderBackgroundHover rounded-xl w-36 h-10 text-white "
              >
                Back
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Wrapper>
        <CalenderHead>
          <div className="flex w-full relative items-center">
            <div className="px-3 absolute left-0">
              <Button
                onClick={usecon.openCalenderAddTask}
                className="w-full borderBackgroundHover NoOutlines"
              >
                {t("Add Event")}
              </Button>
            </div>
            <div className="flex items-center  absolute left-2/4 -translate-x-1/2 ">
              <div className="flex items-center w-full">
                <div
                  onClick={prevMonth}
                  className="text-white  cursor-pointer borderBackgroundHover rounded text-2xl px-2  py-1"
                >
                  <GoChevronLeft className="" />
                </div>
                <div className=" text-center flex justify-center">
                  <p className="my-0 mx-3 p-0">
                    {MONTHS[currentMonth]} {currentYear}
                  </p>
                </div>
                <div
                  onClick={nextMonth}
                  className="text-white  cursor-pointer borderBackgroundHover rounded text-2xl px-2  py-1"
                >
                  <GoChevronRight className="" />
                </div>
              </div>
            </div>
          </div>
        </CalenderHead>
        <HeadDay></HeadDay>
        <SevenColGrid>
          {getSortedDays(currentMonth, currentYear).map((day) => (
            <HeadDay>{day}</HeadDay>
          ))}
        </SevenColGrid>
        <CalendarBody fourCol={DAYSINMONTH == 28}>
          {range(DAYSINMONTH).map((day) => (
            <StyledDay
              onClick={() =>
                onAddEvent(getDateObj(day, currentMonth, currentYear))
              }
              active={areDatesTheSame(
                new Date(),
                getDateObj(day, currentMonth, currentYear)
              )}
            >
              <p>{day}</p>
              {eventsArr.map(
                (ev) =>
                  //
                  areDatesTheSame(
                    getDateObj(day, currentMonth, currentYear),
                    ev.date
                  ) && (
                    <StyledEvent>
                      <div className="flex items-center justify-between">
                        <div
                          onClick={() => ShowoneLeaveFunc(ev, ev.id)}
                          className="relative cursor-pointer"
                        >
                          <div>{ev.title}</div>
                        </div>
                        {(ev.close == undefined || ev.close == null) && (
                          <div
                            onClick={() => deleteLeave(ev, ev.id)}
                            className={` cursor-pointer w-fit px-1 py-1 text-xl rounded-lg text-white`}
                          >
                            <TiDeleteOutline />
                          </div>
                        )}
                      </div>
                    </StyledEvent>
                  )
              )}
            </StyledDay>
          ))}
        </CalendarBody>
      </Wrapper>
    </div>
  );
};
