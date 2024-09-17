import React, { useContext } from 'react'
import { MdOutlineClose } from "react-icons/md"
import "./NotificationFromRight.css"
import image from "../images/profile.png"
import { ImClock } from "react-icons/im"
import { CreateContext } from '../Context/Context'

const NotificationFromRight = ({status}) => {
    const usecon=useContext(CreateContext)
    return(
        <div className={`${status.status?"ShowNotificationNav":"HideNotificationNav"} ${usecon.darkMode?"darkContainer":"bg-white"} fixed z-40 right-0 px-4 py-4 top-0 bottom-0 h-full w-96 shadow-xl rounded-xl `}>
            <div>
                <div className='flex items-center border-b pb-3 justify-between'>
                    <h5 className="tracking-wider OriginalColor font-medium">Notification</h5>
                    <div onClick={status.CloseNotificationSideBar} className={`cursor-pointer duration-300  ${usecon.darkMode?'xmarkBorder':"border NotificationCloseMark darkgrayColor"} rounded-full text-2xl `}>
                        <MdOutlineClose />
                    </div>
                </div>
                <div className="flex flex-col gap-4 my-8">
                    <div className="flex items-center gap-4">
                        <div className='w-10'>
                            <img src={image} alt="" />
                        </div>
                        <div className="flex flex-col">
                            <div><span className={`${usecon.darkMode&&"text-white"} font-semibold tracking-wider`}>Salma</span>
                                <span className='lightgrayColor text-md tracking-wider'> Sent Message</span>
                            </div>
                            <div className='lightgrayColor flex items-center gap-1.5'>
                                <div className='text-sm'><ImClock /></div>
                                <div className='tracking-wider'>30 mins ago</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationFromRight
