const apiAuth = (token) => {
  
  if(!token) return null
    return {
      headers: {
          Accept: "Application/json",
          Authorization: "Bearer " + token,
        }
    };
  };
  
  export default apiAuth;
  