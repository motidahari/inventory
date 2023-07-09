import React, { useEffect, useState, useContext } from 'react';
import { Modal, Grid, TextField, MenuItem } from '@mui/material';
import ModalHeader from '../../components/ModalHeader';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import products from '../../requests/products';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/auth';
import TextFieldSelect from '../../components/TextFieldSelect';
import { toast } from 'react-toastify';
import Notification from '../../components/Notification';
import StyledModal from '../../components/StyledModal';
import moment from 'moment';

const specialProducts = [
  'acom amplifier',
  'barret transceiiver',
  'exodus amplifier gen1',
  'tujicom amplifier gen1',
  'tujicom amplifier gen2',
  'tujicom amplifier gen2.2',
];

const EditProductModal = ({
  open,
  close,
  product,
  allLocations,
  fetchData,
}) => {
  const [warehouse, setWarehouse] = useState('');
  const [statusField, setStatusField] = useState('');

  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };

  const { onChange, onSubmit, setFieldValue, setValues, values } = useForm(
    editProductCallback,
    {
      locationName: '',
      locationId: '',
      productId: '',
      productName: '',
      serialNumber: '',
      PONumber: '',
      warranty: '',
      description: '',
      status: '',
    }
  );

  useEffect(() => {
    setValues(product);
    setWarehouse(product.locationId);
  }, [product]);

  const editProduct = async () => {
    let err = false;
    if (values.productName?.length === 0) {
      toast.error(
        <Notification text={'Please include product name for product'} />
      );
      err = true;
    }

    if (specialProducts.includes(values?.productName?.toLowerCase())) {
      if (!values.status || values?.status?.length === 0) {
        toast.error(
          <Notification text={'Please include status for product'} />
        );
        err = true;
      }
      if (values.serialNumber?.length === 0) {
        toast.error(
          <Notification text={'Please include serialNumber for product'} />
        );
        err = true;
      }
    }
    if (values.locationId?.length === 0) {
      toast.error(
        <Notification text={'Please include location for product'} />
      );
      err = true;
    }

    if (!err) {
      const resultUpdateProduct = await products.UpdateProduct(
        userAction,
        values
      );
      if (resultUpdateProduct?.errors) {
        toast.error(<Notification text={'error'} />);
      } else {
        toast.success(<Notification text={'Product edited'} />);
        fetchData();
        close();
      }
    }
  };

  function editProductCallback() {
    editProduct();
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal open={open} onClose={close}>
        <StyledModal submitText={'Edit Product'} onSubmit={onSubmit}>
          <ModalHeader title={`Edit ${product.productName} `} close={close} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                onChange={onChange}
                value={values.productName}
                variant="outlined"
                name="productName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="S/N of Product"
                onChange={onChange}
                value={values.serialNumber}
                variant="outlined"
                name="serialNumber"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="PO Number"
                onChange={onChange}
                value={values.PONumber}
                variant="outlined"
                name="PONumber"
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="Warranty"
                value={values.warranty}
                name="warranty"
                onChange={newValue => {
                  setFieldValue(
                    'warranty',
                    moment(newValue).format('YYYY-MM-DD')
                  );
                }}
                renderInput={params => <TextField fullWidth {...params} />}

              />
            </Grid>
            {allLocations ? (
              <Grid item xs={12}>
                <TextFieldSelect
                  value={warehouse}
                  onChange={event => {
                    setWarehouse(event.target.value);
                    setFieldValue('locationId', event.target.value);
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
                name="description"
                multiline
                rows={4}
              />
            </Grid>
            {specialProducts.includes(
              values.productName?.toLowerCase()
            ) ? (
              <Grid item xs={12}>
                <TextFieldSelect
                  value={statusField}
                  onChange={event => {
                    setStatusField(event.target.value);
                    setFieldValue('status', event.target.value);
                  }}
                  label={'Status'}
                >
                  <MenuItem disabled value={'Select Status'}>
                    Select Status
                  </MenuItem>
                  <MenuItem value="Awaiting ATP">Awaiting ATP</MenuItem>
                  <MenuItem value="Fault">Fault</MenuItem>
                  <MenuItem value="Obselete">Obselete</MenuItem>
                  <MenuItem value="Operational">Operational</MenuItem>
                </TextFieldSelect>
              </Grid>
            ) : null}
          </Grid>
        </StyledModal>
      </Modal>
    </LocalizationProvider>

  );
};

export default EditProductModal;

