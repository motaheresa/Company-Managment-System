import React, { createContext, useContext } from "react";
import image from "../images/naeem_logo_1024white.png";
import { Link } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

const OneSentEmailFromRight = () => {
    // const usecon=useContext(createContext)
    return (
        <div className="w-full min-h-screen flex items-center py-20 justify-center  ">
            <div className="w-2/4  py-5 bg-white shadow px-10 rounded-xl">
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
                        Tel: <span className="text-gray-400">+20 0127 909 8049</span>
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
                    <div style={{ fontSize: "15px", wordSpacing: "4px", lineHeight: "18px" }} className="mt-4 text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                        praesentium quas dolore voluptatum laboriosam iure quos ut
                        temporibus accusantium. Aspernatur, nemo harum quaerat labore
                        perspiciatis aliquid tempore dolorum nisi. Officiis in nisi eligendi
                        adipisci sequi iure minus rerum distinctio ut, neque atque
                        accusantium sunt et magnam corporis nobis qui mollitia aliquid magni
                        repellat at maiores. Voluptates ea vitae veniam tenetur. Aut
                        possimus ipsa praesentium, iure voluptatem, tenetur quaerat fugiat,
                        similique temporibus necessitatibus est dicta tempore adipisci
                        laborum numquam natus dolorum nobis provident. Molestiae aspernatur
                        ex minima voluptatum fugit. Hic consequatur, nulla numquam explicabo
                        veniam et? Inventore quas ipsam aspernatur esse.nulla numquam explicabo
                        veniam et? Inventore quas ipsam aspernatur esse.
                    </div>
                    <div className="flex items-center gap-2 pt-10 justify-center">
                        <button className=" btn btn-primary borderBackgroundHover NoOutlines">Send Message</button>
                        <Link to="/mainPage" className="text-decoration-none ">
                            <Button className=" borderBackground">Cancel</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OneSentEmailFromRight;