import React, { useState, useMemo } from 'react';
import { Typography, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserEditModal from './UserEditModal';
import DeleteUserModal from './DeleteUserModal';
import StyledDataGrid from '../../components/StyledDataGrid';

const AllUsersTable = ({ allUsers, fetchData, error }) => {
  const [userData, setUserData] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeletMeodal] = useState(false);

  const handleDeleteModal = () => setOpenDeletMeodal(!openDeleteModal);
  const handleEditModal = () => setOpenEditModal(!openEditModal);

  const columns = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'User Name',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.name}</Typography>
        ),
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.email}</Typography>
        ),
      },
      {
        field: 'permission',
        headerName: 'Permission',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.permission}</Typography>
        ),
      },
      {
        field: 'Actions',
        headerName: 'Actions',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  setUserData(row.row);
                  handleEditModal();
                }}
                aria-label="delete"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  setUserData(row.row);
                  handleDeleteModal();
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ],
    []
  );

  if (error)
    return <Typography variant="h4">error featching allUsers table</Typography>;

  return (
    <>
      <StyledDataGrid
        rows={allUsers}
        columns={columns}
        getRowId={row => row.userId}
      />

      {userData ? (
        <>
          <UserEditModal
            fetchData={fetchData}
            open={openEditModal}
            close={handleEditModal}
            userData={userData}
          />
          <DeleteUserModal
            fetchData={fetchData}
            open={openDeleteModal}
            close={handleDeleteModal}
            userData={userData}
          />
        </>
      ) : null}
    </>
  );
};

export default AllUsersTable;
