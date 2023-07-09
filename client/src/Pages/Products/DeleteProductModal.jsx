import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { Modal, Grid, TextField } from '@mui/material';
import ModalHeader from '../../components/ModalHeader';
import { useForm } from '../../hooks/useForm';
import products from '../../requests/products';
import { toast } from 'react-toastify';
import Notification from '../../components/Notification';
import StyledModal from '../../components/StyledModal';

const DeleteProductModal = ({ open, close, product, fetchData }) => {
  const { user, token } = useContext(AuthContext);
  const userAction = {
    userId: user.id,
    token: token,
  };
  const { onChange, onSubmit, values } = useForm(deleteProductCallback, {
    description: '',
  });

  const deleteProduct = async () => {
    const resultDeleteProduct = await products.deleteProduct(userAction, {
      productId: product.productId,
      description: values.description,
      storage: product.locationName,
    });
    if (resultDeleteProduct?.errors) {
      toast.error(<Notification text={'error'} />);
    } else {
      toast.success(<Notification text={'Product deleted'} />);
      fetchData();
      close();
    }
  };

  function deleteProductCallback() {
    deleteProduct();
  }

  return (
    <Modal open={open} onClose={close}>
      <StyledModal submitText={'Delete Product'} onSubmit={onSubmit}>
        <ModalHeader title={`Delete ${product.productName} `} close={close} />

        <Grid container spacing={3}>
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

export default DeleteProductModal;
