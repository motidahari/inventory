import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Box, Divider, Drawer, useMediaQuery, Typography } from '@mui/material';
import NavItem from './NavItem';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ListIcon from '@mui/icons-material/List';
import LaptopIcon from '@mui/icons-material/Laptop';
import SpeakerIcon from '@mui/icons-material/Speaker';

const pages = [

  {
    title: 'Products',
    icon: <LaptopIcon fontSize="small" />,
    link: 'products',
  },
  {
    title: 'Logs',
    icon: <ListIcon fontSize="small" />,
    link: 'logs',
  },
  {
    title: 'Amplifiers Traffic',
    icon: <SpeakerIcon fontSize="small" />,
    link: 'amplifiersTraffic',
  },
  {
    title: 'Amplifiers Monitoring',
    icon: <SpeakerIcon fontSize="small" />,
    link: 'amplifiersMonitoring',
  },
];

const adminPages = [
  {
    title: 'Employees',
    icon: <PeopleIcon fontSize="small" />,
    link: 'employees',
  },
  {
    title: 'Admin',
    icon: <AdminPanelSettingsIcon fontSize="small" />,
    link: 'admin',
  },
];

const SideBar = ({ open, onClose }) => {
  const { user } = useContext(AuthContext);

  const mobileView = useMediaQuery(theme => theme.breakpoints.up('md'), {
    defaultMatches: true,
    noSsr: false,
  });

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box sx={{ p: 2, mb: 3 }}>
        <Typography color="primary" variant="h4">
          RAFT Technologies
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {pages.map((page, i) => (
          <NavItem
            key={i}
            icon={page.icon}
            title={page.title}
            onClose={onClose}
            link={page.link}
          />
        ))}

        {user?.permission === 'Admin' ? (
          <>
            <Divider sx={{ my: 1, borderColor: '#414e65' }} />
            {adminPages.map((page, i) => (
              <NavItem
                key={i}
                icon={page.icon}
                title={page.title}
                onClose={onClose}
                link={page.link}
              />
            ))}
          </>
        ) : null}
      </Box>
    </Box>
  );

  if (mobileView) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#081620',
            color: '#FFFFFF',
            width: 240,
            borderRight: '1px solid #081620',
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#081620',
          color: '#FFFFFF',
          width: 240,
        },
      }}
      sx={{ zIndex: theme => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default SideBar;
