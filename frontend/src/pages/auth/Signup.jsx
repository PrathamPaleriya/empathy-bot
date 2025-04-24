import React from 'react';
import { Link } from 'react-router-dom';
import AuthSignup from '../../components/auth/AuthSignup';

const Signup = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-bg w-full min-h-[100svh] h-full px-3 lg:px-20 font-manrope">
      <div className="text-primary font-semibold text-3xl md:text-4xl lg:text-5xl font-dm-sans md:leading-11 lg:leading-14 text-center">
        Let's be <span className="text-secondary">emotionally</span> <br /> chaotic{' '}
        <span className="text-secondary">together</span> 😌
      </div>
      <div className="w-full md:w-[70%] lg:w-[30%] my-10">
        <div className="my-3 text-center text-subheading">Create an Account.</div>
        <AuthSignup />
      </div>
      <div className="font-manrope text-center w-[95%] md:w-[80%] lg:w-[62%] pt-20 font-semibold text-subheading text-xs md:text-base">
        No pressure. Just vibes ✨ We don't store your chats — so speak your heart without stress.
        This ain't some enterprise product, just a chill side project made with love… from one
        friend to another 🤝 &nbsp;
        <Link className="text-blue-500 hover:underline" to="/policy">
          Read Privacy Policy
        </Link>
      </div>
      <div className="fixed bottom-10 font-semibold text-placeholder text-xs">empathy-bot</div>
    </div>
  );
};

export default Signup;
