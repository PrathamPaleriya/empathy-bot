import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
import { Flag } from 'lucide-react';
import { useAppContext } from '../../context/MainContext';
import { motion } from 'framer-motion';

const Header = () => {
  const { chatHistory } = useAppContext();
  const MotionLink = motion(Link);
  const location = useLocation();

  const mailBody =
    (chatHistory?.map(msg => `${msg.role.toUpperCase()}: ${msg.content}`).join('\n\n') || '') +
    '\n\nDescribe your issue here: ';

  const mailHref = `mailto:paleriyapratham@gmail.com?subject=Empathy-bot report issue&body=${encodeURIComponent(mailBody)}`;

  const isAtAccountPage = location.pathname === '/account';
  const buttonLink = isAtAccountPage ? '/chat' : '/account';
  const tooltipText = isAtAccountPage ? 'Back to Home' : 'Account settings';

  return (
    <div>
      <div className="z-30 hidden fixed md:flex items-center justify-between w-full h-fit bg-gradient-to-b from-[#9AE2FF]/50 to-[#9AE2FF]/0 px-5 py-5 backdrop-blur-xs md:backdrop-blur-none  md:px-10 md:py-8">
        <Tooltip target=".profile" />
        <Link to={buttonLink}>
          <motion.div
            whileHover={{}}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring' }}
            data-pr-tooltip={tooltipText}
            className="profile w-9 md:w-10 aspect-square rounded-full bg-gradient-to-tr from-primary via-accent to-red-400 animate-gradient"
          />
        </Link>
        {/* <div className='w-full text-center text-white font-semibold h-full'>
            empathy-bot
        </div> */}
        <a
          href={mailHref}
          target="_blank"
          className="report flex items-center gap-1 font-bold text-red-600 hover:text-red-700 cursor-pointer text-base"
        >
          <div>
            <Flag className="size-4" />
          </div>
          <div>Report</div>
        </a>
      </div>

      <div className="z-30 fixed flex md:hidden items-center justify-between w-full h-fit bg-gradient-to-b from-[#9AE2FF]/50 to-[#9AE2FF]/0 px-5 py-5 backdrop-blur-xs md:backdrop-blur-none  md:px-10 md:py-8">
        <Link to={buttonLink}>
          <motion.div
            whileHover={{}}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring' }}
            className="profile w-9 md:w-10 aspect-square rounded-full bg-gradient-to-tr from-primary via-accent to-red-400 animate-gradient"
          />
        </Link>
        {/* <div className='w-full text-center text-white font-semibold h-full'>
            empathy-bot
        </div> */}
        <a
          href={mailHref}
          target="_blank"
          className="report flex items-center gap-1 font-bold text-red-600 hover:text-red-700 cursor-pointer text-sm"
        >
          <div>
            <Flag className="size-4" />
          </div>
          <div>Report</div>
        </a>
      </div>
    </div>
  );
};

export default Header;
