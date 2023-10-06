import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { BASE_URL } from "../../apis/apiConfig";
import axios from "axios";
import { useSelector } from "react-redux";
import { playListSlice } from "../../store/slices/song.slice";

const PlayListDrawer = ({ token }) => {
  const dispatch = useDispatch();
  const playList = useSelector((state) => state.playList);
  const setPlayList = playListSlice.actions.setPlayList;

  const createPlayList = () => {
    const URL = `${BASE_URL}/api/playlists`;
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    const data = {
      title: "New Playlist",
      message: "Here's your brand new playlist",
      to: "ME",
      tracks: [
        {
          id: "11dFghVXANMlKmJXsNCbNl",
        },
      ],
    };

    axios
      .post(URL, data, config)
      .then((resp) => console.log(resp))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const URL = `${BASE_URL}/api/playlists/ME`;
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    axios.get(URL, config).then((resp) => dispatch(setPlayList(resp.data)));
  }, []);

  return (
    <div>
      <div className="z-50 drawer ">
        <input id="my-drawer" type="checkbox" className="drawer-toggle " />
        <div className="flex justify-center mt-5 drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="w-full text-sm btn btn-success">
            See all playlists
          </label>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="min-h-full p-4 bg-gradient-to-b from-green-400 to-green-950 rounded-r-2xl menu w-80 text-base-content">
            {/* Sidebar content here */}
            {playList.map((list) => (
              <li key={list.id}>
                <a>{list.title}</a>
              </li>
            ))}
          </ul>
          <button onClick={createPlayList}>create playlist</button>
        </div>
      </div>
    </div>
  );
};

export default PlayListDrawer;
