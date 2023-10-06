import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { queueSlice } from "../../store/slices/song.slice";
import axios from "axios";
import { BASE_URL } from "../../apis/apiConfig";


const AddToPlayListModal = ({ track, user, token }) => {
  const playList = useSelector((state) => state.playList);
  const setQueue = queueSlice.actions.setQueue;
  const [playListID,setPlayListId] = useState(0)
  const dispatch = useDispatch();
  
  
  const sendToQueue = (e) => {
    const queuedSong = e.target.getAttribute("data-album-id");
    const playListName = "New Playlist";
    const queScheme = {
      selectedPlaylist: playListName,
      default: [queuedSong],
    };
    dispatch(setQueue(queScheme));
  };

  const addTrackToPLayList = () => {
    const URL = `${BASE_URL}/api/playlists/${playListID}`;
    const config = { 
      headers: {
        Authorization: `JWT ${token}`,
      }
    };
    const data = {
      title: "New sisas",
  
    };
    axios.patch(URL,data,config).then(resp => console.log(resp))
  }
  
  const setPlaylistId = (e) => { 
    const playlistID = e.target.getAttribute("data-meta-id");
    setPlayListId(playlistID)
   }
  
  return (
    <div>
      <button
        className=""
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        <BiPlus
          onClick={(e) => sendToQueue(e)}
          data-album-id={track}
          className="flex w-8 h-8 m-5 text-2xl text-green-600 bg-black rounded-full cursor-pointer"
        />
      </button>
      <dialog id="my_modal_1" className="backdrop-blur-md modal">
        <div className="bg-blue-500 modal-box">
          <h3 className="text-lg font-bold">Add track</h3>
          <p className="py-4">Select a playlist to add this track to.</p>
          <div className="flex flex-col gap-2">
            {playList.map((song) => (
              <button data-meta-id={song.id} className="btn focus:btn-success" key={song.id} onClick={setPlaylistId}>
                {song.title}
              </button>
            ))}
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="absolute left-5 btn btn-neutral">Close</button>
              <button className="btn btn-success" onClick={addTrackToPLayList}>
                Add
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddToPlayListModal;
