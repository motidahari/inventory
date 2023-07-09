import React, { useState, useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../../context/auth';
import { Typography } from '@mui/material';
import { PageHeaderContainer } from '../../styles/styledComponents';
import products from './../../requests/products';
import StyledDataGrid from '../../components/StyledDataGrid';

const GapsTable = ({ warehouse }) => {
  // const { state: allGaps, error, setState } = useFetchData(products.getGaps);
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };

  const [allGaps, setAllGaps] = useState([]);
  const getGapsByLocation = async warehouse => {
    const location = {
      locationId: warehouse,
    };
    const result = await products.getGaps(userAction, location);
    setAllGaps(result);
  };

  useEffect(() => {
    if (warehouse.length > 0) {
      getGapsByLocation(warehouse);
    }
  }, [warehouse]);

  const columns = useMemo(
    () => [
      {
        field: 'productName',
        headerName: 'Product Name',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.productName}</Typography>
        ),
      },
      {
        field: 'quantityInLocation',
        headerName: 'Total Quantity in location',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">
            {(row.row.quantityInLocation ? row.row.quantityInLocation : 0)}
          </Typography>
        ),
      },
      {
        field: 'quantity',
        headerName: 'Supposed Quantity',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.quantity}</Typography>
        ),
      },
      {
        field: 'gap',
        headerName: 'Gap',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{(row.row.gap)}</Typography>
        ),
      },
    ],
    []
  );

  return (
    <>
      <PageHeaderContainer sx={{ mt: 5, mb: 3 }}>
        <Typography sx={{ m: 1 }} variant="h4">
          Gaps
        </Typography>
      </PageHeaderContainer>

      <StyledDataGrid
        rows={allGaps}
        columns={columns}
        getRowId={row => row.gapId}
      />
    </>
  );
};

export default GapsTable;
