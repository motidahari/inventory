import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import styled from '@emotion/styled';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

function getAcronymsName(name) {
  const letters = name.split(' ');
  let acronyms = '';
  for (let i = 0; i < letters.length; i++) {
    acronyms += letters[i].slice(0, 1);
    if (i === 1) break;
  }
  if (acronyms.length < 1) return undefined;
  return acronyms;
}

const NavBar = ({ onSidebarOpen }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            md: 240,
          },
          width: {
            md: 'calc(100% - 240px)',
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                md: 'none',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Log Out">
            <IconButton onClick={logout}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
          >
            {getAcronymsName(user?.name).toUpperCase()}
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

export default NavBar;
