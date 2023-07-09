import React, { useState, useContext } from 'react';
import { Modal, Grid, TextField, MenuItem } from '@mui/material';
import ModalHeader from '../../components/ModalHeader';
import { useForm } from '../../hooks/useForm';
import users from '../../requests/users';
import { AuthContext } from '../../context/auth';
import { toast } from 'react-toastify';
import Notification from '../../components/Notification';
import StyledModal from '../../components/StyledModal';

const PendingUserEditModal = ({ open, close, userData, fetchData }) => {
  const [permission, setPermission] = useState('');
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };

  const { onSubmit, setFieldValue, values } = useForm(confirmUserCallback, {
    userId: userData?.userId,
    permission: '',
  });

  const confirmUser = async () => {
    const resultConfirmUser = await users.confirmUser(userAction, values);
    if (resultConfirmUser?.errors) {
      toast.error(<Notification text={resultConfirmUser?.errors[0].msg} />);
    } else {
      toast.success(<Notification text={'User permission changed'} />);
      fetchData();
      close();
    }
  };

  function confirmUserCallback() {
    confirmUser();
    setPermission('');
  }


  return (
    <Modal open={open} onClose={close}>
      <StyledModal submitText={'Confirm User'} onSubmit={onSubmit}>
        <ModalHeader title={`Confirm User ${userData?.email}`} close={close} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Permission"
              value={permission}
              onChange={event => {
                setFieldValue('permission', event.target.value);
                setPermission(event.target.value);
              }}
              name="permission"
            >
              <MenuItem value={'Viewer'}>Viewer</MenuItem>
              <MenuItem value={'Editor'}>Editor</MenuItem>
              <MenuItem value={'Admin'}>Admin</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </StyledModal>
    </Modal>
  );
};
export default PendingUserEditModal;
