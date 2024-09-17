import axios from "axios";
import React, { useEffect, useState } from "react";
import apiAuth from "../../../Atoms/apiAuth";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import "./Holidays.css"


const Holidays = () => {
  const token = localStorage.getItem("token");
  const [control, setControl] = useState({
    startStep: 0,
    endStep: 10,
  });
  const [data, setData] = useState([]);
  function getRandomColorName() {
    const randomIndex = Math.floor(Math.random() * tailwindColors.length);
    return `${tailwindColors[randomIndex]}`;
  }
  useEffect(() => {
      axios
      .get("http://localhost:3005/dashboard/yearHolidays", apiAuth(token))
      .then((res) => {
        const holidays = res.data.holidays.filter((holiday) => {
          if (new Date() < new Date(holiday.date_holy)) {
            holiday.color=getRandomColorName()
            return holiday;
          }
        });
        setData(holidays);
      });

  }, []);
  const Next_Holiday = () => {
    if (control.endStep > data.length) {
      return;
    } else {
      setControl((prev) => ({
        ...prev,
        startStep: control.startStep + 10,
        endStep: control.endStep + 10,
      }));
    }
  };
  const Before_Holiday = () => {
    if (control.startStep <= 0) {
      return;
    } else {
      setControl((prev) => ({
        ...prev,
        startStep: control.startStep - 10,
        endStep: control.endStep - 10,
      }));
    }
  };

  return (
    <div className="border-2 border-zinc-300  h-fit bg-white rounded-lg py-4 px-6">
      <div className="flex w-full items-center mb-4 justify-between">
        <h4 className="text-gray-600">Holidays </h4>
        <div className="flex items-center gap-3">
          <div
            onClick={Before_Holiday}
            className={`borderBackgroundHover ${
              control.startStep <= 0 ? "cursor-not-allowed" : "cursor-pointer"
            } text-xl rounded-full px-2 py-2 text-white`}
          >
            <FaArrowLeft />

          </div>
          
          <div
            onClick={Next_Holiday}
            className={`borderBackgroundHover ${
              control.endStep >= data.length
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } text-xl rounded-full px-2 py-2 text-white`}
          >
            <FaArrowRight />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-3">
        {data.slice(control.startStep, control.endStep).map((holiday) => (
          <Holiday key={`${holiday.ingress_holy_id}${holiday.holiday_eng_name}`} holiday={holiday} getRandom={getRandomColorName()} />
        ))}
      </div>
    </div>
  );
};

export default Holidays;

export const Holiday = ({ holiday}) => {
  return (
      <div className="grid grid-cols-3 w-full gap-4">
        <div
          style={{ height: "5.1rem" }}
          className={`flex flex-col items-center col-span-1 text-center border-2 border-${holiday.color} border-solid rounded w-24`}
        >
          <div
            className={`rounded py-1 text-white !opacity-100 w-full z-20 ${holiday.color}-bg-holi text-lg tracking-wider`}
          >
            {months[new Date(holiday.date_holy).getMonth()]}
          </div>
          <div className={` text-2xl my-auto ${holiday.color}-cl-holi !opacity-100 italic font-semibold`}>
            {new Date(holiday.date_holy).getDate()}
          </div>
        </div>
        <div className="flex flex-col col-span-2">
          <span className="text-lg">{holiday.holiday_eng_name}</span>
          <span className="text-gray-400">{holiday.holiday_day}</span>
        </div>
      </div>
  );
};

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const tailwindColors = [
  "red",
  "blue",
  "green",
  "purple",
  "pink",
  "indigo",
  "teal",
  "orange",
  "cyan",
  "blue",
];