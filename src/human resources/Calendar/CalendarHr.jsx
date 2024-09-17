import React from 'react'
import Calender from '../../Calender/Calender'
import TopHeadbar from '../TopHeadbar/TopHeadbar'

const CalendarHr = () => {
  return (
    <div className='px-4 pb-4'>
         <TopHeadbar />
        <Calender pos="hr" />
    </div>
  )
}

export default CalendarHr