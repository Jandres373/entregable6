import React from 'react'

const SongCard = ({song}) => {
  return (
    <div>
      <h3>{song.name}</h3>
      <figure>
        <img src={song.album.images[0].url} alt="" />
      </figure>
      {console.log(song)}
    </div>
  )
}

export default SongCard