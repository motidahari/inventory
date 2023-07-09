import React, { useContext, useState, useMemo } from 'react';
import { AuthContext } from '../../context/auth';
import { Modal, Grid, TextField, MenuItem, ListSubheader } from '@mui/material';
import ModalHeader from '../../components/ModalHeader';
import { useForm } from '../../hooks/useForm';
import employees from '../../requests/employees';
import TextFieldSelect from '../../components/TextFieldSelect';
import { toast } from 'react-toastify';
import Notification from '../../components/Notification';
import StyledModal from '../../components/StyledModal';

const AddEmployeeModal = ({ open, close, allOffices, fetchData }) => {
  const [office, setOffice] = useState('');
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };

  const InitialValues = useMemo(
    () => ({
      employeeName: '',
      officeId: '',
      desktopComputer: '0',
      dockingStation: '0',
      headset: '0',
      ipPhone: '0',
      laptop: '0',
      printer: '0',
      screen: '0',
      tv: '0',
      webCamera: '0',
    }),
    []
  );

  const { onChange, onSubmit, setFieldValue, values, setValues } = useForm(
    addEmployeeCallback,
    InitialValues
  );

  const addEmployee = async () => {
    let err = false;
    if (values.employeeName.length === 0) {
      toast.error(
        <Notification text={'Please include employee name for employee'} />
      );
      err = true;
    }

    if (values.officeId.length === 0) {
      toast.error(<Notification text={'Please include office for employee'} />);
      err = true;
    }

    if (!err) {
      const resultAddNewEmployee = await employees.addEmployee(
        userAction,
        values
      );
      if (resultAddNewEmployee?.errors) {
        toast.error(<Notification text={'error'} />);
      } else {
        toast.success(<Notification text={'New Employee added'} />);
        setValues(InitialValues);
        setOffice('');
        fetchData();
        close();
      }
    }
  };

  function addEmployeeCallback() {
    addEmployee();
  }

  return (
    <Modal open={open} onClose={close}>
      <StyledModal submitText={'Add Employee'} onSubmit={onSubmit}>
        <ModalHeader title="Add Employee" close={close} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              onChange={onChange}
              value={values.employeeName}
              variant="outlined"
              name="employeeName"
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldSelect
              label={'Select Office'}
              value={office}
              onChange={event => {
                setFieldValue('officeId', event.target.value);
                setOffice(event.target.value);
              }}
            >
              <ListSubheader>Select Office</ListSubheader>
              {allOffices
                ? allOffices.map(office => (
                  <MenuItem key={office.officeId} value={office.officeId}>
                    {office.officeName}
                  </MenuItem>
                ))
                : null}
            </TextFieldSelect>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Screens"
              onChange={onChange}
              type="number"
              value={values.screen}
              variant="outlined"
              name="screen"
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="TVs"
              onChange={onChange}
              type="number"
              value={values.tv}
              variant="outlined"
              name="tv"
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Docking Stations"
              onChange={onChange}
              type="number"
              value={values.dockingStation}
              variant="outlined"
              name="dockingStation"
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="IP Phones"
              onChange={onChange}
              type="number"
              value={values.ipPhone}
              variant="outlined"
              name="ipPhone"
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Desktop Computers"
              onChange={onChange}
              type="number"
              value={values.desktopComputer}
              variant="outlined"
              name="desktopComputer"
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Laptops"
              onChange={onChange}
              type="number"
              value={values.laptop}
              variant="outlined"
              name="laptop"
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Printers"
              onChange={onChange}
              type="number"
              value={values.printer}
              variant="outlined"
              name="printer"
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Headsets"
              onChange={onChange}
              type="number"
              value={values.headset}
              variant="outlined"
              name="headset"
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Web Cameras"
              onChange={onChange}
              type="number"
              value={values.webCamera}
              variant="outlined"
              name="webCamera"
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Grid>
        </Grid>
      </StyledModal>
    </Modal>
  );
};

export default AddEmployeeModal;
