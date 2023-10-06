import React, { useState } from "react";
import { useSelector } from "react-redux";
import AlbumCard from "./AlbumCard";
import SongCard from "./SongCard";
import { AnimatePresence } from "framer-motion";

const DisplayTracksResults = ({ user, token }) => {
  const tracks = useSelector((state) => state.tracks);
  const page = useSelector((state) => state.page);
  const [trackPositions, setTrackPositions] = useState({
    finalPosition: page * 5,
    initialPosition: page * 5 - 5,
  });

  return (
    tracks && (
      <div className="flex">
        <div
          className={
            !tracks
              ? `hidden`
              : ` flex flex-wrap  justify-center gap-5 w-full overflow-y-hidden`
          }
        >
          {tracks
            .map((track) => (
              <React.Fragment key={track.id}>
                <AnimatePresence
                  initial={{ x: 500 }}
                  animate={{ x: 0 }}
                  exit={{ x: -500 }}
                >
                  <AlbumCard track={track} token={token} />
                </AnimatePresence>
              </React.Fragment>
            ))
            .slice(page * 5 - 5, page * 5)}
          ,
        </div>
      </div>
    )
  );
};

export default DisplayTracksResults;
