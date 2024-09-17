import React, { useContext, useState } from 'react'
import { HiMiniXMark } from "react-icons/hi2"
import { HiOutlineDownload } from "react-icons/hi"
import { FiUpload } from "react-icons/fi"
import "./Attendence.css"
import { CreateContext } from '../../Context/Context'


const AttendanceFileDownload = () => {
    const usecon=useContext(CreateContext)    
    return (
        <div className={`AttendanceFileDownloadBackground ${usecon.AttendanceFileDownloadStatus?"flex":"hidden"} z-30 overflow-hidden items-center justify-center h-screen w-screen fixed`}>
            <div className=" bg-white py-4 rounded-md w-5/12 h-3/5">
                <div>
                    <div className='border-b '>
                        <div className='py-1 px-3 flex items-center justify-between'>
                            <h5 className='OriginalColor'>Import Attendance CSV File</h5>
                            <div onClick={()=>usecon.setAttendanceFileDownloadStatus(false)} className='text-2xl borderBackground  cursor-pointer rounded-lg border'><HiMiniXMark /></div>
                        </div>
                    </div>
                    <div className='mt-6 mx-3 flex items-center'>
                        Download Samble Product CSV File
                        <span className='px-2 flex items-center gap-1 w-fit ml-2 py-2 cursor-pointer borderBackgroundHover  rounded-md text-white font-medium'>
                            <span className='text-lg'><HiOutlineDownload /></span>Download
                        </span>
                    </div>
                    <div>
                        <span className='px-3 mt-6 flex items-center gap-1 w-fit ml-2 py-3 cursor-pointer borderBackgroundHover rounded-md text-white font-medium'>
                            <span className='text-lg'><FiUpload /></span>Choose file here
                        </span>
                    </div>
                    <div className='mt-36'>
                        <div className="border-t flex items-center justify-end gap-2 pt-4 px-3">
                            <div>
                                <button onClick={()=>usecon.setAttendanceFileDownloadStatus(false)} className='btn btn-primary borderBackground  px-4 py-2'>Cancel</button>
                            </div>
                            <div>
                                <button className='btn btn-primary borderBackgroundHover NoOutlines px-4 py-2'>Upload</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AttendanceFileDownload