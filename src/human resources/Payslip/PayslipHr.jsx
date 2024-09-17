import React, { useContext, useState } from "react";
import TopHeadbar from "../TopHeadbar/TopHeadbar";
import Form from "./atoms/Form";
import Loading from "../../Atoms/alerts/Loading";
import Success from "../../Atoms/alerts/Success";
import Filled from "../../Atoms/alerts/Filled";
import { PaylsipAuthManagement } from "../../Context/hr/PayslipAuthCon";
import PassPaylip from "./auth/PassPaylip";
import { useNavigate } from "react-router";

const PayslipHr = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTableAppeared, setIsTableAppeared] = useState(false);
  const [status, setStatus] = useState("");
  const navigate=useNavigate(null)
  const { isSubmitted,password } = useContext(PaylsipAuthManagement);
  if(!isSubmitted){
    navigate("/hr/auth-payslip")
  }
  return (
    <div className="mx-4 min-h-screen relative">
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
      {password && (
        <Form
          status={status}
          data={data}
          setData={setData}
          setStatus={setStatus}
          setLoading={setLoading}
          isTableAppeared={isTableAppeared}
          setIsTableAppeared={setIsTableAppeared}
        />
      )}

      {/* </PayslipAuthCon> */}
    </div>
  );
};

export default PayslipHr;
