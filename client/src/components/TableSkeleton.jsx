import React from 'react';
import { TableCell, TableRow, Skeleton } from '@mui/material';
import StyledTable from './StyledTable';

const TableSkeleton = ({ columns }) => {
  return (
    <StyledTable columns={columns}>
      {Array(8)
        .fill(0)
        .map((item, i) => (
          <TableRow key={i}>
            {Array(columns.length)
              .fill(0)
              .map((item, i) => (
                <TableCell key={i}>
                  <Skeleton variant="text" animation="wave" />
                </TableCell>
              ))}
          </TableRow>
        ))}
    </StyledTable>
  );
};

export default TableSkeleton;
