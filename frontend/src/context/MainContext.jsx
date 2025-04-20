import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';
  const [chatHistory, setChatHistory] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${API_BASE}/ping`);
      console.log("ping successful");
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ chatHistory, setChatHistory, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
