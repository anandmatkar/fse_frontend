import Cookies from 'js-cookie';
import React, { useEffect, useState, useCallback, useRef, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  role: '',
  login: (token, expireTokenTime, role, name, profile) => {},
  logout: () => {},
  logoutBtn: () => {},
});

const calculateRemainingTime = (expireTokenTime) => {
  const currentTime = new Date().getTime();
  const futureExpirationTime = new Date(expireTokenTime).getTime();
  return futureExpirationTime - currentTime;
};

const retrieveStoredToken = () => {
  const storedToken = Cookies.get('token');
  const storedExpirationDate = Cookies.get('expirationTime');
  const storedRole = Cookies.get('role');
  
  if (!storedToken || !storedExpirationDate || !storedRole) {
    return null;
  }

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 0) {
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('Name');
    Cookies.remove('Profile');
    Cookies.remove('expires');
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
  const navigate = useNavigate(); // Create a navigate function


  const [token, setToken] = useState(tokenData ? tokenData.token : '');
  const [role, setRole] = useState(tokenData ? tokenData.role : '');
  
  const userIsLoggedIn = !!token;

  const logOutTimer = useRef();

  const logoutHandler = useCallback(() => {
    console.log('logged out via auth Context')
    setToken('');
    setRole('');
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('Name');
    Cookies.remove('Profile');
    Cookies.remove('expires');
    navigate('/'); // Adjust the route to your login page
    toast.error('Session Expired !!! Please Sign In Again...', {
      position: 'top-right',
      autoClose: 2000, // Notification will close automatically after 2 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });


    if (logOutTimer.current) {
      clearTimeout(logOutTimer.current);
    }
  }, []);

  const logoutBtnHandler = useCallback(() => {
    console.log('logged out via auth Context')
    setToken('');
    setRole('');
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('Name');
    Cookies.remove('Profile');
    Cookies.remove('expires');
    navigate('/'); // Adjust the route to your login page
    toast.error('Logout Successfully... Please Sign in Again', {
      position: 'top-right',
      autoClose: 2000, // Notification will close automatically after 2 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });


    if (logOutTimer.current) {
      clearTimeout(logOutTimer.current);
    }
  }, []);

  const loginHandler = (token, expireTokenTime, role, name, profile) => {

    console.log('logged in via auth Context')
    console.log(token, expireTokenTime, role);
    setToken(token);
    setRole(role);
    Cookies.set('token', token);
    Cookies.set('role', role);
    Cookies.set('Name', name);
    Cookies.set('Profile', profile);
    Cookies.set('expires', expireTokenTime);


    const remainingTime = calculateRemainingTime(expireTokenTime);
    console.log(remainingTime);

    if (logOutTimer.current) {
      clearTimeout(logOutTimer.current);
    }

    logOutTimer.current = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      const remainingTime = calculateRemainingTime(tokenData.duration);
      console.log(remainingTime);
      logOutTimer.current = setTimeout(logoutHandler, remainingTime);
    }

    // Periodically check the expiration time every minute
    const checkExpirationInterval = setInterval(() => {
      if (tokenData) {
        const remainingTime = calculateRemainingTime(tokenData.duration);
        if (remainingTime <= 0) {
          // Token has expired, so log out
          logoutHandler();
          clearInterval(checkExpirationInterval);// Stop checking after logging out
        }
      }
    }, 60000); // 60,000 milliseconds = 1 minute

    return () => {
      if (logOutTimer.current) {
        clearTimeout(logOutTimer.current);
      }
      clearInterval(checkExpirationInterval);
    };
  }, [tokenData, logoutHandler]);

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: userIsLoggedIn, role, login: loginHandler, logout: logoutHandler, logoutBtn: logoutBtnHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;