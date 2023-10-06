import { useDispatch, useSelector } from "react-redux";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { AiTwotoneHeart } from "react-icons/ai";
import { songSlice } from "../../store/slices/song.slice";
import { BASE_URL } from "../../apis/apiConfig";
import axios from "axios";
import ParticleAnimation from "../utilitly/ParticleAnimation.jsx";
const DisplayAlbumInfo = ({user,token}) => {
  const album = useSelector((state) => state.album);
  const setSong = songSlice.actions.setSong;
  const song = useSelector((state) => state.song);
  const dispatch = useDispatch();

  /* src={`https://open.spotify.com/embed/track/${song}?utm_source=generator&theme=0`}  */

  return (
    song && (
      <div className="w-full h-52">
        <div className="z-10">
        <ParticleAnimation particleColor="#1af" density={10000}> </ParticleAnimation>
        </div>
       <div className="absolute bottom-10 z-50 w-[1150px]"> <iframe
          src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          autoPlay={true}

        ></iframe></div>
      </div>
    )
  );
};

export default DisplayAlbumInfo;
