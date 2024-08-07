import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Avatar,
  TextField,
  Button
} from '@mui/material';
import { HowToRegRounded as HowToRegRoundedIcon } from '@mui/icons-material';
import useAuthStore from '../store/store';

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setToken = useAuthStore(state => state.setToken);
  const setUserName = useAuthStore(state => state.setUserName);
  const setUserId = useAuthStore(state => state.setUserId);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      }
      return errors;
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          Email: values.email,
          Password: values.password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          toast.success('Login successful');
          const { token } = response.data;
          const {FirstName,_id} = response.data.loggedUser;
          setUserId(_id);
          setUserName(FirstName)
          console.log(token)
          setToken(token);  
          localStorage.setItem("token",token);
          localStorage.setItem("Id",_id);
          localStorage.setItem("userName",FirstName);
          navigate('/main');
        } else {
          toast.error('Login failed: ' + response.statusText);
        }
      } catch (error) {
        toast.error('An error occurred: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '4em',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            textAlign: 'center',
            borderRadius: '15px',
            boxShadow: '0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)',
          }}
        >
          <Typography variant='h4'>
            Welcome
          </Typography>
          <Avatar>
            <HowToRegRoundedIcon />
          </Avatar>
          <TextField
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            required
            label='Enter your Email'
            {...formik.getFieldProps('email')}
            sx={{
              borderRadius: '5px',
              color: 'black',
              fontWeight: '500'
            }}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id='password'
            name='password'
            type='password'
            placeholder='Password'
            required
            label='Enter your Password'
            {...formik.getFieldProps('password')}
            sx={{
              borderRadius: '5px',
              color: 'black',
              fontWeight: '500'
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type='submit'
            disabled={isLoading}
            variant='contained'
            sx={{
              color: 'black',
              fontSize: '20px',
              backgroundColor: 'rgb(209, 215, 41)'
            }}
          >
            {isLoading ? 'Signing In...' : 'SIGN IN'}
          </Button>
        </Box>
      </Container>
    </form>
  );
};

export default Signin;
