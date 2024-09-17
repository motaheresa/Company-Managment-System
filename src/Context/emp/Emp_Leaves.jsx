import { createContext } from "react";
import { useFetch } from "../../network/useFetch";

export const leaves_context = createContext(null);
export const Emp_Leaves = ({children}) => {
  const { data, error, loading } = useFetch("/me/my-leaves");
  return (
    <>
      <leaves_context.Provider value={{ data, error, loading }}>
        {children}
      </leaves_context.Provider>
    </>
  );
};
