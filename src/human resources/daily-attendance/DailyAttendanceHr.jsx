import React, { useState } from "react";
import TopHeadbar from "../TopHeadbar/TopHeadbar";
import Success from "../../Atoms/alerts/Success";
import Filled from "../../Atoms/alerts/Filled";
import Loading from "../../Atoms/alerts/Loading";
import { Form } from "./atoms/Form";

const DailyAttendanceHr = () => {
  const [data, setData] = useState([]);
  const [cloneData, setCloneData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTableAppeared, setIsTableAppeared] = useState(false);
  const [status, setStatus] = useState("");
  return (
    <div className="px-4">
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
        data={data}
        status={status}
        setStatus={setStatus}
        setData={setData}
        setLoading={setLoading}
        cloneData={cloneData}
        setCloneData={setCloneData}
        isTableAppeared={isTableAppeared}
        setIsTableAppeared={setIsTableAppeared}
      />
    </div>
  );
};

export default DailyAttendanceHr;

