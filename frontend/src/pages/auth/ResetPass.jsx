import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useAuthAPI from '../../libs/api_auth';
import { BarLoader } from 'react-spinners';

const ResetPass = () => {
  const toast = useRef(null);
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { resetPassword } = useAuthAPI();
  const navigate = useNavigate();

  const handleReset = async e => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    if (pass === rePass) {
      const new_password = pass;
      const res = await resetPassword(token, new_password);
      if (res.success) {
        navigate('/login');
      } else {
        setAlert(res.error);
      }
    } else {
      setAlert('Passwords must match.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-bg w-full min-h-screen h-full px-3 lg:px-20 font-manrope">
      <Toast ref={toast} position="top-center" />
      <div className="mt-10 text font-semibold text-xl md:text-3xl lg:text-4xl font-dm-sans text-start md:text-center">
        Set your new password
      </div>
      <div className="w-full md:w-[70%] lg:w-[30%] my-10">
        <form onSubmit={handleReset}>
          <input
            type="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            placeholder="Enter new password"
            className="bg-white border border-placeholder mb-3 px-5 py-3 rounded-2xl w-full"
            required
          />
          <input
            type="text"
            value={rePass}
            onChange={e => setRePass(e.target.value)}
            placeholder="Re-enter new password"
            className="bg-white border border-placeholder px-5 py-3 rounded-2xl w-full"
            required
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring' }}
            className={`border hover:bg-blue-500 cursor-pointer mt-3 disabled:cursor-progress text-white font-semibold ${alert ? 'bg-red-600 border-red-600 hover:bg-red-700' : 'bg-accent'} border-accent px-4 py-3 md:px-5 md:py-3 rounded-2xl w-full`}
          >
            {loading ? (
              <BarLoader className="my-2 mx-auto" color="white" />
            ) : alert ? (
              <div className="text-white w-full truncate">{alert}</div>
            ) : (
              <div>Submit</div>
            )}
          </motion.button>
        </form>
        <div className="text-center text-placeholder">or</div>
        <Link to="/signup">
          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring' }}
            className="bg-black border text-center hover:bg-gray-800 text-white font-semibold border-black my-2 px-5 py-3 rounded-2xl w-full"
          >
            Back to signup
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default ResetPass;
