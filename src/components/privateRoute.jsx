import React from 'react';
import {  Outlet } from 'react-router-dom';
import {isTokenValid} from '../functions/istokenvalid';
import Login from "./login"
const PrivateRoute = () => {

 console.log(isTokenValid(),"Token");
 
 return isTokenValid() ? <Outlet /> : <Login/>

};

export default PrivateRoute;
