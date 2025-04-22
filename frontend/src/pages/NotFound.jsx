import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-[100svh] bg-bg flex flex-col items-center justify-center">
      <div className="text-placeholder">404</div>
      <div className="text-center w-[70%] text-xl md:text-2xl lg:text-3xl font-semibold  my-5">
        Looks like this page went off on a soul-searching trip.
      </div>
      <Link
        to="/"
        className="bg-primary border text-center text-white font-semibold hover:scale-110 transition-all border-primary my-2 px-5 py-3 rounded-2xl"
      >
        Back to main
      </Link>
    </div>
  );
};

export default NotFound;
