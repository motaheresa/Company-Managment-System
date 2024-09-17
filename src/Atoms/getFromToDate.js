const getFromToDate=(date)=>{
    const newDate = date.split("-");
    const day = newDate[2].slice(0, 2);
    const month = newDate[1];
    const year = newDate[0];
    return `${day}-${month}-${year}`;
}

export default getFromToDate