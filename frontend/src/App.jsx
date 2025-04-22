import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import OnBoarding from './pages/auth/OnBoarding';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import { AppProvider } from './context/MainContext';
import Account from './pages/Account';
import LandingPage from './pages/LandingPage';
import ForgotPass from './pages/auth/ForgotPass';
import 'primereact/resources/themes/viva-light/theme.css';
import 'primereact/resources/primereact.min.css';
import ResetPass from './pages/auth/ResetPass';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat" element={<MainLayout />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/account" element={<MainLayout />}>
        <Route path="" element={<Account />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/onboarding" element={<OnBoarding />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/reset-password" element={<ResetPass />} />
      <Route path="/policy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
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
