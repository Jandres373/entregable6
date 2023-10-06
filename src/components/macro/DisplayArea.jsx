import { useDispatch } from 'react-redux';
import React, { useRef, useState, useEffect } from "react";
import SearchBar from "../micro/SearchBar";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import Recommended from "../utilitly/Recommended";
import DisplayAlbumInfo from "../micro/DisplayAlbumInfo";
import DisplayTracksResults from "../micro/DisplayTracksResults";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../apis/apiConfig";
import { pageSlice } from "../../store/slices/song.slice";

const DisplayArea = ({ user, token }) => {
  const album = useSelector((state) => state.album);
  const tracks = useSelector((state) => state.tracks);
  const song = useSelector((state) => state.song);
  const page = useSelector((state) => state.page);
  const setPage = pageSlice.actions.setCurrentPage;
  const showReccomendations = useRef(null);
  const [grayDisplay, setGrayDispaly] = useState({
    moveBack: false,
    moveForward: true,
  })
  const dispatch = useDispatch();

  const moveToNextPage = () => { 
    const limit = 50/5
    if (page < limit) {
      dispatch(setPage(page+1));
      setGrayDispaly((prev)=>({
        ...prev,
        moveForward:true,
        moveBack:true,
      }))
    }if (page === limit) {
      setGrayDispaly((prev)=>({
        ...prev,
        moveForward:false,
      }))
    }
   
   }
   const moveToPreviousPage = () => {
    if (page > 1) {
      dispatch(setPage(page-1));
      setGrayDispaly((prev)=>({
        ...prev,
        moveBack:true,
        moveForward:true,
      }))
    }if (page === 1) {
      setGrayDispaly((prev)=>({
        ...prev,
        moveBack:false,
      }))
    }
  }
  return (
    <div className="flex flex-col justify-between w-full h-full overflow-y-auto ">
      <div
        id="navBar"
        className={`w-full flex items-center sticky top-0 z-50 bg-opacity-50`}
      >
        <div className="flex w-40 gap-4 pl-5">
          <button className={`p-3 rounded-full cursor-pointer ${grayDisplay.moveBack ? 'bg-slate-900' : 'bg-gray-600'}`} onClick={moveToPreviousPage}>
            <IoChevronBackSharp className="text-white" onClick={moveToPreviousPage} />
          </button>
          <button className={`p-3 rounded-full cursor-pointer ${grayDisplay.moveForward ? 'bg-slate-900' : 'bg-gray-600'}`}  onClick={moveToNextPage}>
            <IoChevronForwardSharp className="text-white" onClick={moveToNextPage}/>
          </button>
        </div>
        <SearchBar user={user} token={token} />
      </div>
      {/* // tracks */}
      <div className="mt-9">
        <DisplayTracksResults user={user} token={token} />
      </div>
      {/* // Recommended */}
      <h3 className="text-3xl font-bold text-white">Top albums</h3>
      {/* <Recommended showReccomendations={showReccomendations} /> */}
      {/* // Album */}
      <div
        className={`w-full ${
          song
            ? "h-80 rounded-t-2xl transition-all w-full "
            : "h-[50px] transition-all"
        } p-10 bg-black bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-50 shadow-2xl overflow-x-hidden`}
      >
        <DisplayAlbumInfo user={user} token={token} />
      </div>
    </div>
  );
};

export default DisplayArea;
