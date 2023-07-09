import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from '@mui/material';

const TableContainerStyles = { maxHeight: 470 };
const TableStyles = { minWidth: 650 };

const StyledTable = ({ columns, children }) => {
  return (
    <TableContainer component={Paper} sx={TableContainerStyles}>
      <Table sx={TableStyles} size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCell key={i}>{col.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default StyledTable;
