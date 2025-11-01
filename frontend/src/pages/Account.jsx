import React, { useEffect, useState } from 'react';
import PaddingMarging from '../components/ui/PaddingMarging';
import CoreMemoryDisplay from '../components/ui/CoreMemoryDisplay';
import useAuthAPI from '../libs/api_auth';
import { LogOut, MessageSquareHeart, Trash, Turtle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { Tooltip } from 'primereact/tooltip';
import { motion } from 'framer-motion';

const Account = () => {
  const { getMe, logout, deleteAccount } = useAuthAPI();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await getMe();
      if (resp) {
        setData(resp);
      }
    } catch (error) {
      setAlert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    setAlert(null);
    const confirm = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (!confirm) {
      setLoading(false);
      return;
    }

    const result = await deleteAccount();
    if (result.success) {
      navigate('/signup');
    } else {
      setAlert(result.error || 'Account deletion failed');
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleFeedback = () => {
    const mailtoLink = `mailto:paleriyapratham@gmail.com?subject=Eira feedback`;
    window.location.href = mailtoLink;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="z-30 mt-28 min-h-[100svh]">
      {loading && (
        <div className="flex w-full justify-center">
          <BarLoader />
        </div>
      )}
      {alert && <div className="w-full text-red-600 text-center">{alert}</div>}
      <PaddingMarging>
        <Tooltip target=".btn-delete" content="Delete Account" position="top" />
        <Tooltip target=".btn-logout" content="Logout" position="top" />
        <Tooltip target=".btn-feedback" content="Feedback 💌" position="top" />
        <div className="flex items-center justify-between">
          <div className="text-xl md:text-3xl font-semibold text-secondary">
            Account <br className="block md:hidden" /> Settings
          </div>
          <div className="md:flex gap-3 hidden">
            <motion.button
              whileHover={{}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring' }}
              className="btn-delete p-3 text-white bg-red-500 rounded-full hover:bg-red-600"
              onClick={handleDeleteAccount}
            >
              <Trash />
            </motion.button>
            <motion.button
              whileHover={{}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring' }}
              className="btn-logout p-3 text-white bg-blue-500 rounded-full hover:bg-blue-600"
              onClick={handleLogout}
            >
              <LogOut />
            </motion.button>
            <motion.button
              whileHover={{}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring' }}
              className="btn-feedback p-3 text-white bg-black rounded-full hover:bg-gray-700 transition-colors"
              onClick={handleFeedback}
            >
              <MessageSquareHeart />
            </motion.button>
          </div>
          <div className="flex gap-3 md:hidden">
            <motion.button
              whileHover={{}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring' }}
              className="p-3 aspect-square text-white bg-red-500 rounded-full hover:bg-red-600"
              onClick={handleDeleteAccount}
            >
              <Trash className="size-4" />
            </motion.button>
            <motion.button
              whileHover={{}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring' }}
              className="p-3 text-white bg-blue-500 rounded-full hover:bg-blue-600"
              onClick={handleLogout}
            >
              <LogOut className="size-4" />
            </motion.button>
            <motion.button
              whileHover={{}}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring' }}
              className="p-3 text-white bg-black rounded-full hover:bg-gray-700 transition-colors"
              onClick={handleFeedback}
            >
              <MessageSquareHeart className="size-4" />
            </motion.button>
          </div>
        </div>

        <div className="w-full h-[2px] bg-placeholder rounded-full my-5" />
        {data ? (
          <div>
            <CoreMemoryDisplay coreMemory={data.core_memory} />
          </div>
        ) : (
          loading && <div>Loading ... </div>
        )}
        <div className="w-full h-[2px] bg-placeholder rounded-full my-5" />
        <div className="flex flex-col md:flex-row gap-2 justify-between text-xs md:text-sm lg:text-base">
          <div className="flex gap-2 md:gap-3 flex-wrap">
            <div>🔴 - Delete Account</div>
            <div>🔵 - Logout</div>
            <div>⚫ - Feedback</div>
          </div>
          <div className="hover:underline text-base">By Athams.</div>
        </div>
      </PaddingMarging>
    </div>
  );
};

export default Account;
