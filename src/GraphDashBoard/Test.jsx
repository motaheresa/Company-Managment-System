import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { BiSolidUserCircle } from "react-icons/bi";
import "./Test.css"
import { motion } from "framer-motion"
import { Tooltip } from "@mui/material";
import { Button, OverlayTrigger } from "react-bootstrap";

const Test = () => {
    const [Blue, setBlue] = useState(false)
    const [red, setRed] = useState(false)
    const [orange, setOrange] = useState(false)
    const [green, setGreen] = useState(false)
    var message = "Total Leaves"
    var num = "60"
    if (Blue) {
        message = "Casual Leaves"
        num = " 4"
    } else if (red) {
        message = "Sick Leaves"
        num = " 8"
    } else if (orange) {
        message = "Annual Leaves"
        num = " 14"
    }
    else if (green) {
        message = "Remaining balance"
        num = " 18"
    }
    else {
        message = "Total Leaves"
    }
    const s1 = {
        background: "transparent"
    }
    const s2 = {
        opacity: "1"
    }
    const s3 = {
        fontFamily: "Helvetica, Arial, sans-serif",
        fill: "rgb(55, 61, 63)"
    }
    const s4 = {
        fontFamily: "Helvetica, Arial, sans-serif"
    }
    // bg-white border-none flex items-center justify-center w-11/12 mx-auto rounded-lg shadow py-16 my-6"
    return (
        <div className="z-20">
            <svg
                id="SvgjsSvg1145"
                width="744"
                height="330.5365853658537"

                // xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                // xmlns:xlink="http://www.w3.org/1999/xlink"
                // xmlns:svgjs="http://svgjs.com/svgjs"
                className=" apexcharts-svg"
                // xmlns:data="ApexChartsNS"
                transform="translate(0, 0)"
                style={s1}
            >
                <g
                    id="SvgjsG1147"
                    className="apexcharts-inner apexcharts-graphical"
                    transform="translate(100, 50)"//(251.5,0)
                >

                    <g
                        id="SvgjsG1151"
                        className="apexcharts-pie"
                    // data:innerTranslateX="0"
                    // data:innerTranslateY="-25"
                    >
                        <g id="SvgjsG1152" transform="translate(0, -5) scale(1)">
                            <circle
                                id="SvgjsCircle1153"
                                r="106.47804878048781"
                                cx="121.5"
                                cy="132.5"
                                fill="transparent"
                            ></circle>
                            <g id="SvgjsG1154" className="apexcharts-slices">
                                <g
                                    id="SvgjsG1155"
                                    className="apexcharts-series apexcharts-pie-series"
                                    seriesName="CasualxLeaves"
                                    rel="1"
                                // data:realIndex="0"
                                >
                                    <OverlayTrigger
                                        key="top"
                                        className="over"
                                        placement="top"
                                        overlay={
                                            <Tooltip id="tooltip-top">
                                                <div className="BlueBackToolTip px-3 py-1 rounded-lg text-white">
                                                    {message}
                                                </div>
                                            </Tooltip>
                                        }
                                    >
                                        <motion.path
                                            whileHover={() => setBlue(true)}
                                            onMouseLeave={() => setBlue(false)}
                                            id="SvgjsPath1156"
                                            d="M 121.50000000000001 7.231707317073159 A 125.26829268292684 125.26829268292684 0 0 1 246.082059868572 119.40589786969102 L 227.39475088828618 121.37001318923737 A 106.47804878048781 106.47804878048781 0 0 0 121.5 26.02195121951219 L 121.50000000000001 7.231707317073159 z"
                                            fill="rgba(51,102,255,1)"
                                            fill-opacity="1"
                                            stroke-opacity="1"
                                            stroke-linecap="butt"
                                            stroke-width="0"
                                            stroke-dasharray="0"
                                            className="apexcharts-pie-area apexcharts-donut-slice-0"
                                            index="0"
                                            j="0"
                                        // data:angle="84"
                                        // data:startAngle="0"
                                        // data:strokeWidth="0"
                                        // data:value="14"
                                        // data:pathOrig="M 121.50000000000001 7.231707317073159 A 125.26829268292684 125.26829268292684 0 0 1 246.082059868572 119.40589786969102 L 227.39475088828618 121.37001318923737 A 106.47804878048781 106.47804878048781 0 0 0 121.5 26.02195121951219 L 121.50000000000001 7.231707317073159 z"
                                        >

                                        </motion.path>


                                    </OverlayTrigger>

                                </g>

                                <g
                                    id="SvgjsG1157"
                                    className="apexcharts-series apexcharts-pie-series"
                                    seriesName="SickxLeaves"
                                    rel="2"
                                // data:realIndex="1"
                                ><OverlayTrigger
                                    key="right"
                                    className="over"
                                    placement="right"
                                    overlay={
                                        <Tooltip id="tooltip-right">
                                            <div className="RedBackToolTip px-3 py-1 rounded-lg text-white">
                                                {message}
                                            </div>
                                        </Tooltip>
                                    }
                                >
                                        <motion.path
                                            whileHover={() => setRed(true)}
                                            onMouseLeave={() => setRed(false)}
                                            id="SvgjsPath1158"
                                            d="M 246.082059868572 119.40589786969102 A 125.26829268292684 125.26829268292684 0 0 1 214.5924835037048 216.32084864046575 L 200.62861097814908 203.7477213443959 A 106.47804878048781 106.47804878048781 0 0 0 227.39475088828618 121.37001318923737 L 246.082059868572 119.40589786969102 z"
                                            fill="rgba(247,40,74,1)"
                                            fill-opacity="1"
                                            stroke-opacity="1"
                                            stroke-linecap="butt"
                                            stroke-width="0"
                                            stroke-dasharray="0"
                                            class="apexcharts-pie-area apexcharts-donut-slice-1"
                                            index="0"
                                            j="1"
                                        // data:angle="48"
                                        // data:startAngle="84"
                                        // data:strokeWidth="0"
                                        // data:value="8"
                                        // data:pathOrig="M 246.082059868572 119.40589786969102 A 125.26829268292684 125.26829268292684 0 0 1 214.5924835037048 216.32084864046575 L 200.62861097814908 203.7477213443959 A 106.47804878048781 106.47804878048781 0 0 0 227.39475088828618 121.37001318923737 L 246.082059868572 119.40589786969102 z"
                                        ></motion.path>
                                    </OverlayTrigger>
                                </g>
                                <g
                                    id="SvgjsG1159"
                                    className="apexcharts-series apexcharts-pie-series"
                                    seriesName="GiftedxLeaves"
                                    rel="3"
                                // data:realIndex="2"
                                >
                                    <OverlayTrigger
                                        key="right"
                                        className="over"
                                        placement="right"
                                        overlay={
                                            <Tooltip id="tooltip-right">
                                                <div className="OrangeBackToolTip px-3 py-1 rounded-lg text-white">
                                                    {message}
                                                </div>
                                            </Tooltip>
                                        }
                                    >
                                        <motion.path
                                            whileHover={() => setOrange(true)}
                                            onMouseLeave={() => setOrange(false)}
                                            id="SvgjsPath1160"
                                            d="M 214.5924835037048 216.32084864046575 A 125.26829268292684 125.26829268292684 0 0 1 2.362773958733925 171.21003129535927 L 20.233357864923846 165.40352660105538 A 106.47804878048781 106.47804878048781 0 0 0 200.62861097814908 203.7477213443959 L 214.5924835037048 216.32084864046575 z"
                                            fill="rgba(254,127,0,1)"
                                            fill-opacity="1"
                                            stroke-opacity="1"
                                            stroke-linecap="butt"
                                            stroke-width="0"
                                            stroke-dasharray="0"
                                            class="apexcharts-pie-area apexcharts-donut-slice-2"
                                            index="0"
                                            j="2"
                                        // data:angle="120"
                                        // data:startAngle="132"
                                        // data:strokeWidth="0"
                                        // data:value="20"
                                        // data:pathOrig="M 214.5924835037048 216.32084864046575 A 125.26829268292684 125.26829268292684 0 0 1 2.362773958733925 171.21003129535927 L 20.233357864923846 165.40352660105538 A 106.47804878048781 106.47804878048781 0 0 0 200.62861097814908 203.7477213443959 L 214.5924835037048 216.32084864046575 z"
                                        ></motion.path>
                                    </OverlayTrigger>
                                </g>
                                <g
                                    id="SvgjsG1161"
                                    className="apexcharts-series apexcharts-pie-series"
                                    seriesName="RemainingxLeaves"
                                    rel="4"
                                // data:realIndex="3"
                                >
                                    <OverlayTrigger
                                        key="top"
                                        className="over"
                                        placement="top"
                                        overlay={
                                            <Tooltip id="tooltip-top">
                                                <div className="GreenBackToolTip px-3 py-1 rounded-lg text-white">
                                                    {message}
                                                </div>
                                            </Tooltip>
                                        }
                                    >
                                        <motion.path
                                            whileHover={() => setGreen(true)}
                                            onMouseLeave={() => setGreen(false)}
                                            id="SvgjsPath1162"
                                            d="M 2.362773958733925 171.21003129535927 A 125.26829268292684 125.26829268292684 0 0 1 121.47813655855428 7.231709225018349 L 121.48141607477115 26.021952841265602 A 106.47804878048781 106.47804878048781 0 0 0 20.233357864923846 165.40352660105538 L 2.362773958733925 171.21003129535927 z"
                                            fill="rgba(1,195,83,1)"
                                            fill-opacity="1"
                                            stroke-opacity="1"
                                            stroke-linecap="butt"
                                            stroke-width="0"
                                            stroke-dasharray="0"
                                            className="apexcharts-pie-area apexcharts-donut-slice-3"
                                            index="0"
                                            j="3"
                                        // data:angle="108"
                                        // data:startAngle="252"
                                        // data:strokeWidth="0"
                                        // data:value="18"
                                        // data:pathOrig="M 2.362773958733925 171.21003129535927 A 125.26829268292684 125.26829268292684 0 0 1 121.47813655855428 7.231709225018349 L 121.48141607477115 26.021952841265602 A 106.47804878048781 106.47804878048781 0 0 0 20.233357864923846 165.40352660105538 L 2.362773958733925 171.21003129535927 z"
                                        ></motion.path>
                                    </OverlayTrigger>

                                </g>
                            </g>
                        </g>
                        <g
                            id="SvgjsG1163"
                            className="apexcharts-datalabels-group"
                            transform="translate(0, 0)"
                            style={s2}
                        >
                            <text
                                id="SvgjsText1164"
                                font-family="Helvetica, Arial, sans-serif"
                                x="121.5"
                                y="122.5"
                                text-anchor="middle"
                                dominant-baseline="auto"
                                font-size="29px"
                                font-weight="regular"
                                fill="#373d3f"
                                className="apexcharts-datalabel-label"
                                style={s3}
                            >
                                {
                                    message
                                }
                            </text>
                            <text
                                id="SvgjsText1165"
                                font-family="Helvetica, Arial, sans-serif"
                                x="121.5"
                                y="164.5"
                                text-anchor="middle"
                                dominant-baseline="auto"
                                font-size="26px"
                                font-weight="regular"
                                fill="#EC783D"
                                className="apexcharts-datalabel-value"
                                style={s4}
                            >
                                {num}
                            </text>
                        </g>
                    </g>

                </g>
            </svg>
        </div >
    );
};

export default Test;
