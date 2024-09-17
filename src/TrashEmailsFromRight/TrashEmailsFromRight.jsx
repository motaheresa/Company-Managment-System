import React, { useContext } from 'react'
import { MdOutlineClose } from "react-icons/md"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { CreateContext } from '../Context/Context'
import "./TrashEmailsFromRight.css"

const TrashEmailsFromRight = () => {
    const usecon=useContext(CreateContext)
    return (
        <div className={`${usecon.TrashEmails ? "ShowNotificationNav3" : "HideNotificationNav3"} z-50 fixed overflow-y-auto right-0 px-4 py-4 top-0 bottom-0 h-full w-96 bg-white shadow-2xl rounded-xl `}>
            <div className='h-full'>
                <div className='flex items-center border-b  pb-3 justify-between'>
                    <h5 className="tracking-wider OriginalColor font-medium">Trash</h5>
                    <div onClick={usecon.HideTrashEmailsFunc} className='cursor-pointer duration-300 NotificationCloseMark border rounded-full text-2xl darkgrayColor'>
                        <MdOutlineClose />
                    </div>
                </div>
                <div className='flex items-center justify-center '>
                    <div className='text-2xl mt-44 tracking-wider text-gray-500 font-medium'>
                        No Mail
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrashEmailsFromRight