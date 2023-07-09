import { useState, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import MainRoutes from './MainRoutes';
import { AuthContext } from './context/auth';
import { DashboardLayoutRoot } from './styles/styledComponents';

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        {user ? (
          <>
            <NavBar onSidebarOpen={() => setSidebarOpen(true)} />
            <SideBar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
          </>
        ) : null}

        <DashboardLayoutRoot user={user}>
          <MainRoutes />
        </DashboardLayoutRoot>
      </BrowserRouter>
    </>
  );
};

export default MainLayout;
