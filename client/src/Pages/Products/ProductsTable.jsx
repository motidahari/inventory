import React, { useState, useContext, useMemo } from 'react';
import { AuthContext } from '../../context/auth';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';
import MoveProductModal from './MoveProductModal';
import { useFetchData } from '../../hooks/useFetchData';
import locations from '../../requests/locations';
import { IconButton, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import moment from 'moment';
import StyledDataGrid from '../../components/StyledDataGrid';

const ProductsTable = ({ fetchData, allproducts, error }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [moveModal, setMoveModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user } = useContext(AuthContext);
  const { state: allLocations } = useFetchData(locations.getAllLocations);



  const columns = useMemo(
    () => [
      {
        field: 'productName',
        headerName: 'product Name',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.productName}</Typography>
        ),
      },
      {
        field: 'serialNumber',
        headerName: 'serial Number',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.serialNumber}</Typography>
        ),
      },
      {
        field: 'PONumber',
        headerName: 'PO Number',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.PONumber}</Typography>
        ),
      },
      {
        field: 'locationName',
        headerName: 'location Name',
        sortable: false,
        flex: 0.4,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">{row.row.locationName}</Typography>
        ),
      },
      {
        field: 'date',
        headerName: 'date',
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
        field: 'warranty',
        headerName: 'warranty',
        sortable: false,
        flex: 0.2,
        minWidth: 100,
        renderCell: row => (
          <Typography color="neutral.900">
            {moment(row.row.warranty).format('YYYY-MM-DD')}
          </Typography>
        ),
      },

      user?.permission !== 'Viewer'
        ? {
          field: 'Actions',
          headerName: 'Actions',
          sortable: false,
          flex: 0.2,
          minWidth: 100,
          disableClickEventBubbling: true,
          renderCell: row => (
            <>
              <Tooltip title="Edit">
                <IconButton
                  onClick={() => {
                    handleEditModal(row.row);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => {
                    handleDeleteModal(row.row);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Move">
                <IconButton
                  onClick={() => {
                    handleMoveModal(row.row);
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Tooltip>
            </>
          ),
        }
        : { field: '', headerName: '', minWidth: 1, flex: 0.0001 },
    ],
    [user]
  );

  const handleDeleteModal = product => {
    setDeleteModal(!deleteModal);
    setSelectedProduct(product);
  };
  const handleMoveModal = product => {
    setMoveModal(!moveModal);
    setSelectedProduct(product);
  };
  const handleEditModal = product => {
    setEditModal(!editModal);
    setSelectedProduct(product);
  };

  if (error)
    return <Typography variant="h4">error featching products table</Typography>;

  return (
    <>
      <StyledDataGrid
        rows={allproducts}
        columns={columns}
        getRowId={row => row.productId}
      />

      {selectedProduct ? (
        <>
          <EditProductModal
            fetchData={fetchData}
            product={selectedProduct}
            allLocations={allLocations}
            open={editModal}
            close={handleEditModal}
          />
          <DeleteProductModal
            fetchData={fetchData}
            product={selectedProduct}
            open={deleteModal}
            close={handleDeleteModal}
          />
          <MoveProductModal
            fetchData={fetchData}
            product={selectedProduct}
            allLocations={allLocations}
            open={moveModal}
            close={handleMoveModal}
          />
        </>
      ) : null}
    </>
  );
};

export default ProductsTable;
