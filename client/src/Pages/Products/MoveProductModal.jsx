import React, { useState, useContext, useEffect } from 'react';
import { Modal, Grid, TextField, MenuItem } from '@mui/material';
import ModalHeader from '../../components/ModalHeader';
import TextFieldSelect from '../../components/TextFieldSelect';
import products from '../../requests/products';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/auth';
import { toast } from 'react-toastify';
import Notification from '../../components/Notification';
import StyledModal from '../../components/StyledModal';

const MoveProductModal = ({
  open,
  close,
  allLocations,
  product,
  fetchData,
}) => {
  const [warehouse, setWarehouse] = useState('Select location');
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };
  const { onChange, onSubmit, setFieldValue, setValues, values } = useForm(
    moveProductCallback,
    {
      productId: product?.productId || '',
      locationId: product?.locationId || '',
      locationName: product?.locationName || '',
      description: '',
      status: '',
    }
  );

  useEffect(() => {
    setWarehouse(product?.locationId);
    setValues(product);
  }, [product]);

  const moveProduct = async () => {
    const resultMoveProduct = await products.UpdateProductLocation(
      userAction,
      values
    );
    if (resultMoveProduct?.errors) {
      toast.error(<Notification text={'error'} />);
    } else {
      toast.success(<Notification text={'Product moved'} />);
      fetchData();
      close();
    }
  };

  function moveProductCallback() {
    moveProduct();
  }

  return (
    <Modal open={open} onClose={close}>
      <StyledModal submitText={'Move Product'} onSubmit={onSubmit}>
        <ModalHeader title="Move Product" close={close} />

        <Grid container spacing={3}>
          {allLocations ? (
            <Grid item xs={12}>
              <TextFieldSelect
                value={warehouse}
                onChange={event => {
                  setFieldValue('locationId', event.target.value);
                  setWarehouse(event.target.value);
                }}
                label="Select location"
              >
                <MenuItem disabled value={'Select location'}>
                  Select location
                </MenuItem>
                {allLocations.map(location => (
                  <MenuItem
                    key={location.locationId}
                    value={location.locationId}
                    name={location.locationName}
                  >
                    {location.locationName}
                  </MenuItem>
                ))}
              </TextFieldSelect>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Comment"
              onChange={onChange}
              value={values.description}
              variant="outlined"
              multiline
              rows={4}
              name="description"
            />
          </Grid>
        </Grid>
      </StyledModal>
    </Modal>
  );
};

export default MoveProductModal;
