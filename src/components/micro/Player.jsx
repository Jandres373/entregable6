import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { AiTwotoneHeart } from "react-icons/ai";
import axios from "axios";
import { BASE_URL } from "../../apis/apiConfig";

const Player = () => {
  const song = useSelector((state) => state.song);
  const token = useSelector((state) => state.token);

  const playSelectedSong = () => {
    const songUri = song.uri; 
    const URL = `${BASE_URL}/me/player/play`;
    const requestBody = {
      context_uri: `${songUri}`,
      offset: {
        position: 5
      },
      position_ms: 0
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    axios.put(URL,requestBody,config)
    .then(response => {
      // La canción se reproduce exitosamente.
      console.log('Canción reproducida con éxito:', response.data);
    })
    .catch(error => {
      // Manejar errores si la reproducción falla.
      console.error('Error al reproducir la canción:', error);
    });
  };
  

  if (song) {
    return (


      /* 
      
      <iframe style={{borderRadius: '12px'}}
                src={`https://open.spotify.com/embed/track/${track?.id}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>*/

            
      <motion.div className="fixed bottom-0 flex w-full h-16 px-5 transition-all bg-black rounded-t-3xl">
        <div
          id="song_info"
          className="flex items-center w-full gap-3 text-white"
        >
          <div className="relative">
            <img
              src={song?.album.images[0].url}
              alt=""
              width={55}
              height={55}
              className="rounded-full shadow-2xl"
            />
            <BsFillPlayCircleFill className="absolute w-8 h-8 text-green-500 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer top-1/2 left-1/2" onClick={playSelectedSong}/>
          </div>
          <p className="text-sm font-bold">{song?.name}</p>
          <AiTwotoneHeart className="text-green-500" />
        </div>
        <div
          id="player_dispaly"
          className="flex items-center w-full text-white justify-evenly"
        >
          a
        </div>
        <div
          id="controls_display"
          className="flex items-center w-full text-white justify-evenly"
        >
          a
        </div>
      </motion.div>
    );
  } else {
    return (
      <motion.div className="fixed bottom-0 flex w-full h-5 px-5 transition-all bg-black hover:h-16 rounded-t-3xl">
        <div
          id="song_info"
          className="flex items-center w-full text-white justify-evenly"
        >
          <p>pic</p>
          <p>name</p>
          <p>liked</p>
        </div>
        <div
          id="player_dispaly"
          className="flex items-center w-full text-white justify-evenly"
        >
          a
        </div>
        <div
          id="controls_display"
          className="flex items-center w-full text-white justify-evenly"
        >
          a
        </div>
      </motion.div>
    );
  }
};

export default Player;
