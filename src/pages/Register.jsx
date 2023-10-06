import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUsersThunk } from "../store/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../apis/apiConfig";
import { storeDataLocally } from "../utils/localeStorage";

const register = () => {
  const [loading, setLoading] = useState(false);
  const { register, reset, handleSubmit } = useForm();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setLoading(true);
    const URL = `${BASE_URL}/api/auth/register`;
    axios.post(URL, data).then(() => {
      const userLoginData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const URL_LOGIN = `${BASE_URL}/api/auth/login`;
      dispatch(getUsersThunk(URL_LOGIN, userLoginData));
      setLoading(false);
    });
  };

  /*   useEffect(() => {
    if (user?.user?.name) {
      storeDataLocally('user',)
    }
  }, [user]); */

  if (!user?.user) {
    return (
      <div className="w-screen h-screen overflow-hidden">
        {" "}
        <p className="text-3xl font-bold text-center ">under construction</p>
        <div className="flex items-center justify-center w-screen h-screen overflow-hidden bg-green-500">
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center gap-2 p-5 rounded bg-blue-50 w-fit h-fit"
          >
          <p className="font-bold text-red-500 ">Warning: we're currently experiencing technical difficulties. This action may not work.</p>
            <div id="name_registration">
              <label htmlFor="name"></label>
              <input placeholder="name" type="text" {...register("name")} />
            </div>
            <div id="email_registration">
              <label htmlFor="email"></label>
              <input placeholder="email" type="text" {...register("email")} />
            </div>
            <div id="password_registration">
              <label htmlFor="password"></label>
              <input
                placeholder="password"
                type="text"
                {...register("password")}
              />
            </div>
            <button className="btn" onClick={handleSubmit(onSubmit)}>
              register
            </button>
          </form>
          <br />
          {loading && "loading..."}
        </div>
      </div>
    );
  } /* else {
    return <Navigate to={`/user/${user.user.name}`} />
  } */
};

export default register;
