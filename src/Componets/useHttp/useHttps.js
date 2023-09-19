import React, { useCallback, useState } from "react";
import axios from "axios";

const useHttp = () => {
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, resData) => {
    setError(null);
    try {
      const res = await axios[requestConfig.request](
        requestConfig.url,
        requestConfig.data ? requestConfig.data : null,
        { heades: requestConfig.header }
      );
      console.log(res);
      resData(res);
    } catch(err) {
      console.log(err);
      setError(err.message);
    }
  }, []);
  return [error, sendRequest];
};

export default useHttp;
