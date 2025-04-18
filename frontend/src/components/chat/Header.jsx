import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';

const Header = () => {
  return (
    <div className="z-30 fixed flex items-center w-full h-fit bg-gradient-to-b from-[#9AE2FF]/50 to-[#9AE2FF]/0 px-3 py-5 backdrop-blur-xs md:backdrop-blur-none  md:px-10 md:py-8">
      <Tooltip target=".profile" />
      <Link
        to="/login"
        data-pr-tooltip="Account Settings"
        className="profile w-9 md:w-10 aspect-square rounded-full bg-gradient-to-tr from-primary via-accent to-red-400 animate-gradient"
      />
      {/* <div className='w-full text-center text-white font-semibold h-full'>
            empathy-bot
        </div> */}
      <div className="w-9" />
    </div>
  );
};

export default Header;
