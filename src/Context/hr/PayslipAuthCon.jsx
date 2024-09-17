import React, { createContext, useState } from 'react'
export const PaylsipAuthManagement = createContext();
const PayslipAuthCon = ({children}) => {
    const [password,setPassword]=useState("");
    const[isSubmitted,setIsSubmitted]=useState(false)
  return (
    <div>
        <PaylsipAuthManagement.Provider value={{password,setPassword,isSubmitted,setIsSubmitted}}>
            {children}
        </PaylsipAuthManagement.Provider>
        
    </div>
  )
}

export default PayslipAuthCon