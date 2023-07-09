import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import users from '../../requests/users';
import { toast } from 'react-toastify';
import Notification from '../../components/Notification';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContainer } from '../../styles/styledComponents';

const SignUp = () => {
  let navigate = useNavigate();
  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const registerUser = async () => {
    if (values.firstName.length === 0 || values.lastName.length === 0) {
      toast.error(<Notification text={'Please include a full user name'} />);
    } else if (values.password === values.confirmPassword) {
      const User = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
      };
      const resultSignUp = await users.registration(User);

      if (resultSignUp?.errors) {
        toast.error(<Notification text={resultSignUp?.errors[0].msg} />);
      } else {
        toast.success(<Notification text={'Signed up'} />);
        navigate('/signin');
      }
    } else {
      toast.error(<Notification text={'Password does not match'} />);
    }
  };

  function registerUserCallback() {
    registerUser();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <AuthContainer>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={onChange}
                value={values.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={onChange}
                value={values.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChange}
                value={values.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={onChange}
                value={values.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="ConfirmPassword"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                onChange={onChange}
                value={values.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={`/signin`}>{'Already have an account?'}</Link>
            </Grid>
          </Grid>
        </Box>
      </AuthContainer>
    </Container>
  );
};

export default SignUp;
