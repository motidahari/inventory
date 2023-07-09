import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import { Modal } from '@mui/material';
import ModalHeader from '../../components/ModalHeader';
import { useForm } from '../../hooks/useForm';
import users from '../../requests/users';
import { toast } from 'react-toastify';
import Notification from '../../components/Notification';
import StyledModal from '../../components/StyledModal';

const DeleteUserModal = ({ open, close, userData, fetchData }) => {
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };

  const { onSubmit, setFieldValue, values } = useForm(
    deleteUserCallback,
    userData
  );

  const deleteUser = async () => {

    const resultDeleteUser = await users.deleteUser(userAction, values);
    if (resultDeleteUser?.errors) {
      toast.error(<Notification text={resultDeleteUser?.errors[0].msg} />);
    } else {
      toast.success(<Notification text={'User deleted'} />);
      fetchData();
      close();
    }
  };

  function deleteUserCallback() {
    deleteUser();
  }

  useEffect(() => {
    setFieldValue('userId', userData.userId);
  }, [userData]);

  return (
    <Modal open={open} onClose={close}>
      <StyledModal submitText={'Delete User'} onSubmit={onSubmit}>
        <ModalHeader title={`Delete ${userData.name} `} close={close} />
      </StyledModal>
    </Modal>
  );
};

export default DeleteUserModal;
