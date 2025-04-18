import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/chat/Header';

function MainLayout() {
  return (
    <div className='bg-bg h-screen overflow-hidden font-manrope'>
      <Header/>
      <Outlet />
    </div>
  );
}

export default MainLayout;
