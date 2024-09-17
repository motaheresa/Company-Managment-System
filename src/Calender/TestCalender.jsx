import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import resourceTimelinePlugin from '@fullcalendar/resource-timeline' // a plugin!
const App2 = () => {
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                
                events={[
                    { title: 'event 1', date: '2023-09-01' },
                    { title: 'event 2', date: '2023-09-02' }
                ]}
            />
             {/* <FullCalendar schedulerLicenseKey="XXX" plugins={[ resourceTimelinePlugin ]} /> */}
        </div>
    );
}

export default App2