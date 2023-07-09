import React from 'react';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import CustomToolbar from './CustomToolbar';
import { DataGrid } from '@mui/x-data-grid';

const StyledDataGrid = ({ rows, columns, ...props }) => {
  return (
    <DataGrid
      rows={rows ? rows : []}
      columns={columns}
      disableColumnFilter
      disableColumnMenu
      disableSelectionOnClick
      disableColumnSelector
      components={{
        NoRowsOverlay: CustomNoRowsOverlay,
        Toolbar: CustomToolbar,
      }}
      loading={!rows}
      {...props}
    />
  );
};

export default StyledDataGrid;
