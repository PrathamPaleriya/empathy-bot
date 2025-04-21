import React, { useEffect, useState } from 'react';
import PaddingMarging from '../components/ui/PaddingMarging';
import CoreMemoryDisplay from '../components/ui/CoreMemoryDisplay';
import useAuthAPI from '../libs/api_auth';
import { LogOut, MessageSquareHeart, Trash } from 'lucide-react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const Account = () => {
  const { getMe, logout, deleteAccount } = useAuthAPI();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
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
    const confirm = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (!confirm) return;

    const result = await deleteAccount();
    if (result.success) {
      navigate('/signup');
    } else {
      setAlert(result.error || 'Account deletion failed');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleFeedback = () => {
    const mailtoLink = `mailto:paleriyapratham@gmail.com?subject=Empathybot feedback`;
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
      <PaddingMarging>
        <div className="flex items-center justify-between">
          <div className="text-xl md:text-3xl font-semibold text-secondary">
            Account <br className="block md:hidden" /> Settings
          </div>
          <div className="md:flex gap-3 hidden">
            <Button
              className="p-3 text-white bg-red-500 rounded-full hover:bg-red-600"
              tooltip="Delete Account"
              tooltipOptions={{ position: 'top' }}
              onClick={handleDeleteAccount}
              icon={<Trash />}
            />
            <Button
              className="p-3 text-white bg-blue-500 rounded-full hover:bg-blue-600"
              tooltip="Logout"
              tooltipOptions={{ position: 'top' }}
              onClick={handleLogout}
              icon={<LogOut />}
            />
            <Button
              className="p-3 text-white bg-black rounded-full hover:bg-gray-700 transition-colors"
              tooltip="Feedback 💌"
              tooltipOptions={{ position: 'top' }}
              onClick={handleFeedback}
              icon={<MessageSquareHeart />}
            />
          </div>
          <div className="flex gap-3 md:hidden">
            <button
              className="p-3 aspect-square text-white bg-red-500 rounded-full hover:bg-red-600"
              onClick={handleDeleteAccount}
            >
              <Trash className="size-4" />
            </button>
            <Button
              className="p-3 text-white bg-blue-500 rounded-full hover:bg-blue-600"
              onClick={handleLogout}
            >
              <LogOut className="size-4" />
            </Button>
            <Button
              className="p-3 text-white bg-black rounded-full hover:bg-gray-700 transition-colors"
              onClick={handleFeedback}
            >
              <MessageSquareHeart className="size-4" />
            </Button>
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
          <a
            href="https://pratham.athams.com/"
            target="_blank"
            className="hover:underline text-base"
          >
            Made by Pratham.
          </a>
        </div>
      </PaddingMarging>
    </div>
  );
};

export default Account;
