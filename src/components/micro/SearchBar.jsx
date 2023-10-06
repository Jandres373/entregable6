import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../apis/apiConfig";
import { useSelector, useDispatch } from "react-redux";
import { songSlice, tracksSlices } from "../../store/slices/song.slice";
import SongCard from "./SongCard";
import { retrieveDataLocally } from "../../utils/localeStorage";

const SearchBar = ({ user, token }) => {
  const { register, handleSubmit } = useForm();
  const song = useSelector((state) => state.song);
  const setTracks = tracksSlices.actions.setTracks;
  const dispatch = useDispatch();

  const onChange = (data) => {
   
    if (token) {
      const URL = `${BASE_URL}/api/tracks?limit=50&q=${data.search}`;
      const config = {
        headers: {
          Authorization: `JWT ${token}`,
        },
      };
      axios.get(URL, config).then((resp) => {
        dispatch(setTracks(resp.data.tracks.items));
      });
    }
  };

  return (
    <div className="w-full p-5">
      <form
        action=""
        className="flex justify-center w-full"
        onSubmit={handleSubmit(onChange)}
      >
        <input
          name="search"
          {...register("search")}
          className={`w-5/6 h-10 focus:w-full transition-all duration-500 bg-gray-600 opacity-50 rounded-3xl text-white px-10`}
          type="text"
        />
      </form>
    </div>
  );
};

export default SearchBar;
