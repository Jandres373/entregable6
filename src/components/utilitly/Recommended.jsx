import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../apis/apiConfig";
import { retrieveDataLocally } from "../../utils/localeStorage";
import { albumSlice, songSlice } from "../../store/slices/song.slice";
import AlbumCard from "../micro/AlbumCard";

const Recommended = ({ showReccomendations }) => {
  const [albums, setAlbums] = useState();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const album = useSelector(state=>state.album)
  const setAlbum = albumSlice.actions.setAlbum;
  const dispatch = useDispatch();

  const getRecommended = () => {
    const setSong = songSlice.actions.setSong;
    const market = "CO"; 
    const URL = `${BASE_URL}/browse/new-releases?country=${market}`;
    const spotifyAccessToken = token; 
    const config = {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    };

    axios
      .get(URL, config)
      .then((response) => {
        // Maneja la respuesta aquí
        setAlbums(response?.data?.albums.items);
      })
      .catch((error) => {
        // Maneja errores aquí
        console.error("Error fetching new releases:", error);
      });
  };

  const resetAlbumInfo = () => { 
    dispatch(setAlbum(null))
   }

  useEffect(() => {
    getRecommended();
  }, [user]);

  if (album) {
    return (<button ref={showReccomendations} className="p-2 bg-black text-white font-bold" onClick={resetAlbumInfo}>Show recommendations</button>)
  } else {
    return (
      <div className={ album ? `hidden` :`max-h-64 overflow-y-hidden`}>
        <div className="flex gap-5 mb-10 justify-center">
          {albums &&
            albums.map((album) => (
              <AlbumCard album={album} key={album.id}>
                {/* Establece el ancho deseado aquí */}
              </AlbumCard>
            )).slice(0,6)}
        </div>
      </div>
        );
  }
  
};

export default Recommended;
