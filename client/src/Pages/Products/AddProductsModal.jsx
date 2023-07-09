import React, { useContext, useState, useMemo } from 'react';
import { AuthContext } from '../../context/auth';
import { Modal, Grid, TextField, MenuItem } from '@mui/material';
import ModalHeader from '../../components/ModalHeader';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';


import { useForm } from '../../hooks/useForm';
import products from '../../requests/products';
import moment from 'moment';
import TextFieldSelect from '../../components/TextFieldSelect';
import { toast } from 'react-toastify';
import Notification from '../../components/Notification';
import StyledModal from '../../components/StyledModal';
import { useFetchData } from '../../hooks/useFetchData';
import locations from '../../requests/locations';

const specialProducts = [
  'acom amplifier',
  'barret transceiiver',
  'exodus amplifier gen1',
  'tujicom amplifier gen1',
  'tujicom amplifier gen2',
  'tujicom amplifier gen2.2',
];

const AddProductsModal = ({ open, close, fetchData }) => {
  const [warehouse, setWarehouse] = useState('');
  const [status, setStatus] = useState('');
  const { user, token } = useContext(AuthContext);
  const [value, setValue] = React.useState(null);

  const userAction = {
    userId: user.id,
    token: token,
  };
  const { state: allLocations, setState: setLocationState } = useFetchData(
    locations.getAllLocations
  );

  const InitialValues = useMemo(
    () => ({
      productName: '',
      serialNumber: '',
      PONumber: '',
      warranty: moment(new Date()).format('YYYY-MM-DD'),
      description: ``,
      quantity: 1,
      locationId: '',
      status: '',
    }),
    []
  );

  const { onChange, onSubmit, setFieldValue, values, setValues } = useForm(
    addProductCallback,
    InitialValues
  );

  const addProduct = async () => {
    let err = false;
    if (values.productName.length === 0) {
      toast.error(
        <Notification text={'Please include product name for product'} />
      );
      err = true;
    }
    if (values.locationId.length === 0) {
      toast.error(
        <Notification text={'Please include location for product'} />
      );
      err = true;
    }

    if (specialProducts.includes(values.productName.toLowerCase())) {
      if (values.status.length === 0) {
        toast.error(
          <Notification text={'Please include status for product'} />
        );
        err = true;
      }
      if (values.serialNumber.length === 0) {
        toast.error(
          <Notification text={'Please include serialNumber for product'} />
        );
        err = true;
      }
    }

    if (!err) {
      const run = values.serialNumber !== '' ? 1 : parseInt(values.quantity);

      for (let index = 0; index < run; index++) {
        const resultAddProduct = await products.addProduct(userAction, values);

        if (resultAddProduct?.errors) {
          toast.error(<Notification text={'error'} />);
        } else {
          toast.success(<Notification text={'Product added'} />);
          setValues(InitialValues);
          setStatus('');
          setWarehouse('');
          fetchData();
          close();
        }
      }
    }
  };

  function addProductCallback() {
    addProduct();
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal open={open} onClose={close}>
        <StyledModal submitText={'Add Product'} onSubmit={onSubmit}>
          <ModalHeader title="Add Product" close={close} />

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
                    moment(new Date(newValue)).format('YYYY-MM-DD')
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
                multiline
                rows={4}
                name="description"
              />
            </Grid>

            {!specialProducts.includes(values.productName.toLowerCase()) &&
              values.serialNumber === '' ? (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Quantity"
                  onChange={onChange}
                  value={values.quantity}
                  variant="outlined"
                  name="quantity"
                />
              </Grid>
            ) : null}

            {specialProducts.includes(values.productName.toLowerCase()) ? (
              <Grid item xs={12}>
                <TextFieldSelect
                  value={status}
                  onChange={event => {
                    setStatus(event.target.value);
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
                  <MenuItem value="Repair in Vegas">Repair in Vegas</MenuItem>
                </TextFieldSelect>
              </Grid>
            ) : null}
          </Grid>
        </StyledModal>
      </Modal>
    </LocalizationProvider>

  );
};

export default AddProductsModal;
