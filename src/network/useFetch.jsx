import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CreateContext } from "../Context/Context";

export const useFetch = (endpoint, dependencies = [], params = "") => {
  const [loading, setLoading] = useState(null);
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      console.log("asd",storedToken);
      
        setToken(storedToken);
    } else {
        // Handle token not being available
        console.error('No token found in localStorage');
    }
}, []);
  useEffect(() => {
   
    
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint, {
          headers: {
            Accept: "Application/json",
            Authorization: "Bearer " + token,
          },
          signal,
        });
        setData(response.data);
        setError(null);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("fetch aborted");
        } else {
          console.log(error);
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchData();
    }
    return () => {
      controller.abort();
    };
  }, [endpoint, token]);
  return { data, loading, error };
};
