import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { Modal, Grid, TextField } from '@mui/material';
import ModalHeader from '../../components/ModalHeader';
import { useForm } from '../../hooks/useForm';
import employees from '../../requests/employees';
import { toast } from 'react-toastify';
import Notification from '../../components/Notification';
import StyledModal from '../../components/StyledModal';

const DeleteEmployeeModal = ({ open, close, product, employee, fetchData }) => {
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };
  const { onChange, onSubmit, values } = useForm(deleteEmployeeCallback, {
    employeeId: '',
  });

  const deleteEmployee = async () => {
    const resultDeleteEmployee = await employees.deleteEmployeeById(userAction, {
      employeeId: employee.employeeId,
    });
    if (resultDeleteEmployee?.errors) {
      toast.error(<Notification text={'error'} />);
    } else {
      toast.success(<Notification text={'Employee deleted'} />);
      fetchData();
      close();
    }
    // console.log('resultDeleteEmployee', resultDeleteEmployee);
  };

  function deleteEmployeeCallback() {
    deleteEmployee();
  }

  return (
    <Modal open={open} onClose={close}>
      <StyledModal submitText={'Delete Employee'} onSubmit={onSubmit}>
        <ModalHeader title={`Delete ${employee.employeeName} `} close={close} />
      </StyledModal>
    </Modal>
  );
};

export default DeleteEmployeeModal;
