import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import "./signup.css"
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

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      reEnterPassword: '',
      phNumber: ''
    },
    validate: (values) => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = 'Required';
      }
      if (!values.lastName) {
        errors.lastName = 'Required';
      }
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
      if (!values.reEnterPassword) {
        errors.reEnterPassword = 'Required';
      } else if (values.reEnterPassword !== values.password) {
        errors.reEnterPassword = 'Passwords do not match';
      }
      if (!values.phNumber) {
        errors.phNumber = 'Required';
      } else if (!/^[0-9]{10}$/.test(values.phNumber)) {
        errors.phNumber = 'Invalid phone number';
      }
      return errors;
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          FirstName: values.firstName,
          LastName: values.lastName,
          Email: values.email,
          Password: values.password,
          PhNumber: values.phNumber
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          toast.success('Signup successful');
          navigate('/login');
        } else {
          toast.error('Signup failed: ' + response.statusText);
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
            Create Account
          </Typography>
          <Avatar>
            <HowToRegRoundedIcon />
          </Avatar>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem'
            }}
          >
            <TextField
              id='firstName'
              name='firstName'
              type='text'
              placeholder='First Name'
              required
              label='Enter your First Name'
              {...formik.getFieldProps('firstName')}
              sx={{
                borderRadius: '5px'
              }}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              id='lastName'
              name='lastName'
              type='text'
              placeholder='Last Name'
              required
              label='Enter your Last Name'
              {...formik.getFieldProps('lastName')}
              sx={{
                borderRadius: '5px',
                color: 'black',
                fontWeight: '500'
              }}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem'
            }}
          >
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
              id='phNumber'
              name='phNumber'
              type='text'
              placeholder='Phone Number'
              required
              label='Enter your Phone Number'
              {...formik.getFieldProps('phNumber')}
              sx={{
                borderRadius: '5px',
                color: 'black',
                fontWeight: '500'
              }}
              error={formik.touched.phNumber && Boolean(formik.errors.phNumber)}
              helperText={formik.touched.phNumber && formik.errors.phNumber}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem'
            }}
          >
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
            <TextField
              id='reEnterPassword'
              name='reEnterPassword'
              type='password'
              placeholder='Re-enter Password'
              required
              label='Re-enter your Password'
              {...formik.getFieldProps('reEnterPassword')}
              sx={{
                borderRadius: '5px',
                color: 'black',
                fontWeight: '500'
              }}
              error={formik.touched.reEnterPassword && Boolean(formik.errors.reEnterPassword)}
              helperText={formik.touched.reEnterPassword && formik.errors.reEnterPassword}
            />
          </Box>
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
            {isLoading ? 'Signing Up...' : 'SIGN UP'}
          </Button>
          <Box>
            <Typography
            
            >
              <Link
              to={'/signin'}
  className='account'
              >
                Already have an Account
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </form>
  );
};

export default Signup;
