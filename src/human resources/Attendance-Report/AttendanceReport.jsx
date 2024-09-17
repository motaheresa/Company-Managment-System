import React, { useState } from 'react'
import Loading from '../../Atoms/alerts/Loading';
import Success from '../../Atoms/alerts/Success';
import Filled from '../../Atoms/alerts/Filled';
import TopHeadbar from '../TopHeadbar/TopHeadbar';
import Form from './atoms/Form';

const AttendanceReport = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isTableAppeared, setIsTableAppeared] = useState(false);
    const [status, setStatus] = useState("");
  return (
    <div className="mx-4 relative">
      {loading && <Loading  />}
      {status == "Success" && (
        <Success
          message="Request Completed Successfully"
          setMessage={setStatus}
        />
      )}
      {status == "Failed" && (
        <Filled message="Error : Something went wrong" setMessage={setStatus} />
      )}
      <TopHeadbar />
        <Form
        status={status}
        data={data}
        setData={setData}
        setStatus={setStatus}
        setLoading={setLoading}
        isTableAppeared={isTableAppeared}
        setIsTableAppeared={setIsTableAppeared}
        />
    </div>
  )
}

export default AttendanceReport