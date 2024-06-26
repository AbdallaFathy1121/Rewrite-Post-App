import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {BrowserRouter as Router , Route , Routes, useLocation  } from 'react-router-dom';
import Login from './components/Login/login.jsx';
import Layout from './Pages/Layout/layout.jsx';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './Shared/components/PrivateRoute';

const App = () => {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/login';

  return (
    <AuthProvider>
      {!isLoginPage && <PrivateRoute><Layout /></PrivateRoute>}
      <Routes>
        <Route path='/login' element={<Login/>} />
      </Routes>
      <Toaster
        position="top-left"
        reverseOrder={false}
      />
    </AuthProvider>
  );
};

export default App;
