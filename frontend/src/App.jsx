import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import OnBoarding from './pages/auth/OnBoarding';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import { AppProvider } from './context/MainContext';
import Account from './pages/Account';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<MainLayout />}>
        <Route path="/chat" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/onboarding" element={<OnBoarding />} />
    </>
  )
);

function App() {
  return (
    <>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </>
  );
}

export default App;
