import axios from 'axios';
import { useAppContext } from '../context/MainContext';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

const useChatApi = () => {
  const { chatHistory } = useAppContext();

  const chat = async (message = '') => {
    const chat_data = {
      message: message,
      chat_history: chatHistory.slice(-20),
    };
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE}/api/v0/bot/chat`, chat_data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error(err);
      return {
        success: false,
        error: err?.response?.data?.detail || 'Unexcpected Error occured please retry or refresh.',
      };
    }
  };

  return {
    chat,
  };
};

export default useChatApi;
