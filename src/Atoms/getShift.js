export const getShift = (date) => {
  if (date) {
    let options = { timeZone: "Africa/Cairo" };
    let formattedDate = date.toLocaleString("en-US", options);
    let hour = new Date(formattedDate).getUTCHours();
    let minute = new Date(formattedDate).getUTCMinutes();
    let seconds = new Date(formattedDate).getUTCSeconds();
    if (hour <= 9) {
      hour = "0" + hour;
    }
    if (minute <= 9) {
      minute = "0" + minute;
    }
    if (seconds <= 9) {
      seconds = "0" + seconds;
    }

    return `${hour}:${minute}:${seconds}`;
  }
};
