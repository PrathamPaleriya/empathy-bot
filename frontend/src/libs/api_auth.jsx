import axios from 'axios';
import { useAppContext } from '../context/MainContext';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

const useAuthAPI = () => {
  const { setUser } = useAppContext();

  const storeToken = access_token => {
    localStorage.setItem('token', access_token);
    const decoded = JSON.parse(atob(access_token.split('.')[1]));
    const expiry = decoded.exp;
    localStorage.setItem('token_expiry', expiry);
  };

  const isTokenValid = () => {
    const expiryInMinutes = parseInt(localStorage.getItem('token_expiry'), 10);
    return expiryInMinutes && Date.now() < expiryInMinutes * 1000;
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/api/v0/auth/login`, { email, password });
      const { access_token } = res.data;

      storeToken(access_token);
      const me = await getMe(access_token);
      setUser(me);

      return { success: true };
    } catch (err) {
      return { success: false, error: err?.response?.data?.detail || 'Login failed' };
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/api/v0/auth/signup`, { email, password });

      if (res?.data?.access_token) {
        const { access_token } = res.data;

        storeToken(access_token);
        const me = await getMe(access_token);
        setUser(me);

        return { success: true };
      } else {
        throw new Error('Access token not found in response');
      }
    } catch (err) {
      console.error(err);
      return { success: false, error: err?.response?.data?.detail || 'Signup failed' };
    }
  };

  const onboard = async (coreMemory = {}) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE}/api/v0/auth/onboard`, coreMemory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error(err);
      return { success: false, error: err?.response?.data?.detail || 'Onboarding failed' };
    }
  };

  const getMe = async (token = null) => {
    try {
      const authToken = token || localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/api/v0/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return res.data;
    } catch {
      return null;
    }
  };

  const deleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`${API_BASE}/api/v0/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        localStorage.removeItem('token');
        localStorage.removeItem('token_expiry');
        setUser(null);
      }

      return { success: res.data.success };
    } catch (err) {
      console.error(err);
      return { success: false, error: err?.response?.data?.detail || 'Account deletion failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
    setUser(null);
  };

  return {
    login,
    signup,
    getMe,
    logout,
    onboard,
    deleteAccount,
    token: localStorage.getItem('token'),
    isTokenValid,
  };
};

export default useAuthAPI;
