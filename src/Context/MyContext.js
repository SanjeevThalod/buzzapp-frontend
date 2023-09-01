// MyContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyContext = createContext();

export function MyContextProvider({ children }) {
  const [user, setUser] = useState([]); // Set your initial state here
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(user);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);
    if(!userInfo){
    }
  },[navigate])
  return (
    <MyContext.Provider value={{ user, setUser}}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}
