'use client'

import React, { createContext, useState } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  console.log("children from user context", children)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const setUserLoggedIn = (status) => {
    setIsUserLoggedIn(status);
  };

  return (
    <UserContext.Provider value={{ isUserLoggedIn, setUserLoggedIn }}>
      {children}
      
    </UserContext.Provider>
  );
};

export default UserContext;