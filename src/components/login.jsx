import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import GoogleLoginButton from './googlelogin'
import { useNavigate } from 'react-router-dom';
import { setErrorMessage } from '../reducers/error';
import { setUserToken } from '../reducers/usertoken';
import { setIsUserLoggedIn } from '../reducers/isuserlogged';
import { Link } from 'react-router-dom';
import {gapi} from "gapi-script"
import {savedCookie} from "../functions/savedcookie"
const LoginPage = () => {
  const errorMessage = useSelector((state) => state.error.error);

  const userToken = useSelector((state) => state.userToken.userToken);
  const isUserLoggedIn = useSelector((state) => state.isUserLoggedIn.isUserLoggedIn);
  const dispatch = useDispatch();
  const clientId = '444902640845-knomcs2661nnu5i1qq0r1rvhb5caftsl.apps.googleusercontent.com';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailValue = event.target.elements.email.value;
    const passwordValue = event.target.elements.password.value;

    try {
      const response = await axios.post(
        'https://general-api-ovypaunneq-uc.a.run.app/api/v1/login',
        {
          email: emailValue,
          password: passwordValue,
        }
      );

      dispatch(setErrorMessage(''));
    
      const user = response.data.data.token;
      dispatch(setIsUserLoggedIn(true));
      dispatch(setUserToken(user));
      document.cookie = `userToken=${user}; expires=2; path=/`;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Invalid password');
        dispatch(setIsUserLoggedIn(false));
        dispatch(setErrorMessage('Invalid Password'));
      } else {
        console.log('Login error:', error);
        dispatch(setIsUserLoggedIn(false));
        dispatch(setErrorMessage('Invalid Login'));
      }
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (savedCookie()) {
      dispatch(setIsUserLoggedIn(true));
      
      navigate('/');
    }
  }, [isUserLoggedIn, userToken]);

  useEffect(()=>{
function start(){
  gapi.client.init({
    client_id:clientId,
    scope:""
  })
}
gapi.load("client:auth2",start)
  },[])
  
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={Boolean(errorMessage)}
          />
          {errorMessage && (
            <div
              style={{
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              {errorMessage}
            </div>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <GoogleLoginButton/>
          <div>No account? <Link to="/register">Register</Link></div>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
