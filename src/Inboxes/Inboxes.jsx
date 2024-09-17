import React, { useContext } from 'react'
// import image from "../images/profile.png"
// import { ImClock } from "react-icons/im"
import { MdOutlineClose } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md"
import "./Inboxes.css"
import { CreateContext } from '../Context/Context'
import { BsThreeDots } from "react-icons/bs"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Inboxes = ({ status }) => {
    const usecon = useContext(CreateContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseShow = () => {
        setAnchorEl(null);
        handleshow()
    };
    function handleshow() {
        usecon.ShowoneInboxFunc()
    }
    const handleCloseDelete=()=>{
        setAnchorEl(null);
        handleDelete()
    }
    function handleDelete(){
        window.confirm("Are you sure you want to delete this message?")
    }

    return (
        <div className={`${status.InboxesVar ? "ShowNotificationNav" : "HideNotificationNav"} fixed overflow-y-auto right-0 px-4 py-4 top-0 bottom-0 h-full w-1/3 bg-white shadow-2xl rounded-xl `}>
            <div>
                <div className='flex items-center border-b  pb-3 justify-between'>
                    <h5 className="tracking-wider OriginalColor font-medium">Inbox</h5>
                    <div onClick={status.InboxesFunc} className='cursor-pointer duration-300 NotificationCloseMark border rounded-full text-2xl darkgrayColor'>
                        <MdOutlineClose />
                    </div>
                </div>

                <div className="flex flex-col gap-4 my-8">
                    <div className="cursor-pointer flex  flex-col border-b pb-2">
                        <div className="flex items-center justify-between w-full">
                            <div className='text-lg inboxemailbefore'>
                                salma.ayman@atmmgrouo.com
                            </div>
                            <div className='flex text-gray-600 mr-2 items-center'>
                                {/* <div className='text-xl'><BsThreeDots /></div> */}
                                <div>
                                    <div
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        className='text-xl px-1 py-1'
                                    >
                                        <BsThreeDots />
                                    </div>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >

                                        <MenuItem className='asx' onClick={handleCloseShow}>Show</MenuItem>
                                        <MenuItem className='asx' onClick={handleCloseDelete}>Delete</MenuItem>
                                    </Menu>

                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className='text-gray-800'>
                                Kaspersky - Price List Aug 2023
                            </div>
                            <div className='flex text-gray-600 items-center'>
                                <div>9:42 PM</div>
                                <div onClick={()=>usecon.ShowoneInboxFunc()} className='text-xl'><MdKeyboardArrowRight /></div>
                            </div>
                        </div>
                        <div className='lightgrayColor text-sm tracking-wider flex items-center gap-1.5'>
                            CAUTION: This email originated outside the organization.
                        </div>
                        <div className='lightgrayColor text-sm flex items-center gap-1.5'>
                            Do not click any links or attachments unless you know the....
                        </div>
                    </div>
                    <div className="flex flex-col border-b pb-2">
                        <div className="flex items-center justify-between w-full">
                            <div className='text-lg inboxemailbefore'>
                                salma.ayman@atmmgrouo.com
                            </div>
                            <div className='flex text-gray-600 items-center'>
                                <div>9:42 PM</div>
                                <div className='text-xl'><MdKeyboardArrowRight /></div>
                            </div>
                        </div>
                        <div className='text-gray-800'>
                            Kaspersky - Price List Aug 2023
                        </div>
                        <div className='lightgrayColor text-sm tracking-wider flex items-center gap-1.5'>
                            CAUTION: This email originated outside the organization.
                        </div>
                        <div className='lightgrayColor text-sm flex items-center gap-1.5'>
                            Do not click any links or attachments unless you know the....
                        </div>
                    </div>
                    <div className="flex flex-col border-b pb-2">
                        <div className="flex items-center justify-between w-full">
                            <div className='text-lg inboxemailbefore'>
                                salma.ayman@atmmgrouo.com
                            </div>
                            <div className='flex text-gray-600 items-center'>
                                <div>9:42 PM</div>
                                <div className='text-xl'><MdKeyboardArrowRight /></div>
                            </div>
                        </div>
                        <div className='text-gray-800'>
                            Kaspersky - Price List Aug 2023
                        </div>
                        <div className='lightgrayColor text-sm tracking-wider flex items-center gap-1.5'>
                            CAUTION: This email originated outside the organization.
                        </div>
                        <div className='lightgrayColor text-sm flex items-center gap-1.5'>
                            Do not click any links or attachments unless you know the....
                        </div>
                    </div>
                    <div className="flex flex-col border-b pb-2">
                        <div className="flex items-center justify-between w-full">
                            <div className='text-lg inboxemailbefore'>
                                salma.ayman@atmmgrouo.com
                            </div>
                            <div className='flex text-gray-600 items-center'>
                                <div>9:42 PM</div>
                                <div className='text-xl'><MdKeyboardArrowRight /></div>
                            </div>
                        </div>
                        <div className='text-gray-800'>
                            Kaspersky - Price List Aug 2023
                        </div>
                        <div className='lightgrayColor text-sm tracking-wider flex items-center gap-1.5'>
                            CAUTION: This email originated outside the organization.
                        </div>
                        <div className='lightgrayColor text-sm flex items-center gap-1.5'>
                            Do not click any links or attachments unless you know the....
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inboxes
