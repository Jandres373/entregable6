import { useState } from "react";
import React, { useEffect } from "react";
import { BiPlus, BiPlay } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  albumSlice,
  songSlice,
  queueSlice,
} from "../../store/slices/song.slice";
import { BASE_URL } from "../../apis/apiConfig";
import axios from "axios";
import AddToPlayListModal from "./AddToPlayListModal";

const AlbumCard = ({ track, token, user }) => {
  const dispatch = useDispatch();
  const setAlbum = albumSlice.actions.setAlbum;
  const setSong = songSlice.actions.setSong;
  const setQueue = queueSlice.actions.setQueue;
  const currentSong = useSelector((state) => state.song);

  const openInIframe = () => {
    const URL = `${BASE_URL}/api/tracks/${track.id}`;
    console.log(track.id)
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    axios
      .get(URL, config)
      .then((resp) => {
        dispatch(setSong(resp.data));
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  };

  return (
    track && (
      <div className="relative w-56 bg-blue-800 bg-opacity-30 brightness-50 rounded-3xl backdrop-blur-2xl bg-blur-md backdrop-opacity-30 hover:bg-opacity-100">
        <div className="w-32 p-2 aspect-square">
          <figure>
            <img
              src={track.album.images[0]?.url}
              alt=""
              className="shadow-md rounded-xl"
            />
          </figure>
        </div>
        <div className="relative p-2 mb-5">
          <h3 className="font-bold text-black line-clamp-1">{track.name}</h3>
          <h4 className="font-bold text-black line-clamp-1">
            {track.album.artists[0].name}
          </h4>
          <h3 className="text-gray-700 line-clamp-1">{track.album.name}</h3>
        </div>

        <div className="absolute top-0 right-0">
          {" "}
          <AddToPlayListModal
            track={track}
            user={user}
            token={token}
          ></AddToPlayListModal>
          <BiPlay
            onClick={(e) => openInIframe(e)}
            className="flex w-8 h-8 m-5 text-2xl text-green-600 bg-black rounded-full cursor-pointer"
          />
        </div>
      </div>
    )
  );
};

export default AlbumCard;
