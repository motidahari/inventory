import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalHeader = ({ title, close }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h4">{title}</Typography>
      <IconButton
        onClick={close}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default ModalHeader;
