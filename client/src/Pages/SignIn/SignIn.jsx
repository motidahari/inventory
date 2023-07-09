import React, { useContext } from 'react';
import { AuthContext } from './../../context/auth';
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

const SignIn = () => {
  const context = useContext(AuthContext);
  let navigate = useNavigate();

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: '',
  });


  const loginUser = async () => {

    const resultLogin = await users.login(values);

    if (resultLogin?.errors) {
      toast.error(<Notification text={resultLogin?.errors[0].msg} />);
    } else {
      context.login(resultLogin.user);
      toast.success(<Notification text={'logged in'} />);
      navigate('/products');
    }
  };

  function loginUserCallback() {
    loginUser();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <AuthContainer>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={onChange}
            autoFocus
            value={values.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onChange}
            autoComplete="current-password"
            value={values.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to={`/signup`}>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </AuthContainer>
    </Container>
  );
};

export default SignIn;
