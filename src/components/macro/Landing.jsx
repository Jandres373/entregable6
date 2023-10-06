import React, { useEffect } from "react";
import DisplayArea from "./DisplayArea";
import { Navigate, useNavigate } from "react-router-dom";
import {
  retrieveDataLocally,
  storeDataLocally,
} from "../../utils/localeStorage";
import { useDispatch, useSelector } from "react-redux";
import { userSlice, userToken } from "../../store/slices/user.slice";
import { AiFillHome } from "react-icons/ai";
import PlayListDrawer from "../micro/PlayListDrawer";
import { BASE_URL } from "../../apis/apiConfig";
import axios from "axios";
import { playListSlice } from "../../store/slices/song.slice";

const Landing = ({ user, token }) => {
  const queue = useSelector((state) => state.queue);
  const playList = useSelector((state) => state.playList);
  const setUser = userSlice.actions.setUser;
  const setToken = userToken.actions.setToken;
  const setPlayList = playListSlice.actions.setPlayList;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    storeDataLocally("user", null);
    dispatch(setUser({ user: null, error: "none" }));
    dispatch(setToken(null));
    navigate("/");
  };

/*   useEffect(() => {
    const URL = `${BASE_URL}/api/playlists/ME`;
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    axios.get(URL, config).then((resp) => dispatch(setPlayList(resp.data)));
  }, []); */

  if (user?.user) {
    return (
      <div>
        <div className="grid w-full h-screen grid-cols-5 grid-rows-5 gap-2">
          {/* first section */}
          <div className="sticky top-0 flex flex-col items-center justify-center col-span-1 col-start-1 row-start-1 gap-5 text-white bg-slate-900 rounded-2xl">
            <button className="gap-2 px-5 py-2 rounded-md bg-slate-700">
              cola de reproduccion
            </button>
            <button className="gap-2 px-5 py-2 rounded-md bg-slate-700">
              cola de reproduccion
            </button>
          </div>
          {/* second section */}
          <div className="col-span-1 col-start-1 row-start-2 row-end-6 overflow-y-scroll text-white md:p-5 sm:p-0 bg-slate-900 rounded-2xl">
            {/* <PlayListDrawer token={token} /> */}
            <button className="w-full mx-auto btn">Create playlist</button>
            <br />
            <button onClick={handleLogOut}>logOut</button>
            <br />
            {user.user.name}

            <div className="flex flex-col gap-5">
              {/* {playList.map((playlist) => (
                <React.Fragment key={playlist.id}>
                  <div className="w-full h-24 indicator hover:h-full hover:transition-all">
                    <span className="indicator-item badge badge-secondary">
                      {playlist.tracks.length}
                    </span>
                    <div className="w-full h-full">
                      {" "}
                      <div
                        className="w-full backdrop-blur-lg relatie"
                        key={playList.id}
                      >
                        <img
                          src={playlist.tracks[0]?.album.images[0].url}
                          alt="Song image"
                          className="object-cover w-full h-24 overflow-hidden transition-all rounded-lg hover:h-full hover:transition-all opacity-60"
                        />
                        <p className="absolute px-2 text-lg font-bold text-black rounded-lg top-10 bg-green-50">
                          {playlist.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))} */}
            </div>
          </div>
          {/* Third section */}
          <div className="col-start-2 col-end-6 row-start-1 row-end-6 bg-gradient-to-b from-blue-400 to-blue-950 rounded-2xl">
            <DisplayArea user={user} token={token} />
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to={`/auth/login`} />;
  }
};

export default Landing;
