import React, { useMemo } from 'react';
import { Typography } from '@mui/material';
import moment from 'moment';
import StyledDataGrid from '../../components/StyledDataGrid';

const LogsTable = ({ allLogs, error }) => {
  const columns = useMemo(
    () => [
      {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.action}</Typography>
        ),
      },
      {
        field: 'productName',
        headerName: 'Product Name',
        sortable: false,
        flex: 0.3,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.productName}</Typography>
        ),
      },
      {
        field: 'locationName',
        headerName: 'Location Name',
        sortable: false,
        flex: 0.3,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.locationName}</Typography>
        ),
      },
      {
        field: 'PONumber',
        headerName: 'PO Number',
        sortable: false,
        flex: 0.3,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.PONumber}</Typography>
        ),
      },
      {
        field: 'description',
        headerName: 'Description',
        sortable: false,
        flex: 0.6,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.description}</Typography>
        ),
      },
      {
        field: 'serialNumber',
        headerName: 'Serial Number',
        sortable: false,
        flex: 0.3,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.serialNumber}</Typography>
        ),
      },
      {
        field: 'date',
        headerName: 'Date',
        sortable: false,
        flex: 0.2,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">
            {moment(row.row.date).format('YYYY-MM-DD')}
          </Typography>
        ),
      },
      {
        field: 'name',
        headerName: 'User Action',
        sortable: false,
        flex: 0.2,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.name}</Typography>
        ),
      },
    ],
    []
  );

  if (error)
    return <Typography variant="h4">error featching logs table</Typography>;

  return (
    <StyledDataGrid
      rows={allLogs}
      columns={columns}
      getRowId={row => row.logId}
    />
  );
};

export default LogsTable;
