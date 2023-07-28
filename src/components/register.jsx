import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import * as yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage } from "../reducers/error";
import Snackbar from '@mui/material/Snackbar';
const RegisterPage = () => {
const [errors,setErrors] = useState({})
const [isUserCreated,setIsUserCreated] = useState(null);
  const error= useSelector((state) => state.error.error);
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be at least 8 characters')
      .matches(
        /^(?=.*[!@#$%^&*])/,
        'Password should contain at least one special character'
      )
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    try {
      await validationSchema.validate(Object.fromEntries(formData), {
        abortEarly: false,
      });
      setErrors({});
      
      console.log('Validation successful');
  
     
      const user = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
      };
  
      const response = await axios.post(
        'https://general-api-ovypaunneq-uc.a.run.app/api/v1/register',
        user
      );
      console.log('Registration successful:', response.data);
      setIsUserCreated(true)
      dispatch(setErrorMessage(""))
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
      console.log('Validation failed:', error);
      if(error){
        setIsUserCreated(false)
      }
      dispatch(setErrorMessage(error.message))
    }
  };
 
  

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
         
          >
            Sign Up
            
          </Button>

         { isUserCreated?<Alert severity="success">User created</Alert>:error?<Alert severity="warning">{error}</Alert>:''}
         
          <div style={{paddingLeft:"20px"}}>Login here: <Link to="/login">Login</Link></div>
        </Box>
      </Box>
    
    </Container>
  );
};

export default RegisterPage;
