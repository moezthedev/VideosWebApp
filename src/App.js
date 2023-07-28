import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import Home from "./pages/main";
import Video from "./components/videos";
import Login from "./components/login";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./reducers/userdata";
import { setIsUserLoggedIn } from "./reducers/isuserlogged";
import { savedCookie } from "./functions/savedcookie";
import Register from "./components/register"


export default function App() {
  const isUserLoggedIn = useSelector((state) => state.isUserLoggedIn.isUserLoggedIn);
  const userToken = useSelector((state) => state.userToken.userToken);
  const userData = useSelector((state) => state.userData.userData);
  const dispatch = useDispatch();
  if (userData) {
    dispatch(setIsUserLoggedIn(true));
  }
 
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          "https://general-api-ovypaunneq-uc.a.run.app/api/v1/user",
          {
            headers: {
              Authorization: `Bearer ${userToken ? userToken : savedCookie()}`,
            },
          }
        );

        const { created_at, email, name, role, username } = response.data;
        const userData = {
          created_at,
          email,
          name,
          role,
          username,
        };

        dispatch(setUserData(userData));
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    getUserData();
  }, [userToken]);
 
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/video" element={<Video />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}
