import React, { useEffect, useState } from "react";
import image from "../images/naeem_logo_1024white.png";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Alert, Button } from "react-bootstrap";
import "./EmailForIcon.css"

const EmailForIcon = () => {
    const AlertFunc = () => {
        window.confirm("Message is sent to draft");
    };
    const [CcBcc, SetCcBcc] = useState(false)
    return (
        <div className="w-full min-h-screen flex items-center py-20 justify-center  ">
            <div className="w-2/4  py-5 bg-white shadow px-10 rounded-xl">
                <div className="pb-10 border-b-2">
                    <Form>
                        <h5 className="tracking-wider OriginalColor pb-3">New Message</h5>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <Form.Control
                                placeholder="To:"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                required
                            />
                        </InputGroup>
                        {
                            !CcBcc &&
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    value="Cc/Bcc, From : Salma.Ayman@naeemholding.com"
                                    onClick={() => SetCcBcc(true)}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        }
                        {
                            CcBcc &&
                            <>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    <Form.Control
                                        placeholder="Cc: "
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    <Form.Control
                                        placeholder="Bcc: "
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    <Form.Control
                                        value="From : Salma.Ayman@naeemholding.com"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </>
                        }
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            {/* <Form.Label></Form.Label> */}
                            <Form.Control
                                type="text"
                                placeholder="Subject: "
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                            />
                        </Form.Group>
                        <div className="w-full">
                            <textarea className="w-full h-fit focus:outline-none focus:border-none outline-none border-none"></textarea>
                        </div>
                    </Form>
                </div>
                <div className="flex items-center gap-4 my-4">
                    <div>
                        <img className="w-20" src={image} alt="" />
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
                    <div className="flex items-center gap-2 pt-10 justify-center">
                        <button className=" btn btn-primary OriginalBackground hover:opacity-60 duration-300 NoOutlines">
                            Send Message
                        </button>
                        <Link to="/mainPage" className="text-decoration-none ">
                            <Button
                                onClick={() => AlertFunc()}
                                className=" OriginalBackground hover:opacity-60 duration-300 NoOutlines"
                            >
                                Send To Draft
                            </Button>
                        </Link>

                        <Link to="/mainPage" className="text-decoration-none ">
                            <Button className=" OriginalBackground hover:opacity-60 duration-300 NoOutlines">
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailForIcon;
