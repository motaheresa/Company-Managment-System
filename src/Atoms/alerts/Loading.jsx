import { Alert } from "@mui/material";
import React from "react";

const Loading = ({message="Processing your request..."}) => {
  return (
    <Alert style={{zIndex:"10000"}} variant="filled"  severity="info" className="tracking-wider w-1/4 mx-auto fixed top-2 left-2/4 -translate-x-2/4">
      {message}
    </Alert>
  );
};

export default Loading;
