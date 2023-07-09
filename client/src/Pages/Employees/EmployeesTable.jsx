import React, { useMemo, useState } from 'react';
import EditEmployeeModal from './EditEmployeeModal';
import DeleteEmployeeModal from './DeleteEmployeeModal';
import { Typography, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import StyledDataGrid from '../../components/StyledDataGrid';
import DeleteIcon from '@mui/icons-material/Delete';

const EmployeesTable = ({ allOffices, allEmployees, error, fetchData }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [employee, setEmployee] = useState(false);
  const handleEditModal = () => setOpenEditModal(!openEditModal);
  const handleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const columns = useMemo(
    () => [
      {
        field: 'officeName',
        headerName: 'Office',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.officeName}</Typography>
        ),
      },
      {
        field: 'employeeName',
        headerName: 'Name',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.employeeName}</Typography>
        ),
      },
      {
        field: 'screen',
        headerName: 'Screens',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.screen}</Typography>
        ),
      },
      {
        field: 'tv',
        headerName: 'TVs',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.tv}</Typography>
        ),
      },
      {
        field: 'dockingStation',
        headerName: 'Dockings',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.dockingStation}</Typography>
        ),
      },
      {
        field: 'ipPhone',
        headerName: 'Phones',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.ipPhone}</Typography>
        ),
      },
      {
        field: 'desktopComputer',
        headerName: 'Computers',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.desktopComputer}</Typography>
        ),
      },
      {
        field: 'laptop',
        headerName: 'Leptops',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.laptop}</Typography>
        ),
      },
      {
        field: 'printer',
        headerName: 'Printers',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.printer}</Typography>
        ),
      },
      {
        field: 'headset',
        headerName: 'Headsets',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.headset}</Typography>
        ),
      },
      {
        field: 'webCamera',
        headerName: 'WebCamera',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.webCamera}</Typography>
        ),
      },
      {
        field: 'edit',
        headerName: 'Actions',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  setEmployee(row.row);
                  handleEditModal();
                }}
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  setEmployee(row.row);
                  handleDeleteModal(row.row);
                }}
                aria-label="delete"
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
    return (
      <Typography variant="h4">error featching allEmployees table</Typography>
    );

  return (
    <>
      <StyledDataGrid
        rows={allEmployees}
        columns={columns}
        getRowId={row => row.employeeId}
      />
      {employee ? (
        <>
          <EditEmployeeModal
            open={openEditModal}
            close={handleEditModal}
            allOffices={allOffices}
            employee={employee}
            fetchData={fetchData}
          />
          <DeleteEmployeeModal
            open={openDeleteModal}
            close={handleDeleteModal}
            fetchData={fetchData}
            employee={employee}
          />
        </>
      ) : null}
    </>
  );
};

export default EmployeesTable;
