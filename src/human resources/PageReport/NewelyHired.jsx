import React from 'react'
import TopHeadbar from '../TopHeadbar/TopHeadbar'
import PageReport from './PageReport'

const NewelyHired = () => {
  return (
    <div className='mx-4'>
        <TopHeadbar />
        <PageReport url='newly-hired' headTable={"Newly Hired"}  />
    </div>
  )
}

export default NewelyHired