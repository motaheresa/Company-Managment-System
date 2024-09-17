import React from 'react'
import PageReport from './PageReport'
import TopHeadbar from '../TopHeadbar/TopHeadbar'

const Terminated = () => {
  return (
    <div className='mx-4'>
        <TopHeadbar />
        <PageReport url='Terminated' headTable={"Terminated"} />
    </div>
  )
}

export default Terminated