import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthContainer } from '../styles/styledComponents';

const NotFound = () => {
  return (
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        marginTop: '-200px',
      }}
    >
      <Container maxWidth="md">
        <AuthContainer>
          <Typography align="center" color="textPrimary" variant="h1">
            404: Page not found
          </Typography>
          <Button
            component="a"
            startIcon={<ArrowBackIcon fontSize="small" />}
            sx={{ mt: 3, textDecoration: 'none' }}
            variant="contained"
            href="/products"
          >
            Go back to products
          </Button>
        </AuthContainer>
      </Container>
    </Box>
  );
};

export default NotFound;
