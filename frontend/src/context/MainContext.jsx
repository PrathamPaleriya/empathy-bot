import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ chatHistory, setChatHistory, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
