const CheckStatus = (style) => {
  if (style == "absent"||style == "Absent") {
    return "mx-auto absentTable font-semibold w-28 text-center rounded-md py-1 text-xs";
  } else if (style == "present") {
    return "mx-auto presentTable font-semibol w-28 text-center rounded-md py-1 text-xs";
  }else if (style == "weekend") {
    return "mx-auto weekendTable font-semibold w-28 text-center rounded-md py-1 text-xs";
  } else {
    return "mx-auto publicHolidayTable font-semibold w-28 text-center rounded-md py-1 text-xs";
  }
};
export default CheckStatus

// max-w-fit font-semibold rounded-md py-1 text-xs