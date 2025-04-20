import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import useAuthAPI from '../../libs/api_auth';

const AuthLogin = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { login } = useAuthAPI();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    const res = await login(email, pass);
    if (res.success) {
      navigate('/chat');
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
        placeholder="Your email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoComplete="email"
        className="bg-white border border-placeholder px-4 py-3 md:px-5 md:py-3 rounded-2xl w-full"
      />
      <input
        type="password"
        placeholder="Your password"
        required
        value={pass}
        onChange={e => setPass(e.target.value)}
        autoComplete="current-password"
        className="bg-white border border-placeholder px-4 py-3 md:px-5 md:py-3 rounded-2xl w-full"
      />
      <button
        type="submit"
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
      </button>
      <Link to="/signup" className="hover:text-accent font-semibold text-center">
        New here? create an account.
      </Link>
    </form>
  );
};

export default AuthLogin;
