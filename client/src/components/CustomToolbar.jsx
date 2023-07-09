import React from 'react';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';


const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
