import React from 'react';
import { Link } from 'react-router-dom';
import OnBoardingInput from '../../components/auth/OnBoardingInput';

const OnBoarding = () => {
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center items-center bg-bg w-full min-h-screen h-full px-3 lg:px-20">
      <div className="mt-10 text font-semibold text-xl md:text-3xl lg:text-4xl font-dm-sans text-start md:text-center">
        Let's get to know you.
      </div>
      <div className="w-full md:w-[70%] lg:w-[50%] my-10">
        <OnBoardingInput
          handleSubmit={handleSubmit}
          linkHref={'/login'}
          linkText={'Already have an account? login'}
        />
      </div>

      <div className="fixed bottom-10 font-semibold text-placeholder text-sm">empathy-bot</div>
    </div>
  );
};

export default OnBoarding;
