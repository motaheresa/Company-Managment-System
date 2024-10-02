import React, { useContext, useEffect, useState } from 'react'
import "./CalenderAddTask.css"
import { IoCloseSharp } from "react-icons/io5"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { CreateContext } from '../../Context/Context';
import axios from 'axios';
import { useTranslation } from 'react-i18next';



const CalenderAddTask = ({ closeCalenderAddTask }) => {
    const {t} = useTranslation()
    const usecon = useContext(CreateContext)
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [details, setDetails] = useState("")
    const token = localStorage.getItem("token")
    const addEventFunc = (e) => {
        e.preventDefault()
        closeCalenderAddTask()
        window.location.reload()
        axios.post("http://localhost:1813/dashboard/addEvent", {
            title,
            date,
            details,
        }, {
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token
            }
        })
            .then((res) => console.log(res))
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        // <div>
        <div className={`${usecon.open ? "ShowAddCalenderTask" : "HideAddCalenderTask"} fixed flex items-center justify-center w-screen h-screen left-0 top-0 z-30 CalenderAddTask rounded`}>
            <div className={`${usecon.darkMode ? "darkHidingContainer" : "bg-white"} w-2/4 px-10 py-4  rounded-xl `}>
                <div className='border-b pb-2'>
                    <div className="flex item-center justify-between">
                        <h5 className={`${usecon.darkMode && "text-white"} tracking-wider`}>
                            {t("New Event")}
                        </h5>
                        <span onClick={closeCalenderAddTask} className={`text-2xl hover:bg-red-400 cursor-pointer hover:text-white ${usecon.darkMode ? "text-white" : ""} border px-1 py-1 rounded-full flex items-center justify-center`}>
                            <IoCloseSharp />
                        </span>
                    </div>
                </div>
                <div className="w-11/12 mx-auto mt-6">
                    <form
                        onSubmit={(e) => addEventFunc(e)}
                        className='w-full'
                    >
                        <div className='w-full  tracking-wider'>
                            <input
                                required
                                type='text'
                                className={`${usecon.darkMode ? "inputDark tracking-wider" : "tracking-wider"} text-md border rounded px-2 py-2.5 w-full`}
                                id="outlined-required"
                                placeholder="Add Event Now"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className='w-full  tracking-wider'>
                            <input
                                required
                                className={` my-2 ${usecon.darkMode ? "inputDark tracking-wider" : "tracking-wider"} text-md border rounded px-2 py-2.5 w-full`}
                                id="outlined-required"
                                value={date}
                                type='date'
                                onChange={(e) => setDate(e.target.value)}
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>

                        <div className='w-full  tracking-wider'>
                            <textarea
                                className={` my-2 ${usecon.darkMode ? "inputDark tracking-wider" : "tracking-wider"} text-md border rounded px-2 py-2.5 w-full`}
                                id="outlined-required"
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                style={{ height: '100px' }}
                                placeholder=" Add Details Event here"
                            />
                        </div>
                        <div className='flex items-center py-4 justify-center gap-2'>
                            <Button type='submit'>Save</Button>
                            <Button onClick={closeCalenderAddTask} className='btn btn-danger'>Cancel</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CalenderAddTask