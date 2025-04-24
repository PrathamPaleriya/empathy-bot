import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import useAuthAPI from '../../libs/api_auth';
import { motion } from 'framer-motion';

const AuthSignup = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { signup } = useAuthAPI();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    const res = await signup(email, pass);
    if (res.success) {
      navigate('/onboarding');
    } else {
      setAlert(res.error);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-full font-manrope text-sm md:text-base"
    >
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className="bg-white border border-placeholder px-4 py-3 md:px-5 md:py-3 rounded-2xl w-full"
      />
      <input
        type="password"
        placeholder="Set password"
        value={pass}
        onChange={e => setPass(e.target.value)}
        required
        className="bg-white border border-placeholder px-4 py-3 md:px-5 md:py-3 rounded-2xl w-full"
      />
      <motion.button
        type="submit"
        whileHover={{}}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring' }}
        disabled={loading}
        className={`border hover:bg-blue-500 cursor-pointer disabled:cursor-progress text-white font-semibold ${alert ? 'bg-red-600 border-red-600 hover:bg-red-700' : 'bg-accent'} border-accent px-4 py-3 md:px-5 md:py-3 rounded-2xl w-full`}
      >
        {loading ? (
          <BarLoader className="my-2 mx-auto" color="white" />
        ) : alert ? (
          <div className="text-white w-full truncate">{alert}</div>
        ) : (
          <div>Continue</div>
        )}
      </motion.button>
      <Link to="/login" className="hover:text-accent font-semibold text-center">
        Already have an account? Login.
      </Link>
    </form>
  );
};

export default AuthSignup;
