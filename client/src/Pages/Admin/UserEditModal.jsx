import React, { useState, useContext, useEffect } from 'react';
import { Modal, Grid, TextField, MenuItem } from '@mui/material';
import ModalHeader from '../../components/ModalHeader';
import { useForm } from '../../hooks/useForm';
import users from '../../requests/users';
import { AuthContext } from '../../context/auth';
import { toast } from 'react-toastify';
import Notification from '../../components/Notification';
import StyledModal from '../../components/StyledModal';

const UserEditModal = ({ open, close, userData, fetchData }) => {
  const [permission, setPermission] = useState(null);
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };

  const { onChange, onSubmit, setFieldValue, setValues, values } = useForm(
    editUserCallback,
    {
      userId: '',
      email: '',
      name: '',
      permission: '',
      password: '',
      confirmPassword: '',
    }
  );
  useEffect(() => {
    setValues({
      ...userData,
      password: '',
      confirmPassword: '',
    });
    setPermission(userData?.permission);
  }, [userData]);

  const editUser = async () => {
    let err = false;
    if (values.password.length < 6 || values.confirmPassword.length < 6) {
      toast.error(<Notification text={'Password is not valid'} />);
      err = true;
    }

    if (values.password !== values.confirmPassword) {
      toast.error(<Notification text={'Password is not match'} />);
      err = true;
    }
    if (values.userId.length === 0) {
      toast.error(<Notification text={'UserId is not empty'} />);
      err = true;
    }
    if (values.name.length === 0) {
      toast.error(<Notification text={'Please include name for user'} />);
      err = true;
    }
    if (values.permission.length === 0) {
      toast.error(<Notification text={'Please include permission for user'} />);
      err = true;
    }

    if (!err) {
      const resultUpdateUser = await users.updateUser(userAction, values);
      if (resultUpdateUser?.errors) {
        toast.error(<Notification text={resultUpdateUser?.errors[0].msg} />);
      } else {
        toast.success(<Notification text={'User edited'} />);
        fetchData();
        close();
      }
    }
  };

  function editUserCallback() {
    editUser();
  }

  return (
    <Modal open={open} onClose={close}>
      <StyledModal submitText={'Edit User'} onSubmit={onSubmit}>
        <ModalHeader title={`Edit User ${userData?.email}`} close={close} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User Name"
              onChange={onChange}
              value={values.name}
              variant="outlined"
              name="name"
            />
          </Grid>
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              onChange={onChange}
              value={values.password}
              variant="outlined"
              name="password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              onChange={onChange}
              value={values.confirmPassword}
              variant="outlined"
              name="confirmPassword"
              type="password"
            />
          </Grid>
        </Grid>
      </StyledModal>
    </Modal>
  );
};

export default UserEditModal;
