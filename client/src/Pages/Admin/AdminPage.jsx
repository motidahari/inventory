import React from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import PageContainer from '../../components/PageContainer';
import AllUsersTable from './AllUsersTable';
import PendingUsersTable from './PendingUsersTable';
import { useFetchData } from '../../hooks/useFetchData';
import users from '../../requests/users';
import { PageHeaderContainer } from '../../styles/styledComponents';

const AdminPage = () => {
  const [value, setValue] = React.useState('ALL');
  const {
    state: allUsers,
    error: errorAllUsers,
    fetchData: fetchDataAllUsers,
  } = useFetchData(users.getAllUsers);


  const {
    state: allPendingUsers,
    error: errorAllPendingUsers,
    fetchData: fetchDataAllPendingUsers,
  } = useFetchData(users.getUnapprovedUsers);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <PageContainer>
        <PageHeaderContainer>
          <Typography sx={{ m: 1 }} variant="h4">
            User Management
          </Typography>
        </PageHeaderContainer>

        <Box sx={{ mt: 3 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: { bottom: 8 },
            }}
          >
            <Tab disableRipple label="All Users" value={'ALL'} />
            <Tab disableRipple label="Pending Users" value={'PENDING'} />
          </Tabs>

          {value === 'ALL' && (
            <AllUsersTable
              allUsers={allUsers}
              fetchData={fetchDataAllUsers}
              error={errorAllUsers}
            />
          )}
          {value === 'PENDING' && (
            <PendingUsersTable
              allPendingUsers={allPendingUsers}
              fetchData={fetchDataAllPendingUsers}
              error={errorAllPendingUsers}
            />
          )}
        </Box>
      </PageContainer>
    </>
  );
};

export default AdminPage;
