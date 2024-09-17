import { createContext } from "react"
import { useFetch } from "../../network/useFetch";


export const attendance_context=createContext(null);
export const Emp_Attendance=({children})=>{
    const {data,loading,error}=useFetch("/me/my-attendance")
    
    return(
        <attendance_context.Provider value={{data,loading,error}}>
            {children}
        </attendance_context.Provider>
    )
}