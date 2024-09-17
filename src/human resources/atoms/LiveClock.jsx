import React, { useState, useEffect } from 'react';

function LiveClock() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateClock = () => {
            let status="AM";
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            if(hours>12) hours-=12;status="PM";

            hours = hours < 10 ? `0${hours}` : hours;
            minutes = minutes < 10 ? `0${minutes}` : minutes;

            setTime(`${hours}:${minutes} ${status}`);
        };

        const intervalId = setInterval(updateClock, 1000);
        updateClock(); // Initial call to set the time immediately

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return <div className="clock">{time}</div>;
}

export default LiveClock;
