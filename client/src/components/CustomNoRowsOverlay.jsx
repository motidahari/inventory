import React from 'react';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledGridOverlay = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

const searchIconStyles = { fontSize: '50px', color: '#595959' };

const CustomNoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <SearchOffIcon style={searchIconStyles} />
      <Box>No Results</Box>
    </StyledGridOverlay>
  );
};

export default CustomNoRowsOverlay;
