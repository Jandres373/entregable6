import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setUser } from "../store/slices/user.slice";
import { userToken } from "../store/slices/user.slice";
import axios from "axios";
import Card3dHome from "../components/micro/Card3dHome";
import BG_IMAGE from "../assets/couple.webp";
import { BASE_URL } from "../apis/apiConfig";

const Home = ({user, token}) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();

  const phrases = [
    "New trends...",
    "The best playlists...",
    "100% free!",
    "What are you waiting for?",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (phrases.length > 0) {
        if (counter <= phrases[index].length) {
          setText(phrases[index].substring(0, counter));
          setCounter((prevCounter) => prevCounter + 1);
        } else {
          setCounter(0);
          setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      }
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, [index, counter]);

  if (!user?.user?.name) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gradient-to-t from-green-900 via-green-600 to-green-400">
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={BG_IMAGE}
            alt="Background"
            className="object-cover w-full h-full filter brightness-50 blur-lg"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white brightness-5">
            <div className="relative top-0 w-full h-screen p-20">
              <p className="relative w-96">
                {text} <span className="text-green-500 animate-pulse">_</span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-[700px] h-screen flex justify-center items-center text-white">
          <div>
            <Card3dHome />
            <div className="flex flex-col items-center justify-center gap-5 mt-32">
              <p className="text-2xl font-bold">Still don't have an account?</p>
              <Link to="/auth/register" className="w-56">
                <button className="w-full p-3 shadow-lg rounded-2xl bg-slate-950 brightness-90">
                  Create one
                </button>
              </Link>
              <p className="text-center">or</p>
              <Link to="/auth/login" className="w-56">
                <button className="w-full p-3 shadow-lg rounded-2xl bg-slate-950 brightness-90">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to={`/user/${user.user.name}`} />;
  }
};

export default Home;
