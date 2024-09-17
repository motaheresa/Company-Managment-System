import axios from "axios";
import React, { useEffect, useState } from "react";
import apiAuth from "../../Atoms/apiAuth";
import Form from "./atoms/Form";
import Loading from "../../Atoms/alerts/Loading";
import Success from "../../Atoms/alerts/Success";
import Filled from "../../Atoms/alerts/Filled";

const PageReport = ({ url,headTable }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTableAppeared, setIsTableAppeared] = useState(false);
  const [status, setStatus] = useState("");
  return (
    <div>
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
      <Form
        status={status}
        data={data}
        setData={setData}
        setStatus={setStatus}
        setLoading={setLoading}
        isTableAppeared={isTableAppeared}
        setIsTableAppeared={setIsTableAppeared}
        url={url}
        headTable={headTable}
      />
    </div>
  );
};

export default PageReport;
