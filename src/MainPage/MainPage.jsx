import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../sidebar/SideBar'
import DashboardContent from '../DashboardConent/DashboardContent'
import { CreateContext } from '../Context/Context'
import axios from 'axios'


const MainPage = () => {
    const [attendanceDetails,setAttendanceDetails]=useState([])
    const usecon = useContext(CreateContext)
    const token = localStorage.getItem("token")
     
    useEffect(() => {
        usecon.SET_CHECK_IF_LOGIN(true)
        axios.get("http://localhost:3005/dashboard/userDetails", {
            headers: {
                Accept: "Application/json",
                Authorization: "Bearer " + token
            }
        })
            .then((res) => usecon.setUser(res.data.user))
            .catch((err) => {
                console.log(err)
            })
            
    }, [])
    return (
        <>
            <div className='flex  pb-0'>
                <div className="w-fit">
                    <SideBar />
                </div>
                <div className="w-full">
                    <DashboardContent className="w-full" />
                </div>
            </div>
        </>
    )
}

export default MainPage