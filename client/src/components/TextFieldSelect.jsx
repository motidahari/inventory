import React from 'react';
import { TextField } from '@mui/material';

const SelectProps = {
  MenuProps: {
    PaperProps: {
      style: {
        maxHeight: 300,
      },
    },
  },
};

const TextFieldSelect = ({ label, children, ...props }) => {
  return (
    <TextField
      select
      label={label}
      SelectProps={SelectProps}
      fullWidth
      {...props}
    >
      {children}
    </TextField>
  );
};

export default TextFieldSelect;
