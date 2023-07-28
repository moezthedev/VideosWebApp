import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserLoggedIn } from '../reducers/isuserlogged';
import { setUserToken } from '../reducers/usertoken';
import { setUserData } from '../reducers/userdata';
const GoogleLoginComponent = () => {

  const clientId = '798388553169-lh0ki36qno4me401nv2p0ecmtvhh8in0.apps.googleusercontent.com444902640845-knomcs2661nnu5i1qq0r1rvhb5caftsl.apps.googleusercontent.com';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSuccess = (response) => {
    


    let name = response.wt.Ad;
    dispatch(setIsUserLoggedIn(true))
    dispatch(setUserToken(response.tokenId))
    dispatch(setUserData(name))
    document.cookie = `userToken=${response.tokenId}; expires=2; path=/`;
   navigate("/")
  };

  const handleFailure = (error) => {
    // Handle any error that occurs during login
    // onFailure(error);
    console.log("Google failure");
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginComponent;
