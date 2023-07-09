import React, { useContext, useMemo } from 'react';
import { AuthContext } from '../../context/auth';
import { Modal, Grid, TextField } from '@mui/material';
import ModalHeader from '../../components/ModalHeader';
import { useForm } from '../../hooks/useForm';
import offices from '../../requests/offices';
import { toast } from 'react-toastify';
import Notification from '../../components/Notification';
import StyledModal from '../../components/StyledModal';

const AddOfficeModal = ({ open, close, fetchData }) => {
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };

  const InitialValues = useMemo(
    () => ({
      officeName: '',
    }),
    []
  );

  const { onChange, onSubmit, values, setValues } = useForm(
    addOfficeCallback,
    InitialValues
  );

  const addOffice = async () => {
    const resultAddOffice = await offices.addOffice(userAction, values);
    if (resultAddOffice?.errors) {
      toast.error(<Notification text={'error'} />);
    } else {
      toast.success(<Notification text={'Office added'} />);
      setValues(InitialValues);
      fetchData();
      close();
    }
  };

  function addOfficeCallback() {
    addOffice();
  }

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledModal submitText={'Add Office'} onSubmit={onSubmit}>
        <ModalHeader title="Add Office" close={close} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Office Name"
              onChange={onChange}
              value={values.officeName}
              variant="outlined"
              name="officeName"
            />
          </Grid>
        </Grid>
      </StyledModal>
    </Modal>
  );
};

export default AddOfficeModal;
