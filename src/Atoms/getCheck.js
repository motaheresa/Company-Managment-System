const getCheck=(date)=>{
    let hour = new Date(date).getUTCHours();
    let minutes = new Date(date).getUTCMinutes();
    let seconds = new Date(date).getUTCSeconds();
    if (hour <= 9) {
      hour = "0" + hour;
    }
    if (minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds <= 9) {
      seconds = "0" + seconds;
    }
    return `${hour}:${minutes}:${seconds}`;
}

export default getCheck