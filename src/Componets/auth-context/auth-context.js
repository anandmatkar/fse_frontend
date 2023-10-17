import React, { useEffect, useState, useCallback, useRef, createContext } from 'react';

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  role: '',
  login: (token, expireTokenTime, role) => {},
  logout: () => {},
});

const calculateRemainingTime = (expireTokenTime) => {
  const currentTime = new Date().getTime();
  const futureExpirationTime = new Date(expireTokenTime).getTime();
  return futureExpirationTime - currentTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');
  const storedRole = localStorage.getItem('role');
  
  if (!storedToken || !storedExpirationDate || !storedRole) {
    return null;
  }

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 0) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('role');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    role: storedRole,
  };
};

export const AuthContextProvider = ({ children }) => {
  const tokenData = retrieveStoredToken();
  const [token, setToken] = useState(tokenData ? tokenData.token : '');
  const [role, setRole] = useState(tokenData ? tokenData.role : '');
  const userIsLoggedIn = !!token;

  const logOutTimer = useRef();

  const logoutHandler = useCallback(() => {
    setToken('');
    setRole('');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('role');
    if (logOutTimer.current) {
      clearTimeout(logOutTimer.current);
    }
  }, []);

  const loginHandler = (token, expireTokenTime, role) => {
    setToken(token);
    setRole(role);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expireTokenTime);
    localStorage.setItem('role', role);

    const remainingTime = calculateRemainingTime(expireTokenTime);

    if (logOutTimer.current) {
      clearTimeout(logOutTimer.current);
    }

    logOutTimer.current = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      const remainingTime = calculateRemainingTime(tokenData.duration);
      logOutTimer.current = setTimeout(logoutHandler, remainingTime);
    }

    return () => {
      if (logOutTimer.current) {
        clearTimeout(logOutTimer.current);
      }
    };
  }, [tokenData, logoutHandler]);

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: userIsLoggedIn, role, login: loginHandler, logout: logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;