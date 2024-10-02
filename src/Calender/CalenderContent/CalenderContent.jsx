import React, { useContext, useEffect, useState } from 'react'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { CreateContext } from '../../Context/Context'
import { Button } from 'react-bootstrap'
import CalenderAddTask from '../CalenderAddTask/CalenderAddTask'
import axios from 'axios'
import Calende from '../TestCalender/Calende'

const CalenderContent = () => {
    const usecon = useContext(CreateContext)
    const [allEvents,setAllEvents]=useState([])
    const [open, setOpen] = useState(false)
    const token =localStorage.getItem("token")
    const closeCalenderAddTask = () => {
        setOpen(false)
    }
    axios.get("http://localhost:1813/dashboard/getAllEvent", {
        headers: {
            Accept: "Application/json",
            Authorization: "Bearer " + token
        }
    }).then((res) => setAllEvents(res.data.getAllEvent)).catch((err) => console.log(err))
    const myEventsList = [
        {
            title: "Big Meeting",
            allDay: true,
            start: new Date(2023, 9, -29),
            end: new Date(2023, 9, -29)
        },
        {
            title: "Big Meeting",
            allDay: true,
            start: new Date(2023, 8, 3),
            end: new Date(2023, 8, 6)
        }
    ]
    return (
        <div className='w-full h-full'>
            <CalenderAddTask status={{ open, closeCalenderAddTask }} />
            <div>
                {/* <Calendar
                    localizer={localizer}
                    events={allEvents}
                    startAccessor="start"
                    endAccessor="end"
                    className={`${usecon.darkMode ? "darkContainer" : "bg-white"} `}
                    style={{ height: "1000px", color: `${usecon.darkMode ? "white" : "black"}`, width: "100%", borderRadius: "5px ", boxShadow: "1px 1px 10px 15px rgba(0 , 0 ,0 ,.1)", margin: "0 auto", padding: "20px 10px " }}
                // className={`${usecon.darkMode?"darkMainColor text-white":"bg-white"} `}
                /> */}
                {/* <Calende /> */}
            </div>
        </div>
    )
}
export default CalenderContent