import React from 'react';
import { Button, Card, CardContent, Divider } from '@mui/material';
import { ModalContainer, ModalSubmitBtn } from '../styles/styledComponents';

const StyledModal = React.forwardRef((props, ref) => (
  <ModalContainer>
    <Card>
      <CardContent>{props.children}</CardContent>
      <Divider />
      <ModalSubmitBtn>
        <Button color="primary" variant="contained" onClick={props.onSubmit}>
          {props.submitText}
        </Button>
      </ModalSubmitBtn>
    </Card>
  </ModalContainer>
));

export default StyledModal;
