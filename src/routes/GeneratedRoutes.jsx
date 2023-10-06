import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import PlayList from "../pages/PlayList.jsx";
import Profile from "../pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../store/slices/user.slice";
import { userToken } from "../store/slices/user.slice";
import Landing from "../components/macro/Landing";
import {
  retrieveDataLocally,
  retrieveDataLocallyRow,
} from "../utils/localeStorage";

const GeneratedRoutes = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const setUser = userSlice.actions.setUser;
  const setToken = userToken.actions.setToken;
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = retrieveDataLocally("user");
    const retrievedToken = retrieveDataLocally("token");
    if (storedUser) {
      const data = {
        user: storedUser,
        error: "none",
      };
      dispatch(setUser(data));
      if (retrievedToken) {
        dispatch(setToken(retrievedToken));
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<PublicLayout />}>
          <Route path={"/"} element={<Home user={user} token={token} />} />
          <Route path={"/auth/login"} element={<Login />} />
          <Route path={"/auth/register"} element={<Register />} />
        </Route>

        <Route path={"/user"} element={<PrivateLayout user={user} />}>
          <Route
            path={"/user/:user"}
            element={<Landing user={user} token={token} />}
          />
          <Route
            path={"/user/:user/profile"}
            element={<Profile user={user} token={token} />}
          />
          <Route
            path={"/user/:user/play"}
            element={<Home user={user} token={token} />}
          />
          <Route
            path={"/user/:user/:playlist"}
            element={<PlayList user={user} token={token} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default GeneratedRoutes;
