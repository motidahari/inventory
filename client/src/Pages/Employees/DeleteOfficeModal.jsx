import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { Modal, Grid, TextField } from '@mui/material';
import ModalHeader from '../../components/ModalHeader';
import { useForm } from '../../hooks/useForm';
import offices from '../../requests/offices';
import { toast } from 'react-toastify';
import Notification from '../../components/Notification';
import StyledModal from '../../components/StyledModal';

const DeleteOfficeModal = ({ open, close, office, fetchData }) => {
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };
  const { onChange, onSubmit, values } = useForm(deleteOfficeCallback, {
    officeId: '',
  });
  console.log('office', office.officeId);
  const deleteOffice = async () => {
    const resultDeleteOffice = await offices.deleteOfficeById(userAction, {
      officeId: office.officeId,
    });
    if (resultDeleteOffice?.errors) {
      toast.error(<Notification text={'error'} />);
    } else {
      toast.success(<Notification text={'Office deleted'} />);
      fetchData();
      close();
    }
  };

  function deleteOfficeCallback() {
    deleteOffice();
  }

  return (
    <Modal open={open} onClose={close}>
      <StyledModal submitText={'Delete Office'} onSubmit={onSubmit}>
        <ModalHeader title={`Delete ${office.officeName} `} close={close} />
      </StyledModal>
    </Modal>

  );
};

export default DeleteOfficeModal;
