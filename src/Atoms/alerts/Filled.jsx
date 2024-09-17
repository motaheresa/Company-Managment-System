import { Alert } from "@mui/material";
import React from "react";

const Filled = ({message,setMessage}) => {
  const handleMessage=()=>{
    const time=setTimeout(() => {
      setMessage("")
    }, 3000);
    return ()=>clearTimeout(time)
  }
  setMessage&&handleMessage();
  return (
    <Alert style={{zIndex:"10000"}} variant="filled" role="alert" severity="error" className="tracking-wider w-1/4 mx-auto fixed top-2 left-2/4 -translate-x-2/4">
      {message}
    </Alert>
  );
};

export default Filled;
