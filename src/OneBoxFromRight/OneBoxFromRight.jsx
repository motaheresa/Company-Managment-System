import React, { useContext } from "react";
import image from "../images/profile.png";
import { ImClock } from "react-icons/im";
import { MdOutlineClose } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CreateContext } from "../Context/Context";
import image2 from "../images/tra.png"
import "./OneBoxFromRight.css";
import { Link } from "react-router-dom";

const OneBoxFromRight = () => {
    const usecon = useContext(CreateContext);
    return (
        <div
            className={`${usecon.oneInbox ? "ShowNotificationNav2" : "HideNotificationNav2"
                } fixed overflow-y-auto right-1/4 px-4 py-4 top-0 bottom-0 h-full w-2/4 bg-white shadow-2xl rounded-xl `}
        >
            <div>
                <div className=" border-b flex items-center justify-between pb-3">
                    <div className="flex item-center gap-3">
                        <div>
                            <img src={image} className="w-12" alt="" />
                        </div>
                        <div>
                            <div className="text-black">
                                From: <span className="text-gray-500 tracking-wider">
                                    salma.ayman@atmmgrouo.com
                                </span>
                            </div>

                            <div className="text-black">
                                To: <span className="text-gray-500 tracking-wider">IT Department</span>
                            </div>
                            <div className="text-gray-600">
                                31 Augest 2023, 9:32 AM
                            </div>
                        </div>
                    </div>
                    <div onClick={usecon.HideoneInboxFunc} className='cursor-pointer duration-300 NotificationCloseMark border rounded-full text-2xl darkgrayColor'>
                        <MdOutlineClose />
                    </div>
                </div>
                <div className="flex flex-col gap-4 my-8">
                    <div className="flex items-center gap-4 my-4">
                        <div>
                            <img className="w-20" src={image2} alt="" />
                        </div>
                        <div className="flex flex-col gap-3 border-l pl-6">
                            <h5 className="tracking-wider text-gray-500">BROKERAGE</h5>
                            <div className="text-gray-400">
                                <div>NAEEM Brokerage</div>
                                <div>A Member of NAEMM Holding</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h5 className="m-0 p-0 tracking-wider OriginalColor">Salma Ayman</h5>
                        <div className="text-gray-400">Senior Accountnant</div>
                    </div>
                    <div className="mt-6 ">
                        <div className="text-gray-400">
                            6th of October City - Giza (P.O. 12577,Egypt)
                        </div>
                        <div>
                            Tel: <span className="text-gray-400">### #### ###</span>
                        </div>
                        <div>
                            Direct: <span className="text-gray-400"> ********</span>
                        </div>
                        <div>
                            Fax: <span className="text-gray-400"> ********</span>
                        </div>
                        <div className="flex flex-col ">
                            <Link to="/emailIcon">Salma.Ayman@naeemholding.com</Link>
                            <Link to="/emailIcon">www.naeemholding.com</Link>
                        </div>
                        <div
                            style={{ fontSize: "15px", wordSpacing: "4px", lineHeight: "18px" }}
                            className="mt-4 text-gray-500"
                        >
                            This e-mail and any files transmitted with it are confidential and
                            solely intended for the use of the recipient(s). Any review,
                            retransmission, dissemination or other use of, or taking any action
                            in reliance upon this information by persons or entities other than
                            the intended recipient(s) is prohibited. E-mails are susceptible to
                            alteration and their integrity cannot be guaranteed. NAEEM Brokerage
                            shall not be liable for this e-mail if modified or falsified. If you
                            are not the intended recipient of this e-mail, please delete it
                            immediately from your system and notify the sender of the wrong
                            delivery and the mail deletion. Any views or opinions presented
                            within this e-mail are solely those of the sender and do not
                            necessarily reflect those of NAEEM Brokerage unless otherwise
                            specifically stated.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OneBoxFromRight;
