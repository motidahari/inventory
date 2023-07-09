import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import MainLayout from './MainLayout';
import { AuthProvider } from './context/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <MainLayout />
        <ToastContainer position="bottom-left" />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
