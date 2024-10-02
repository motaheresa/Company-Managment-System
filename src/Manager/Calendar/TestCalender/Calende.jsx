import React, { useContext, useEffect, useState } from 'react'
import { TestCalender } from './inde'
import axios from 'axios'
import apiAuth from '../../../Atoms/apiAuth'

const Calende = () => {
    const [events, setEvents] = useState([])
    const [holiday, setHoliday] = useState([])
    const [h, seth] = useState([])
    const token = localStorage.getItem("token")

    async function gh() {
        const url="http://localhost:1813/dashboard/getAllEvent"
        await axios.get(url,apiAuth(token))
            .then((res) => {
                res.data.getAllEvent.map((event) => {
                    // delete event.id
                    const day = new Date(event.date).getDate()
                    const month = new Date(event.date).getMonth()
                    const year = new Date(event.date).getFullYear()
                    event.date = new Date(year, month, day)
                    
                })
                setEvents(res.data.getAllEvent)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        gh()
        axios.get("http://localhost:1813/dashboard/yearHolidays", {
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token
            }
        })
            .then( (res2) => {

                res2.data.holidays.map((onedata) => {
                    const day = new Date(onedata.date_holy).getDate()
                    const month = new Date(onedata.date_holy).getMonth()
                    const year = new Date(onedata.date_holy).getFullYear()
                    onedata.date=new Date(year,month,day)
                    onedata.title=onedata.holiday_eng_name
                    onedata.details="None"
                    onedata.close=true
                })
                setHoliday(res2.data.holidays)
            }).catch((err2) => {
                console.log(err2)
            })
    }, [])
    return (
        <div>
            <TestCalender eventsArr={events.concat(holiday)} startingDate={new Date()} />
        </div>
    )
}

export default Calende