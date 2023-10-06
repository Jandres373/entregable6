import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../apis/apiConfig";
import { getUsersThunk, userToken } from "../store/slices/user.slice";
import { retrieveDataLocally, storeDataLocally } from "../utils/localeStorage";
const Login = () => {
  const dispatch = useDispatch();
  const user = retrieveDataLocally("user");
  const token = retrieveDataLocally("token");
  const { handleSubmit, register } = useForm();
  const setToken = userToken.actions.setToken;

  
  const onSubmit = (data) => {
    const URL = `${BASE_URL}/api/auth/login`;
    console.log(data)
    axios.post(URL, data).then((resp) => {
      const apiData = resp.data;
      const LOGIN_DATA = {
        name: data.name,
        email: data.email,
      };
      const token = apiData.token;
      dispatch(setToken(token));
      dispatch(getUsersThunk(URL, LOGIN_DATA));
      storeDataLocally("user", apiData);
      storeDataLocally("token", token);
    });
  };
  

  if (!user?.name) {
    return (
      <div
        className={`w-full h-screen flex justify-center items-center opacity-90 brightness-75 bg-[url(.../../assets/girls2.webp)] bg-center`}
      >
        <div className="p-5 w-96 rounded-3xl backdrop-blur-3xl brightness-100">
          <h3 className="mb-5 text-2xl font-bold text-center">
            Sign in to your account
          </h3>

          <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  {...register("name")}
                  title="name"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="email">Email"</label>
                <input
                  {...register("email")}
                  title="email"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  {...register("password")}
                  title="password"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button className="w-full h-10 mt-5 bg-green-500 rounded-lg"></button>
            </form>
          </div>
          <p className="mt-2 text-center text-white">
            Don't have an account?{" "}
            <Link
              to={"/auth/register"}
              className="text-blue-700 hover:text-blue-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    );
  } else {
    return <Navigate to={`/user/${user?.name}`} />;
  }
};

export default Login;
