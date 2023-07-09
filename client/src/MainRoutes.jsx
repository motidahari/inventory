import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Products from './Pages/Products/ProductsPage';
import EmployeesPage from './Pages/Employees/EmployeesPage';
import LogsPage from './Pages/Logs/LogsPage';
import AdminPage from './Pages/Admin/AdminPage';
import AmplifiersTrafficPage from './Pages/AmplifiersTraffic/AmplifiersTrafficPage';
import AmplifiersMonitoringPage from './Pages/AmplifiersMonitoring/AmplifiersMonitoringPage';
import RequireAuth from './RequireAuth';
import SignUp from './Pages/SignUp/SignUp';
import SignIn from './Pages/SignIn/SignIn';
import NotFound from './Pages/NotFound';
import { ExportDataProvider } from './context/DataExport';

const MainRoutes = () => {
  return (
    <ExportDataProvider>
      <Routes>
        {/* all users */}
        <Route
          element={<RequireAuth permission={['Admin', 'Viewer', 'Editor']} />}
        >
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<Products />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/logs" element={<LogsPage />} />
          <Route
            path="/amplifiersTraffic"
            element={<AmplifiersTrafficPage />}
          />
          <Route
            path="/amplifiersMonitoring"
            element={<AmplifiersMonitoringPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* admin routes */}
        <Route element={<RequireAuth permission={['Admin']} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        {/* auth routes */}

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </ExportDataProvider>
  );
};

export default MainRoutes;
