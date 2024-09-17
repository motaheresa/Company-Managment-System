import React, { useContext } from 'react'
import { MdOutlineClose } from "react-icons/md"
import { BiLink } from "react-icons/bi"
import { CreateContext } from '../Context/Context'
import { Link } from 'react-router-dom'

const SentEmailFromRight = () => {
    const usecon = useContext(CreateContext)
    return (
        <div className={`${usecon.sentEmails ? "ShowNotificationNav" : "HideNotificationNav"} fixed overflow-y-auto right-0 px-4 py-4 top-0 bottom-0 h-full w-1/3 bg-white shadow-2xl rounded-xl `}>
            <div>
                <div className='flex items-center border-b  pb-3 justify-between'>
                    <h5 className="tracking-wider OriginalColor font-medium">Sent</h5>
                    <div onClick={usecon.HideEmailSentFunc} className='cursor-pointer duration-300 NotificationCloseMark border rounded-full text-2xl darkgrayColor'>
                        <MdOutlineClose />
                    </div>
                </div>
                <div className="flex flex-col gap-4 my-8">
                    <Link to="/onesentemails" className='text-decoration-none'>
                        <div className=" flex flex-col border-b pb-2">
                            <div className="flex items-center justify-between w-full">
                                <div className='text-lg text-gray-800'>
                                    Salma Ayman
                                </div>
                                <div className='flex text-gray-600 items-center'>
                                    <div>Tuesday</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div className='text-gray-800 text-sm tracking-wider font-medium'>
                                    Couleur Palata
                                </div>
                                <div className='text-xl text-gray-600'>
                                    <BiLink />
                                </div>
                            </div>
                            <div className='lightgrayColor text-sm tracking-wider flex items-center gap-1.5'>
                                [cid:image001.jpg@1D9E008.FB632800]
                            </div>
                            <div className='lightgrayColor text-sm tracking-wider flex items-center gap-1.5'>
                                [cid:image003.jpg@1D9E008.FB632800] Salma Ayman....
                            </div>
                        </div>
                    </Link>
                    <div className=" flex flex-col border-b pb-2">
                        <div className="flex items-center justify-between w-full">
                            <div className='text-lg'>
                                Salma Ayman
                            </div>
                            <div className='flex text-gray-600 items-center'>
                                <div>Tuesday</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className='text-gray-800 text-sm tracking-wider font-medium'>
                                Couleur Palata
                            </div>
                            <div className='text-xl text-gray-600'>
                                <BiLink />
                            </div>
                        </div>
                        <div className='lightgrayColor text-sm tracking-wider flex items-center gap-1.5'>
                            [cid:image001.jpg@1D9E008.FB632800]
                        </div>
                        <div className='lightgrayColor text-sm tracking-wider flex items-center gap-1.5'>
                            [cid:image003.jpg@1D9E008.FB632800] Salma Ayman....
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SentEmailFromRight
