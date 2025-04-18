import React from 'react';
import { Link } from 'react-router-dom';
import AuthInput from '../../components/auth/AuthInput';

const Login = () => {
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center items-center bg-bg w-full min-h-screen h-full px-3 lg:px-20">
      <div className="text-primary font-semibold text-3xl md:text-4xl lg:text-5xl font-dm-sans md:leading-11 lg:leading-14 text-center">
        Welcome Back <span className="text-secondary">Mate</span> 👋🏻
      </div>
      <div className="w-full md:w-[70%] lg:w-[30%] my-10">
        <div className="my-3 text-center text-subheading">Enter your Credentials.</div>
        <AuthInput
          handleSubmit={handleSubmit}
          linkHref={'/signup'}
          linkText={'New here? create an account.'}
        />
      </div>
      <div className="font-manrope text-center w-[95%] md:w-[80%] lg:w-[60%] pt-20 font-semibold text-subheading">
        I'm all ears! Your feedback means the world to me, help me make this better! &nbsp;
        <Link className="text-blue-500 hover:underline">Feedback Please</Link>
      </div>
      <div className="fixed bottom-10 font-semibold text-placeholder text-sm">empathy-bot</div>
    </div>
  );
};

export default Login;
