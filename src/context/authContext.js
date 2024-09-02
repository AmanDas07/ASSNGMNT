import { createContext, useContext, useEffect, useState } from "react";

const UseContext = createContext();

const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: ""
  });

  useEffect(() => {
    setState(window.localStorage.getItem("auth"));
  }, []);

  return (
    <UseContext.Provider value={[state, setState]}>
      {children}
    </UseContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UseContext);
}

export { useUserContext, ContextProvider };