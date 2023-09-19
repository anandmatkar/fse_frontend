import React, { useEffect, useState,useCallback } from 'react';

let logOutTimer;
const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},

  
  logout: () => {},
});


const calculateRemainingTime = (expireTokentime) => {
  const currentTime = new Date().getTime();
  const futureExpirationTime = new Date(expireTokentime).getTime();

  const remainingDuration = futureExpirationTime - currentTime;
  return remainingDuration
}
const retriveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime')
  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if(remainingTime <=  6000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null
  }
  return {
    token : storedToken,
    duration : remainingTime
  }
}

export const AuthContextProvider = (props) => {
  const tokenData = retriveStoredToken();
  let checkToken;
  if(tokenData){
    checkToken = tokenData.token;

  }

  // const checkToken = localStorage.getItem('token');
  const [token, setToken] = useState(checkToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime')
    if(logOutTimer){
      clearTimeout(logOutTimer)  
    }
  },[]);

  const loginHandler = (token,expireTokentime) => {
    setToken(token);
    localStorage.setItem('token',token);
    localStorage.setItem('expirationTime',expireTokentime);

    const remainingTime = calculateRemainingTime(expireTokentime);
    
    logOutTimer = setTimeout(logoutHandler,remainingTime);
  };
  useEffect(() => {
    if(tokenData) {
      console.log(tokenData.duration)
      logOutTimer = setTimeout(logoutHandler,tokenData.duration);
    }
  },[tokenData,logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;