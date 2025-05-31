import React, { createContext, useContext } from "react";

const Context = createContext();
const AuthProvider = ({ children }) => {
  // save and get user data to local storage
  const saveAuth = (data) => {
    localStorage.setItem(import.meta.env.VITE_LOCALNAME, JSON.stringify(data));
  };
  const getAuth = () => localStorage.getItem(import.meta.env.VITE_LOCALNAME);
  const removeAuth = () =>
    localStorage.removeItem(import.meta.env.VITE_LOCALNAME);

  return (
    <Context.Provider value={{ saveAuth, getAuth, removeAuth }}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
