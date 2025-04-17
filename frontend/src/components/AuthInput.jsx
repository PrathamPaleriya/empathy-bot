import React from 'react';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const AuthInput = ({ loading = false, alert = false, handleSubmit, linkText, linkHref }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full font-manrope">
      <input
        type="email"
        placeholder="Your email"
        required
        className="bg-white border border-placeholder px-5 py-3 rounded-2xl w-full"
      />
      <input
        type="password"
        placeholder="Your password"
        required
        className="bg-white border border-placeholder px-5 py-3 rounded-2xl w-full"
      />
      <button
        type="password"
        className="bg-accent border text-white font-semibold border-accent px-5 py-3 rounded-2xl w-full"
      >
        {loading ? (
          <BarLoader className="my-2 mx-auto" color="white" />
        ) : alert ? (
          <div className="text-white w-full truncate">Invalid email or password</div>
        ) : (
          <div>Continue</div>
        )}
      </button>
      <Link to={linkHref} className="hover:text-accent font-semibold text-center">
        {linkText}
      </Link>
    </form>
  );
};

export default AuthInput;
