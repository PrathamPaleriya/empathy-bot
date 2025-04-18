import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import OnBoarding from './pages/auth/OnBoarding';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<MainLayout />}>
        <Route path="/chat" element={<Home />} />
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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
