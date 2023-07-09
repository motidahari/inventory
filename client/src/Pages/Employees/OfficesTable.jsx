import React, { useMemo, useState } from 'react';
import DeleteOfficeModal from './DeleteOfficeModal';
import { Typography, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import StyledDataGrid from '../../components/StyledDataGrid';
import DeleteIcon from '@mui/icons-material/Delete';




const OfficesTable = ({ allOffices, error, fetchData }) => {

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [office, setOffice] = useState(false);
  const handleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
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
        field: 'edit',
        headerName: 'Actions',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  setOffice(row.row);
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
      <Typography variant="h4">error featching allOffices table</Typography>
    );

  return (
    <>

      <StyledDataGrid
        rows={allOffices}
        columns={columns}
        getRowId={row => row.officeId}
      />
      {
        office ? (
          <>
            <DeleteOfficeModal
              open={openDeleteModal}
              close={handleDeleteModal}
              fetchData={fetchData}
              office={office}
            />
          </>
        ) : null
      }
    </>
  );
};

export default OfficesTable;
