import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useAuthAPI from '../../libs/api_auth';
import { BarLoader } from 'react-spinners';

const ForgotPass = () => {
  const toast = useRef(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { forgotPassword } = useAuthAPI();

  const show = async e => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    const res = await forgotPassword(email);
    if (res.success) {
      toast.current.show({ severity: 'success', summary: 'Check Email', detail: res.message });
    } else {
      setAlert(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-bg w-full min-h-[100svh] h-full px-3 lg:px-20 font-manrope">
      <Toast ref={toast} severity="success" position="top-center" />
      <div className="mt-10 text font-semibold text-xl md:text-3xl lg:text-4xl font-dm-sans text-start md:text-center">
        Forgot password? No problem
      </div>
      <div className="w-full md:w-[70%] lg:w-[30%] my-10">
        <form onSubmit={show}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="enter your registered email"
            className="bg-white border border-placeholder px-5 py-3 rounded-2xl w-full"
            required
          />
          <motion.button
            type="submit"
            whileHover={{}}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring' }}
            className={`border mt-3 hover:bg-blue-500 cursor-pointer disabled:cursor-progress text-white font-semibold ${alert ? 'bg-red-600 border-red-600 hover:bg-red-700' : 'bg-accent'} border-accent px-4 py-3 md:px-5 md:py-3 rounded-2xl w-full`}
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
        <Link to={'/login'}>
          <motion.div
            whileHover={{}}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring' }}
            className="bg-black border text-center hover:bg-gray-800 text-white font-semibold border-black my-2 px-5 py-3 rounded-2xl w-full"
          >
            Back to login
          </motion.div>
        </Link>
      </div>
      <div className="text-sm text-caption text-center">
        Please check your email for the reset link. <br />
        If you don't see it, kindly check your
        <b>
          {' '}
          <i>spam</i>
        </b>{' '}
        folder as well.
      </div>
    </div>
  );
};

export default ForgotPass;
