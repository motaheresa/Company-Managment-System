import React from "react";
import "./InboxEmail.css";
import image from "../images/naeem_logo_1024white.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BiLink } from "react-icons/bi";

const InboxEmail = () => {
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white w-2/5 rounded-lg ">
                    <div className="px-3 py-4">
                        <div className="flex items-center justify-between">
                            <div className="text-2xl border-b w-full py-1 OriginalColor font-semibold tracking-wider">
                                Inbox
                            </div>
                            {/* <div>
                                <img src={image} className='w-20' alt="" />
                            </div> */}
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="border-b py-1">
                                <div className="flex items-center justify-between">
                                    <div className="emailBefore font-medium pl-4">
                                        Salma.Ayman@atmmgroup.com
                                    </div>
                                    <div className="lightgrayColor flex items-center gap-1">
                                        <span>9:42 PM</span>
                                        <span className="text-xl">
                                            <MdOutlineKeyboardArrowRight />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="darkgrayColor pl-4">
                                        Kaspersky - Price List Aug. 2023
                                    </div>
                                    <div className="lightgrayColor flex items-center gap-1">
                                        {/* <span>9:42 PM</span> */}
                                        <span className="text-xl">
                                            <BiLink />
                                        </span>
                                    </div>
                                </div>
                                <div className="pl-4 lightgrayColor">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                                    sed laudantium dolore amet ea cum laborum culpa ullam
                                    eligendi! Harum dolor beatae......
                                </div>
                            </div>
                            <div className="border-b py-1">
                                <div className="flex items-center justify-between">
                                    <div className="emailBefore font-medium pl-4">
                                        Ali.Maher
                                    </div>
                                    <div className="lightgrayColor flex items-center gap-1">
                                        <span>7:12 PM</span>
                                        <span className="text-xl">
                                            <MdOutlineKeyboardArrowRight />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="darkgrayColor pl-4">
                                        Smiling 2 Pack Case Built in...
                                    </div>
                                    <div className="lightgrayColor flex items-center gap-1">
                                        {/* <span>9:42 PM</span> */}
                                        <span className="text-xl">
                                            <BiLink />
                                        </span>
                                    </div>
                                </div>
                                <div className="pl-4 lightgrayColor">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                                    sed laudantium dolore amet ea cum laborum culpa ullam
                                    eligendi! Harum dolor beatae.....
                                </div>
                            </div>
                            <div className="border-b py-1">
                                <div className="flex items-center justify-between">
                                    <div className="emailBefore font-medium pl-4">
                                        Salma.Ayman@atmmgroup.com
                                    </div>
                                    <div className="lightgrayColor flex items-center gap-1">
                                        <span>9:42 PM</span>
                                        <span className="text-xl">
                                            <MdOutlineKeyboardArrowRight />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="darkgrayColor pl-4">
                                        Kaspersky - Price List Aug. 2023
                                    </div>
                                    <div className="lightgrayColor flex items-center gap-1">
                                        {/* <span>9:42 PM</span> */}
                                        <span className="text-xl">
                                            <BiLink />
                                        </span>
                                    </div>
                                </div>
                                <div className="pl-4 lightgrayColor">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                                    sed laudantium dolore amet ea cum laborum culpa ullam
                                    eligendi! Harum dolor beatae......
                                </div>
                            </div>
                            <div className="border-b py-1">
                                <div className="flex items-center justify-between">
                                    <div className="emailBefore font-medium pl-4">
                                        Ali.Maher
                                    </div>
                                    <div className="lightgrayColor flex items-center gap-1">
                                        <span>7:12 PM</span>
                                        <span className="text-xl">
                                            <MdOutlineKeyboardArrowRight />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="darkgrayColor pl-4">
                                        Smiling 2 Pack Case Built in...
                                    </div>
                                    <div className="lightgrayColor flex items-center gap-1">
                                        {/* <span>9:42 PM</span> */}
                                        <span className="text-xl">
                                            <BiLink />
                                        </span>
                                    </div>
                                </div>
                                <div className="pl-4 lightgrayColor">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                                    sed laudantium dolore amet ea cum laborum culpa ullam
                                    eligendi! Harum dolor beatae.....
                                </div>
                            </div>
                            <div className="border-b py-1">
                                <div className="flex items-center justify-between">
                                    <div className="emailBefore font-medium pl-4">
                                        Salma.Ayman@atmmgroup.com
                                    </div>
                                    <div className="lightgrayColor flex items-center gap-1">
                                        <span>9:42 PM</span>
                                        <span className="text-xl">
                                            <MdOutlineKeyboardArrowRight />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="darkgrayColor pl-4">
                                        Kaspersky - Price List Aug. 2023
                                    </div>
                                    <div className="lightgrayColor flex items-center gap-1">
                                        {/* <span>9:42 PM</span> */}
                                        <span className="text-xl">
                                            <BiLink />
                                        </span>
                                    </div>
                                </div>
                                <div className="pl-4 lightgrayColor">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                                    sed laudantium dolore amet ea cum laborum culpa ullam
                                    eligendi! Harum dolor beatae......
                                </div>
                            </div>
                            <div className="border-b py-1">
                                <div className="flex items-center justify-between">
                                    <div className="emailBefore font-medium pl-4">
                                        Ali.Maher
                                    </div>
                                    <div className="lightgrayColor flex items-center gap-1">
                                        <span>7:12 PM</span>
                                        <span className="text-xl">
                                            <MdOutlineKeyboardArrowRight />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="darkgrayColor pl-4">
                                        Smiling 2 Pack Case Built in...
                                    </div>
                                    <div className="lightgrayColor flex items-center gap-1">
                                        {/* <span>9:42 PM</span> */}
                                        <span className="text-xl">
                                            <BiLink />
                                        </span>
                                    </div>
                                </div>
                                <div className="pl-4 lightgrayColor">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                                    sed laudantium dolore amet ea cum laborum culpa ullam
                                    eligendi! Harum dolor beatae.....
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InboxEmail;
